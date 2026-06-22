import { spawn } from "node:child_process";
import { mkdir, rm, writeFile } from "node:fs/promises";

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const profileDir = "C:\\Users\\USER\\AppData\\Local\\Temp\\universe-headless-profile";
const outputPath = "C:\\Users\\USER\\Desktop\\Website Projects\\Universe\\preview.png";
const remotePort = 9223;
const targetUrl = "http://127.0.0.1:3000";

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForWebSocketUrl(timeoutMs = 15000) {
  const start = Date.now();

  while (Date.now() - start < timeoutMs) {
    try {
      const response = await fetch(`http://127.0.0.1:${remotePort}/json/list`);

      if (response.ok) {
        const pages = await response.json();
        const page = pages.find(
          (entry) => entry.type === "page" && entry.webSocketDebuggerUrl,
        );

        if (page) {
          return page.webSocketDebuggerUrl;
        }
      }
    } catch {
      // Chrome may still be starting up.
    }

    await delay(250);
  }

  throw new Error("Timed out waiting for Chrome DevTools to become available.");
}

function createProtocolClient(webSocketUrl) {
  const socket = new WebSocket(webSocketUrl);
  const pending = new Map();
  const listeners = new Map();
  let nextId = 0;

  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);

    if (message.id) {
      const pendingRequest = pending.get(message.id);

      if (!pendingRequest) {
        return;
      }

      pending.delete(message.id);

      if (message.error) {
        pendingRequest.reject(new Error(message.error.message));
        return;
      }

      pendingRequest.resolve(message.result);
      return;
    }

    const eventListeners = listeners.get(message.method) || [];

    for (const listener of eventListeners) {
      listener(message.params);
    }
  });

  function waitForOpen() {
    return new Promise((resolve, reject) => {
      socket.addEventListener("open", () => resolve(), { once: true });
      socket.addEventListener("error", reject, { once: true });
    });
  }

  function send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = ++nextId;
      pending.set(id, { resolve, reject });
      socket.send(JSON.stringify({ id, method, params }));
    });
  }

  function waitForEvent(method, timeoutMs = 15000) {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        const methodListeners = listeners.get(method) || [];
        listeners.set(
          method,
          methodListeners.filter((listener) => listener !== onEvent),
        );
        reject(new Error(`Timed out waiting for ${method}.`));
      }, timeoutMs);

      function onEvent(params) {
        clearTimeout(timer);
        const methodListeners = listeners.get(method) || [];
        listeners.set(
          method,
          methodListeners.filter((listener) => listener !== onEvent),
        );
        resolve(params);
      }

      const methodListeners = listeners.get(method) || [];
      methodListeners.push(onEvent);
      listeners.set(method, methodListeners);
    });
  }

  function close() {
    socket.close();
  }

  return {
    close,
    send,
    waitForEvent,
    waitForOpen,
  };
}

async function main() {
  await rm(profileDir, { recursive: true, force: true });
  await mkdir(profileDir, { recursive: true });

  const chrome = spawn(
    chromePath,
    [
      `--user-data-dir=${profileDir}`,
      "--headless=new",
      "--disable-gpu",
      "--no-sandbox",
      "--hide-scrollbars",
      `--remote-debugging-port=${remotePort}`,
      "about:blank",
    ],
    {
      stdio: "ignore",
      windowsHide: true,
    },
  );

  try {
    const webSocketUrl = await waitForWebSocketUrl();
    const client = createProtocolClient(webSocketUrl);

    await client.waitForOpen();
    await client.send("Page.enable");
    await client.send("Emulation.setDeviceMetricsOverride", {
      width: 1440,
      height: 2200,
      deviceScaleFactor: 1,
      mobile: false,
    });

    const loadEvent = client.waitForEvent("Page.loadEventFired", 20000);
    await client.send("Page.navigate", { url: targetUrl });
    await loadEvent;
    await delay(3500);

    const { data } = await client.send("Page.captureScreenshot", {
      format: "png",
      fromSurface: true,
      captureBeyondViewport: true,
    });

    await writeFile(outputPath, Buffer.from(data, "base64"));
    client.close();
  } finally {
    chrome.kill();
    await delay(750);

    try {
      await rm(profileDir, { recursive: true, force: true });
    } catch {
      // Chrome can hold short-lived locks on profile files after exit.
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
