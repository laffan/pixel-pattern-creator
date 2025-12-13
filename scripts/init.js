// ============================================
// INIT - Initialization functions
// ============================================

document.addEventListener("DOMContentLoaded", init);

function init() {
  canvas = document.getElementById("pixelCanvas");
  ctx = canvas.getContext("2d");
  previewCanvas = document.getElementById("previewCanvas");
  previewCtx = previewCanvas.getContext("2d");

  canvas.style.touchAction = "none";

  // Update input elements with current values and max
  const widthInput = document.getElementById("canvasWidth");
  const heightInput = document.getElementById("canvasHeight");

  widthInput.value = canvasSize.width;
  heightInput.value = canvasSize.height;

  widthInput.max = canvasMax;
  heightInput.max = canvasMax;

  initializePixelData();
  setupEventListeners();

  // Set up editor zoom slider
  const editorZoomSlider = document.getElementById("editorZoomSlider");
  editorZoomSlider.addEventListener("input", handleEditorZoom);

  // Initialize editor zoom
  handleEditorZoom({ target: { value: editorZoomSlider.value } });

  resizeCanvas();
  drawCanvas();
  updatePreview();
  document.getElementById("zoomSlider").min = zoomMin;
  document.getElementById("zoomSlider").max = zoomMax;
  document.getElementById("zoomSlider").value = zoomStart;
  updateScaleDisplay();
}

function initializePixelData() {
  pixelData = Array(canvasSize.height)
    .fill()
    .map(() => Array(canvasSize.width).fill(0));
  previewData = Array(canvasSize.height)
    .fill()
    .map(() => Array(canvasSize.width).fill(0));
}
