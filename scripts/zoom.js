// ============================================
// ZOOM - Editor zoom controls
// ============================================

function handleEditorZoom(e) {
  const zoomValue = parseInt(e.target.value);
  const minZoom = 0.9; // Slightly less than 1 to ensure full bleed at minimum zoom
  const maxZoom = 2.1; // Slightly more than 2 to ensure full bleed at maximum zoom

  editorZoomLevel = minZoom + (zoomValue / 100) * (maxZoom - minZoom);

  updateEditorScaleDisplay();
  resizeCanvas();
  drawCanvas();
}

function updateEditorScaleDisplay() {
  document.getElementById(
    "editorScaleDisplay"
  ).textContent = `1:${editorZoomLevel.toFixed(2)}`;
}
