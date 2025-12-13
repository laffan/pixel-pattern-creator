// ============================================
// PREVIEW - Preview canvas and zoom controls
// ============================================

function handleZoomChange(e) {
  zoomLevel = parseInt(e.target.value);
  updateScaleDisplay();
  updatePreview();
}

function updateScaleDisplay() {
  document.getElementById("scaleDisplay").textContent = `1:${zoomLevel}`;
}

function updatePreviewColors(e) {
  if (e.target.id === "blackColorPicker") {
    previewColors.black = e.target.value;
  } else {
    previewColors.white = e.target.value;
  }
  updatePreview();
}

function updatePreview() {
  const previewContainer = document.getElementById("previewContainer");
  const containerWidth = previewContainer.clientWidth;
  const containerHeight = previewContainer.clientHeight;

  const scaledWidth = Math.floor(canvasSize.width * zoomLevel);
  const scaledHeight = Math.floor(canvasSize.height * zoomLevel);

  previewCanvas.width = containerWidth;
  previewCanvas.height = containerHeight;

  previewCtx.clearRect(0, 0, previewCanvas.width, previewCanvas.height);

  const patternCanvas = document.createElement("canvas");
  patternCanvas.width = scaledWidth;
  patternCanvas.height = scaledHeight;
  const patternCtx = patternCanvas.getContext("2d");
  patternCtx.imageSmoothingEnabled = false;

  for (let y = 0; y < canvasSize.height; y++) {
    for (let x = 0; x < canvasSize.width; x++) {
      patternCtx.fillStyle = pixelData[y][x]
        ? previewColors.black
        : previewColors.white;
      patternCtx.fillRect(x * zoomLevel, y * zoomLevel, zoomLevel, zoomLevel);
    }
  }

  const pattern = previewCtx.createPattern(patternCanvas, "repeat");
  previewCtx.fillStyle = pattern;
  previewCtx.fillRect(0, 0, previewCanvas.width, previewCanvas.height);
}
