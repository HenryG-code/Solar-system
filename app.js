const NASA_APOD_ENDPOINT = "https://api.nasa.gov/planetary/apod";
const NASA_LIBRARY_ENDPOINT = "https://images-api.nasa.gov/search";
const DEFAULT_API_KEY = "DEMO_KEY";
const API_STORAGE_KEY = "universe-atlas:nasa-api-key";

const SOLAR_SYSTEM_REFERENCE = {
  x: 0.5,
  y: 0.5,
  orbitTilt: 0.33,
};

const SOLAR_DISPLAY_ARC = {
  start: 186,
  end: -38,
  rotationSpeed: 0.0000032,
};

const MAP_LABEL_CONFIG = {
  desktop: {
    bottomSafeArea: 130,
    labelHeight: 56,
    labelWidth: 148,
    padding: 18,
  },
  mobile: {
    bottomSafeArea: 162,
    labelHeight: 50,
    labelWidth: 128,
    padding: 12,
  },
};

const GENERIC_EXCLUDED_TERMS = [
  "astronaut",
  "spacesuit",
  "crew",
  "launch",
  "rocket",
  "booster",
  "press conference",
  "training",
  "technician",
  "control room",
  "capsule",
  "space station",
  "mission patch",
  "countdown",
];

const nodeDefinitions = [
  {
    id: "mercury",
    title: "Mercury",
    kicker: "Sun-scorched world",
    query: "Mercury planet global mosaic NASA",
    description: "Scorched cliffs and shadowed craters closest to the Sun.",
    orbit: 0.11,
    angle: -58,
    orbitSpeed: 0.00002,
    size: 14,
    color: "#b8ac97",
    labelDx: 18,
    labelDy: -72,
    preferredTerms: ["mercury", "planet", "surface", "mosaic", "crater", "global"],
  },
  {
    id: "venus",
    title: "Venus",
    kicker: "Cloud-shrouded",
    query: "Venus planet cloud tops NASA",
    description: "Sulfur clouds conceal a volcanic world glowing with trapped heat.",
    orbit: 0.17,
    angle: 20,
    orbitSpeed: 0.000014,
    size: 18,
    color: "#d7be93",
    labelDx: -156,
    labelDy: 10,
    preferredTerms: ["venus", "planet", "cloud", "global", "hemisphere", "ultraviolet"],
  },
  {
    id: "earth",
    title: "Earth",
    kicker: "Blue marble",
    query: "Earth blue marble NASA",
    description: "Our ocean world with weather bands, auroras, and the blue marble view.",
    orbit: 0.24,
    angle: -12,
    orbitSpeed: 0.00001,
    size: 21,
    color: "#4fbfff",
    labelDx: 20,
    labelDy: -76,
    preferredTerms: ["earth", "blue marble", "planet", "globe", "clouds", "aurora"],
    excludedTerms: ["iss", "international space station", "spacesuit", "spacewalk"],
  },
  {
    id: "moon",
    title: "Moon",
    kicker: "Lunar world",
    query: "Moon global mosaic lunar orbiter NASA",
    description: "Lunar maria, crater rims, and the silver quiet of our nearest world.",
    parentId: "earth",
    orbit: 0.024,
    angle: 54,
    orbitSpeed: 0.000055,
    size: 10,
    color: "#d7d8d6",
    labelDx: 16,
    labelDy: 18,
    preferredTerms: ["moon", "lunar", "surface", "mosaic", "crater", "orbit"],
    excludedTerms: ["apollo", "astronaut", "lander", "flag", "footprint", "rover"],
  },
  {
    id: "mars",
    title: "Mars",
    kicker: "Red planet",
    query: "Mars planet global mosaic NASA",
    description: "Rust-red deserts, canyon walls, and dust plains stretching across ancient ground.",
    orbit: 0.34,
    angle: 32,
    orbitSpeed: 0.000008,
    size: 17,
    color: "#d9714d",
    labelDx: 22,
    labelDy: 18,
    preferredTerms: ["mars", "planet", "global", "mosaic", "surface", "crater", "orbiter"],
    excludedTerms: [
      "rover",
      "curiosity",
      "perseverance",
      "opportunity",
      "spirit",
      "ingenuity",
      "lander",
      "self-portrait",
      "mastcam",
      "wheel",
      "drill",
    ],
  },
  {
    id: "jupiter",
    title: "Jupiter",
    kicker: "Gas giant",
    query: "Jupiter planet NASA composite",
    description: "The striped giant of storms, lightning, and immense polar cyclones.",
    orbit: 0.49,
    angle: -30,
    orbitSpeed: 0.000004,
    size: 37,
    color: "#d8ab87",
    labelDx: 22,
    labelDy: -48,
    preferredTerms: ["jupiter", "planet", "storm", "great red spot", "cloud", "global"],
  },
  {
    id: "saturn",
    title: "Saturn",
    kicker: "Ringed world",
    query: "Saturn planet rings NASA",
    description: "Rings, storms, and golden cloud belts spread across the outer system.",
    orbit: 0.63,
    angle: 12,
    orbitSpeed: 0.0000027,
    size: 30,
    color: "#d8c690",
    labelDx: 28,
    labelDy: -46,
    hasRings: true,
    preferredTerms: ["saturn", "planet", "rings", "cloud", "global", "cassini"],
  },
  {
    id: "neptune",
    title: "Neptune",
    kicker: "Ice giant",
    query: "Neptune planet Voyager NASA",
    description: "Blue high-speed winds roll at the edge of the known planetary family.",
    orbit: 0.79,
    angle: -10,
    orbitSpeed: 0.0000015,
    size: 24,
    color: "#6e9fff",
    labelDx: -162,
    labelDy: -32,
    preferredTerms: ["neptune", "planet", "blue", "storm", "global", "voyager"],
  },
  {
    id: "orion",
    title: "Orion Nebula",
    kicker: "Deep sky",
    query: "Orion Nebula NASA Hubble",
    description: "A luminous stellar nursery far beyond the planets, alive with newborn stars.",
    mapX: 0.34,
    mapY: 0.18,
    size: 16,
    color: "#8fe9ff",
    labelDx: -166,
    labelDy: -18,
    labelWidth: 164,
    realm: "deep",
    preferredTerms: ["orion", "nebula", "hubble", "stars", "gas", "dust"],
  },
  {
    id: "pillars",
    title: "Pillars of Creation",
    kicker: "Deep sky",
    query: "Pillars of Creation NASA",
    description: "Towering columns of dust and gas sculpted by radiation in the Eagle Nebula.",
    mapX: 0.56,
    mapY: 0.12,
    size: 14,
    color: "#ffe0aa",
    labelDx: -86,
    labelDy: -78,
    labelWidth: 176,
    realm: "deep",
    preferredTerms: ["pillars of creation", "eagle nebula", "nebula", "dust", "stars"],
  },
  {
    id: "andromeda",
    title: "Andromeda Galaxy",
    kicker: "Deep sky",
    query: "Andromeda galaxy NASA",
    description: "A spiral galaxy of billions of stars glowing beyond the edge of our solar neighborhood.",
    mapX: 0.82,
    mapY: 0.24,
    size: 15,
    color: "#adc3ff",
    labelDx: -178,
    labelDy: -24,
    labelWidth: 170,
    realm: "deep",
    preferredTerms: ["andromeda", "galaxy", "spiral", "stars", "deep space"],
  },
];

const state = {
  apiKey: localStorage.getItem(API_STORAGE_KEY) || DEFAULT_API_KEY,
  selectedNode: nodeDefinitions.find((node) => node.id === "mars") || nodeDefinitions[0],
  galleryItems: [],
  galleryRequestId: 0,
  animationTime: 0,
  labelLayouts: new Map(),
  solarLayout: null,
};

const elements = {
  apiKeyForm: document.querySelector("#apiKeyForm"),
  apiKeyInput: document.querySelector("#apiKeyInput"),
  apodMedia: document.querySelector("#apodMedia"),
  apodTitle: document.querySelector("#apodTitle"),
  apodDescription: document.querySelector("#apodDescription"),
  apodLink: document.querySelector("#apodLink"),
  surpriseButton: document.querySelector("#surpriseButton"),
  selectionTitle: document.querySelector("#selectionTitle"),
  selectionDescription: document.querySelector("#selectionDescription"),
  statusPill: document.querySelector("#statusPill"),
  resultCount: document.querySelector("#resultCount"),
  galleryGrid: document.querySelector("#galleryGrid"),
  mapOverlay: document.querySelector("#mapOverlay"),
  mapNodes: [],
  solarReference: document.querySelector("#solarReference"),
  starfield: document.querySelector("#starfield"),
  imageDialog: document.querySelector("#imageDialog"),
  dialogClose: document.querySelector("#dialogClose"),
  dialogImage: document.querySelector("#dialogImage"),
  dialogTitle: document.querySelector("#dialogTitle"),
  dialogDescription: document.querySelector("#dialogDescription"),
  dialogLink: document.querySelector("#dialogLink"),
};

const starState = {
  animationFrame: 0,
  stars: [],
  asteroidBelt: [],
  dpr: Math.min(window.devicePixelRatio || 1, 2),
  width: 0,
  height: 0,
};

elements.apiKeyInput.value = state.apiKey === DEFAULT_API_KEY ? "" : state.apiKey;

function initializeMapNodes() {
  renderMapNodes();
  window.addEventListener("resize", () => syncMapLayout(state.animationTime));
}

function renderMapNodes() {
  elements.mapOverlay.innerHTML = nodeDefinitions
    .map((node) => {
      const activeClass = node.id === state.selectedNode.id ? " is-active" : "";
      const ringClass = node.hasRings ? " map-node--ringed" : "";
      const deepClass = node.realm === "deep" ? " map-node--deep-space" : "";

      return `
        <button
          class="map-node${activeClass}${ringClass}${deepClass}"
          data-node-id="${node.id}"
          type="button"
          style="
            --planet-size:${node.size}px;
            --planet-color:${node.color};
            --planet-glow:${hexToRgba(node.color, 0.52)};
            --label-x:${node.labelDx}px;
            --label-y:${node.labelDy}px;
            --label-width:${node.labelWidth || MAP_LABEL_CONFIG.desktop.labelWidth}px;
          "
        >
          <span class="map-node__body" aria-hidden="true"></span>
          <span class="map-node__label">
            <strong>${escapeHtml(node.title)}</strong>
            <small>${escapeHtml(node.kicker)}</small>
          </span>
        </button>
      `;
    })
    .join("");

  elements.mapNodes = Array.from(elements.mapOverlay.querySelectorAll(".map-node"));

  elements.mapNodes.forEach((mapNode) => {
    mapNode.addEventListener("click", () => {
      const selectedNode = nodeDefinitions.find(
        (definition) => definition.id === mapNode.dataset.nodeId,
      );

      if (!selectedNode) {
        return;
      }

      selectNode(selectedNode);
    });
  });

  syncMapLayout();
}

function syncMapLayout(time = 0) {
  const frame = elements.mapOverlay.getBoundingClientRect();

  if (!frame.width || !frame.height) {
    return;
  }

  const layout = computeSolarLayout(frame.width, frame.height, time);
  state.solarLayout = layout;
  const labelLayouts = computeLabelLayout(layout, frame.width, frame.height);
  state.labelLayouts = labelLayouts;

  if (elements.solarReference) {
    elements.solarReference.style.setProperty("--sun-x", `${layout.sun.x}px`);
    elements.solarReference.style.setProperty("--sun-y", `${layout.sun.y}px`);
  }

  elements.mapNodes.forEach((mapNode) => {
    const layoutNode = layout.nodes.get(mapNode.dataset.nodeId);

    if (!layoutNode) {
      return;
    }

    mapNode.style.left = `${layoutNode.x}px`;
    mapNode.style.top = `${layoutNode.y}px`;

    const labelLayout = labelLayouts.get(mapNode.dataset.nodeId);

    if (labelLayout) {
      mapNode.style.setProperty("--label-x", `${labelLayout.dx}px`);
      mapNode.style.setProperty("--label-y", `${labelLayout.dy}px`);
      mapNode.style.setProperty("--label-width", `${labelLayout.width}px`);
    }
  });
}

function computeSolarLayout(width, height, time = 0) {
  const mobile = width <= 720;
  const primaryNodes = nodeDefinitions.filter((node) => !node.parentId && node.realm !== "deep");
  const sun = {
    x: width * SOLAR_SYSTEM_REFERENCE.x,
    y: height * SOLAR_SYSTEM_REFERENCE.y,
  };
  const horizontalPadding = mobile ? 58 : 120;
  const topPadding = mobile ? 96 : 88;
  const bottomPadding = mobile ? 210 : 176;
  const outerOrbitX = Math.min(
    sun.x - horizontalPadding,
    width - sun.x - horizontalPadding,
    (sun.y - topPadding) / SOLAR_SYSTEM_REFERENCE.orbitTilt,
    (height - sun.y - bottomPadding) / SOLAR_SYSTEM_REFERENCE.orbitTilt,
  );
  const innerOrbitX = Math.max(mobile ? 58 : 92, outerOrbitX * (mobile ? 0.29 : 0.26));
  const orbitSpan = Math.max(1, outerOrbitX - innerOrbitX);
  const arcRotation = time * SOLAR_DISPLAY_ARC.rotationSpeed;

  const nodes = new Map();

  nodeDefinitions.forEach((node) => {
    if (typeof node.mapX === "number" && typeof node.mapY === "number") {
      nodes.set(node.id, {
        ...node,
        x: width * node.mapX,
        y: height * node.mapY,
        orbitX: 0,
        orbitY: 0,
      });

      return;
    }

    if (node.parentId) {
      const parent = nodes.get(node.parentId);

      if (!parent) {
        return;
      }

      const orbitX = Math.max(24, Math.min(36, innerOrbitX * 0.34));
      const orbitY = orbitX * 0.62;
      const angle = degreesToRadians(node.angle) + time * (node.orbitSpeed || 0);

      nodes.set(node.id, {
        ...node,
        x: parent.x + Math.cos(angle) * orbitX,
        y: parent.y + Math.sin(angle) * orbitY,
        orbitX,
        orbitY,
        parentId: node.parentId,
      });

      return;
    }

    const nodeIndex = primaryNodes.findIndex((entry) => entry.id === node.id);
    const nodeRatio =
      primaryNodes.length <= 1 ? 0.5 : nodeIndex / (primaryNodes.length - 1);
    const orbitX = innerOrbitX + orbitSpan * nodeRatio;
    const orbitY = orbitX * SOLAR_SYSTEM_REFERENCE.orbitTilt;
    const displayAngle = lerp(SOLAR_DISPLAY_ARC.start, SOLAR_DISPLAY_ARC.end, nodeRatio);
    const angle = degreesToRadians(displayAngle) + arcRotation;

    nodes.set(node.id, {
      ...node,
      x: sun.x + Math.cos(angle) * orbitX,
      y: sun.y + Math.sin(angle) * orbitY,
      orbitX,
      orbitY,
    });
  });

  return { sun, nodes };
}

function computeLabelLayout(layout, width, height) {
  const mobile = width <= 720;
  const config = mobile ? MAP_LABEL_CONFIG.mobile : MAP_LABEL_CONFIG.desktop;
  const safeTop = config.padding + 40;
  const safeBottom = config.bottomSafeArea;
  const labelLayouts = new Map();
  const placedRects = [];
  const planets = Array.from(layout.nodes.values()).map((node) => ({
    id: node.id,
    x: node.x,
    y: node.y,
    radius: Math.max(node.size * 0.7, 10),
  }));
  const sunRadius = Math.min(96, Math.max(68, width * 0.07));

  nodeDefinitions.forEach((nodeDefinition) => {
    const node = layout.nodes.get(nodeDefinition.id);
    const previousLabelLayout = state.labelLayouts.get(nodeDefinition.id);

    if (!node) {
      return;
    }

    const labelWidth =
      node.labelWidth || (node.id === "moon" && mobile ? 118 : config.labelWidth);
    const labelHeight = config.labelHeight;
    const candidates = buildLabelCandidates(node, labelWidth, labelHeight, config.padding);
    let bestCandidate = null;

    candidates.forEach((candidate, index) => {
      const rawRect = {
        x: node.x + candidate.dx,
        y: node.y + candidate.dy,
        width: labelWidth,
        height: labelHeight,
      };
      const rect = {
        x: clamp(rawRect.x, config.padding, width - labelWidth - config.padding),
        y: clamp(rawRect.y, safeTop, height - labelHeight - safeBottom),
        width: labelWidth,
        height: labelHeight,
      };
      const score = measureLabelScore({
        rect,
        node,
        planets,
        placedRects,
        previousRect: previousLabelLayout
          ? {
              x: node.x + previousLabelLayout.dx,
              y: node.y + previousLabelLayout.dy,
              width: previousLabelLayout.width,
              height: labelHeight,
            }
          : null,
        sun: { x: layout.sun.x, y: layout.sun.y, radius: sunRadius },
        preferredRect: rawRect,
        candidateIndex: index,
      });

      if (!bestCandidate || score < bestCandidate.score) {
        bestCandidate = { rect, score };
      }
    });

    if (!bestCandidate) {
      return;
    }

    placedRects.push({ ...bestCandidate.rect, id: node.id });
    labelLayouts.set(node.id, {
      dx: bestCandidate.rect.x - node.x,
      dy: bestCandidate.rect.y - node.y,
      width: labelWidth,
    });
  });

  return labelLayouts;
}

function buildLabelCandidates(node, labelWidth, labelHeight, gap) {
  const sideGap = gap + node.size * 0.5;
  const verticalGap = gap + node.size * 0.25;

  return dedupeCandidates([
    { dx: node.labelDx, dy: node.labelDy },
    { dx: sideGap, dy: -labelHeight - verticalGap },
    { dx: sideGap, dy: verticalGap },
    { dx: -labelWidth - sideGap, dy: -labelHeight - verticalGap },
    { dx: -labelWidth - sideGap, dy: verticalGap },
    { dx: -labelWidth * 0.5, dy: -labelHeight - verticalGap },
    { dx: -labelWidth * 0.5, dy: verticalGap },
    { dx: sideGap, dy: -labelHeight * 0.5 },
    { dx: -labelWidth - sideGap, dy: -labelHeight * 0.5 },
  ]);
}

function dedupeCandidates(candidates) {
  const seen = new Set();

  return candidates.filter((candidate) => {
    const key = `${Math.round(candidate.dx)}:${Math.round(candidate.dy)}`;

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

function measureLabelScore({
  rect,
  node,
  planets,
  placedRects,
  previousRect,
  sun,
  preferredRect,
  candidateIndex,
}) {
  let score = candidateIndex * 5;
  score += Math.abs(rect.x - preferredRect.x) * 0.8;
  score += Math.abs(rect.y - preferredRect.y) * 0.8;

  if (previousRect) {
    score += Math.abs(rect.x - previousRect.x) * 0.35;
    score += Math.abs(rect.y - previousRect.y) * 0.35;
  }

  placedRects.forEach((placedRect) => {
    const overlap = rectOverlapArea(rect, placedRect);

    if (overlap > 0) {
      score += 5000 + overlap * 4;
    }
  });

  planets.forEach((planet) => {
    if (planet.id === node.id) {
      return;
    }

    if (circleIntersectsRect(planet, rect, 10)) {
      score += 3000;
    }
  });

  if (circleIntersectsRect(sun, rect, 32)) {
    score += 6500;
  }

  return score;
}

function rectOverlapArea(first, second) {
  const width = Math.max(
    0,
    Math.min(first.x + first.width, second.x + second.width) - Math.max(first.x, second.x),
  );
  const height = Math.max(
    0,
    Math.min(first.y + first.height, second.y + second.height) - Math.max(first.y, second.y),
  );

  return width * height;
}

function circleIntersectsRect(circle, rect, padding = 0) {
  const nearestX = clamp(circle.x, rect.x - padding, rect.x + rect.width + padding);
  const nearestY = clamp(circle.y, rect.y - padding, rect.y + rect.height + padding);
  const dx = circle.x - nearestX;
  const dy = circle.y - nearestY;

  return dx * dx + dy * dy < circle.radius * circle.radius;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function lerp(start, end, ratio) {
  return start + (end - start) * ratio;
}

function initializeApiKeyForm() {
  elements.apiKeyForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const nextKey = elements.apiKeyInput.value.trim() || DEFAULT_API_KEY;

    state.apiKey = nextKey;

    if (nextKey === DEFAULT_API_KEY) {
      localStorage.removeItem(API_STORAGE_KEY);
    } else {
      localStorage.setItem(API_STORAGE_KEY, nextKey);
    }

    setStatus("Refreshing NASA spotlight...");
    await loadApod();
    setStatus(`Ready for ${state.selectedNode.title}`);
  });
}

function initializeDialog() {
  elements.dialogClose.addEventListener("click", closeDialog);

  elements.imageDialog.addEventListener("click", (event) => {
    if (event.target === elements.imageDialog) {
      closeDialog();
    }
  });
}

function initializeSurpriseButton() {
  elements.surpriseButton.addEventListener("click", () => {
    const nextNode =
      nodeDefinitions[Math.floor(Math.random() * nodeDefinitions.length)];
    selectNode(nextNode);
  });
}

function setStatus(message) {
  elements.statusPill.textContent = message;
}

function setSelectedNodeUI(node) {
  state.selectedNode = node;
  elements.selectionTitle.textContent = node.title;
  elements.selectionDescription.textContent = node.description;

  elements.mapNodes.forEach((mapNode) => {
    mapNode.classList.toggle("is-active", mapNode.dataset.nodeId === node.id);
  });
}

async function selectNode(node) {
  setSelectedNodeUI(node);
  setStatus(`Scanning NASA archives for ${node.title}...`);
  await loadGallery(node);
}

async function loadApod() {
  const url = new URL(NASA_APOD_ENDPOINT);
  url.searchParams.set("api_key", state.apiKey);
  url.searchParams.set("thumbs", "true");

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`APOD request failed: ${response.status}`);
    }

    const apod = await response.json();
    renderApod(apod);
  } catch (error) {
    elements.apodTitle.textContent = "NASA spotlight unavailable right now";
    elements.apodDescription.textContent =
      "The daily APOD request did not complete. The archive map still works, and you can try again with a personal NASA API key.";
    elements.apodMedia.innerHTML =
      '<div class="media-placeholder"><span>APOD request could not be loaded.</span></div>';
    elements.apodLink.href = "https://api.nasa.gov/";
    elements.apodLink.textContent = "Get a NASA API key";
    console.error(error);
  }
}

function renderApod(apod) {
  const previewUrl =
    apod.media_type === "video" ? apod.thumbnail_url || "" : apod.url || "";

  elements.apodTitle.textContent = apod.title || "Astronomy Picture of the Day";
  elements.apodDescription.textContent =
    apod.explanation || "NASA did not return a description for this daily feature.";
  elements.apodLink.href = apod.hdurl || apod.url || "https://apod.nasa.gov/apod/astropix.html";
  elements.apodLink.textContent = "Open full NASA feature";

  if (apod.media_type === "video" && apod.url) {
    elements.apodMedia.innerHTML = `<iframe src="${apod.url}" title="${escapeAttribute(
      apod.title || "NASA APOD video",
    )}" allow="fullscreen"></iframe>`;
    return;
  }

  if (previewUrl) {
    elements.apodMedia.innerHTML = `<img src="${previewUrl}" alt="${escapeAttribute(
      apod.title || "Astronomy Picture of the Day",
    )}" />`;
    return;
  }

  elements.apodMedia.innerHTML =
    '<div class="media-placeholder"><span>NASA returned this feature without preview media.</span></div>';
}

async function loadGallery(node) {
  const url = new URL(NASA_LIBRARY_ENDPOINT);
  url.searchParams.set("q", node.query);
  url.searchParams.set("media_type", "image");
  const requestId = ++state.galleryRequestId;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`NASA library request failed: ${response.status}`);
    }

    const payload = await response.json();
    const items = (payload.collection?.items || [])
      .map((item) => normalizeLibraryItem(item, node))
      .filter(Boolean)
      .sort((first, second) => second.score - first.score)
      .slice(0, 9);

    if (requestId !== state.galleryRequestId) {
      return;
    }

    state.galleryItems = items;
    renderGallery();
    setStatus(`Locked onto ${node.title}`);
    elements.resultCount.textContent = `${items.length} images loaded`;
  } catch (error) {
    if (requestId !== state.galleryRequestId) {
      return;
    }

    state.galleryItems = [];
    renderGallery(
      "NASA's image library did not respond for this destination. Try another region or reload the page.",
    );
    elements.resultCount.textContent = "0 images loaded";
    setStatus("NASA archive request failed");
    console.error(error);
  }
}

function normalizeLibraryItem(item, node) {
  const metadata = item.data?.[0];
  const imageLink = item.links?.find((link) => link.render === "image")?.href;

  if (!metadata || !imageLink) {
    return null;
  }

  const nasaId = metadata.nasa_id;
  const rawDescription = stripHtml(metadata.description || metadata.description_508 || "");
  const keywords = Array.isArray(metadata.keywords) ? metadata.keywords.join(" ") : "";
  const searchableText = [
    metadata.title,
    rawDescription,
    keywords,
    metadata.location,
    metadata.photographer,
    metadata.secondary_creator,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  if (includesAnyTerm(searchableText, GENERIC_EXCLUDED_TERMS)) {
    return null;
  }

  if (includesAnyTerm(searchableText, node.excludedTerms || [])) {
    return null;
  }

  let score = 0;
  score += countTermMatches(searchableText, node.preferredTerms || []) * 8;
  score += imageLink.toLowerCase().includes("thumb") ? -6 : 4;
  const description = truncateCopy(
    rawDescription,
    160,
  );

  return {
    title: metadata.title || "Untitled NASA image",
    description: description || "No description was included with this NASA archive image.",
    imageUrl: imageLink,
    libraryUrl: nasaId ? `https://images.nasa.gov/details-${nasaId}` : "https://images.nasa.gov/",
    score,
  };
}

function renderGallery(message) {
  if (!state.galleryItems.length) {
    elements.galleryGrid.innerHTML = `<div class="gallery-empty">${message || "No images matched this destination yet."}</div>`;
    return;
  }

  elements.galleryGrid.innerHTML = state.galleryItems
    .map(
      (item, index) => `
        <article class="gallery-card" style="animation-delay:${index * 70}ms">
          <button type="button" data-gallery-index="${index}">
            <img src="${item.imageUrl}" alt="${escapeAttribute(item.title)}" loading="lazy" />
            <div class="gallery-copy">
              <h3>${escapeHtml(item.title)}</h3>
              <p>${escapeHtml(item.description)}</p>
            </div>
          </button>
        </article>
      `,
    )
    .join("");

  elements.galleryGrid.querySelectorAll("[data-gallery-index]").forEach((button) => {
    button.addEventListener("click", () => {
      const galleryItem = state.galleryItems[Number(button.dataset.galleryIndex)];

      if (!galleryItem) {
        return;
      }

      openDialog(galleryItem);
    });
  });
}

function openDialog(item) {
  elements.dialogImage.src = item.imageUrl;
  elements.dialogImage.alt = item.title;
  elements.dialogTitle.textContent = item.title;
  elements.dialogDescription.textContent = item.description;
  elements.dialogLink.href = item.libraryUrl;

  if (typeof elements.imageDialog.showModal === "function") {
    elements.imageDialog.showModal();
    return;
  }

  elements.imageDialog.setAttribute("open", "open");
}

function closeDialog() {
  if (typeof elements.imageDialog.close === "function") {
    elements.imageDialog.close();
    return;
  }

  elements.imageDialog.removeAttribute("open");
}

function stripHtml(text) {
  const container = document.createElement("div");
  container.innerHTML = text;
  return container.textContent || container.innerText || "";
}

function truncateCopy(text, maxLength) {
  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength).trimEnd()}...`;
}

function escapeHtml(text) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function escapeAttribute(text) {
  return escapeHtml(text);
}

function includesAnyTerm(text, terms) {
  return terms.some((term) => text.includes(term.toLowerCase()));
}

function countTermMatches(text, terms) {
  return terms.reduce(
    (count, term) => (text.includes(term.toLowerCase()) ? count + 1 : count),
    0,
  );
}

function hexToRgba(hex, alpha) {
  const normalized = hex.replace("#", "");
  const chunkSize = normalized.length === 3 ? 1 : 2;
  const values = normalized.match(new RegExp(`.{1,${chunkSize}}`, "g")) || [];
  const [r, g, b] = values.map((value) => {
    const channel = chunkSize === 1 ? `${value}${value}` : value;
    return Number.parseInt(channel, 16);
  });

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function degreesToRadians(value) {
  return (value * Math.PI) / 180;
}

function initializeStarfield() {
  const context = elements.starfield.getContext("2d");

  if (!context) {
    return;
  }

  function resize() {
    const frame = elements.starfield.getBoundingClientRect();
    starState.width = frame.width;
    starState.height = frame.height;

    elements.starfield.width = frame.width * starState.dpr;
    elements.starfield.height = frame.height * starState.dpr;
    context.setTransform(starState.dpr, 0, 0, starState.dpr, 0, 0);

    const starCount = Math.max(720, Math.floor((frame.width * frame.height) / 1300));
    starState.stars = createStarField(frame.width, frame.height, starCount);
    starState.asteroidBelt = Array.from({ length: 180 }, () => createAsteroid());
    syncMapLayout(state.animationTime);
  }

  function render(time = 0) {
    state.animationTime = time;
    syncMapLayout(time);
    context.clearRect(0, 0, starState.width, starState.height);

    starState.stars.forEach((star) => {
      const driftX = Math.sin(time * star.twinkleSpeed + star.phase) * star.drift;
      const driftY =
        Math.cos(time * star.twinkleSpeed * 0.6 + star.phase) * star.drift * 0.38;
      const alpha =
        star.baseAlpha + Math.sin(time * star.twinkleSpeed + star.phase) * 0.2;

      context.beginPath();
      context.fillStyle = star.tint(alpha);
      context.arc(star.x + driftX, star.y + driftY, star.radius, 0, Math.PI * 2);
      context.fill();
    });

    drawSolarSystemGuides(context, time);
    starState.animationFrame = window.requestAnimationFrame(render);
  }

  resize();
  window.addEventListener("resize", resize);
  render();
}

function createStarField(width, height, count) {
  const aspectRatio = width / Math.max(height, 1);
  const columns = Math.max(1, Math.round(Math.sqrt(count * aspectRatio)));
  const rows = Math.max(1, Math.ceil(count / columns));
  const cellWidth = width / columns;
  const cellHeight = height / rows;
  const stars = [];

  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      if (stars.length >= count) {
        break;
      }

      stars.push(
        createStar(
          column * cellWidth + Math.random() * cellWidth,
          row * cellHeight + Math.random() * cellHeight,
        ),
      );
    }
  }

  return stars;
}

function createStar(x, y) {
  const warm = Math.random() > 0.82;

  return {
    x,
    y,
    radius: Math.random() * 1.35 + 0.16,
    baseAlpha: Math.random() * 0.48 + 0.24,
    twinkleSpeed: Math.random() * 0.0017 + 0.0004,
    phase: Math.random() * Math.PI * 2,
    drift: Math.random() * 1.25 + 0.15,
    tint(alpha) {
      return warm
        ? `rgba(255, 228, 188, ${alpha})`
        : `rgba(222, 239, 255, ${alpha})`;
    },
  };
}

function createAsteroid() {
  return {
    angle: Math.random() * Math.PI * 2,
    spread: Math.random() * 36 - 18,
    size: Math.random() * 1.7 + 0.25,
    alpha: Math.random() * 0.3 + 0.16,
  };
}

function drawSolarSystemGuides(context, time) {
  const layout = state.solarLayout;

  if (!layout) {
    return;
  }

  drawEclipticBand(context, layout);
  drawOrbitGuides(context, layout);
  drawAsteroidBelt(context, layout, time);
  drawMoonOrbit(context, layout);
  drawDeepSpaceBridge(context, layout);
}

function drawEclipticBand(context, layout) {
  const earth = layout.nodes.get("earth");
  const jupiter = layout.nodes.get("jupiter");
  const saturn = layout.nodes.get("saturn");

  if (!earth || !jupiter || !saturn) {
    return;
  }

  const gradient = context.createLinearGradient(
    layout.sun.x,
    layout.sun.y,
    saturn.x + 40,
    saturn.y,
  );

  gradient.addColorStop(0, "rgba(255, 176, 70, 0.11)");
  gradient.addColorStop(0.28, "rgba(114, 230, 255, 0.07)");
  gradient.addColorStop(0.72, "rgba(74, 143, 255, 0.04)");
  gradient.addColorStop(1, "rgba(12, 33, 74, 0)");

  context.save();
  context.strokeStyle = gradient;
  context.lineCap = "round";
  context.lineWidth = Math.min(88, starState.height * 0.125);
  context.beginPath();
  context.moveTo(layout.sun.x + 18, layout.sun.y - 8);
  context.bezierCurveTo(
    earth.x - 50,
    earth.y - 88,
    jupiter.x - 80,
    jupiter.y + 62,
    saturn.x - 22,
    saturn.y - 4,
  );
  context.stroke();
  context.restore();
}

function drawOrbitGuides(context, layout) {
  context.save();
  context.strokeStyle = "rgba(153, 194, 235, 0.17)";
  context.lineWidth = 1;

  nodeDefinitions
    .filter((node) => !node.parentId && node.realm !== "deep")
    .forEach((node, index) => {
      const positionedNode = layout.nodes.get(node.id);

      if (!positionedNode) {
        return;
      }

      context.setLineDash(index % 2 === 0 ? [5, 10] : [2, 8]);
      context.beginPath();
      context.ellipse(
        layout.sun.x,
        layout.sun.y,
        positionedNode.orbitX,
        positionedNode.orbitY,
        0,
        0,
        Math.PI * 2,
      );
      context.stroke();
    });

  context.restore();
}

function drawAsteroidBelt(context, layout, time) {
  const mars = layout.nodes.get("mars");
  const jupiter = layout.nodes.get("jupiter");

  if (!mars || !jupiter) {
    return;
  }

  const beltOrbitX = (mars.orbitX + jupiter.orbitX) * 0.5;
  const beltOrbitY = beltOrbitX * SOLAR_SYSTEM_REFERENCE.orbitTilt;

  context.save();

  starState.asteroidBelt.forEach((asteroid) => {
    const orbitX = beltOrbitX + asteroid.spread;
    const orbitY = beltOrbitY + asteroid.spread * SOLAR_SYSTEM_REFERENCE.orbitTilt;
    const angle = asteroid.angle + time * 0.00004;
    const x = layout.sun.x + Math.cos(angle) * orbitX;
    const y = layout.sun.y + Math.sin(angle) * orbitY;

    context.beginPath();
    context.fillStyle = `rgba(201, 185, 148, ${asteroid.alpha})`;
    context.arc(x, y, asteroid.size, 0, Math.PI * 2);
    context.fill();
  });

  context.restore();
}

function drawMoonOrbit(context, layout) {
  const earth = layout.nodes.get("earth");
  const moon = layout.nodes.get("moon");

  if (!earth || !moon) {
    return;
  }

  context.save();
  context.strokeStyle = "rgba(190, 216, 255, 0.18)";
  context.lineWidth = 1;
  context.setLineDash([3, 5]);
  context.beginPath();
  context.ellipse(earth.x, earth.y, moon.orbitX, moon.orbitY, 0, 0, Math.PI * 2);
  context.stroke();
  context.restore();
}

function drawDeepSpaceBridge(context, layout) {
  const orion = layout.nodes.get("orion");
  const pillars = layout.nodes.get("pillars");
  const andromeda = layout.nodes.get("andromeda");
  const neptune = layout.nodes.get("neptune");

  if (!orion || !pillars || !andromeda || !neptune) {
    return;
  }

  context.save();
  context.strokeStyle = "rgba(143, 233, 255, 0.2)";
  context.lineWidth = 1.1;
  context.setLineDash([4, 9]);

  context.beginPath();
  context.moveTo(orion.x, orion.y);
  context.quadraticCurveTo(pillars.x - 20, pillars.y - 35, pillars.x, pillars.y);
  context.quadraticCurveTo(andromeda.x - 80, andromeda.y + 25, andromeda.x, andromeda.y);
  context.stroke();

  context.beginPath();
  context.moveTo(neptune.x + 18, neptune.y - 18);
  context.quadraticCurveTo(
    neptune.x + 60,
    neptune.y - 120,
    andromeda.x - 22,
    andromeda.y + 8,
  );
  context.stroke();
  context.restore();
}

async function bootstrap() {
  initializeMapNodes();
  initializeApiKeyForm();
  initializeDialog();
  initializeSurpriseButton();
  initializeStarfield();
  setSelectedNodeUI(state.selectedNode);
  setStatus("Initializing NASA feed...");
  await loadApod();
  await loadGallery(state.selectedNode);
}

bootstrap();
