// ============================================
// EVENTS - Event listener setup
// ============================================

function setupEventListeners() {
  canvas.addEventListener("mousedown", startDrawing);
  canvas.addEventListener("mousemove", handleMouseMove);
  canvas.addEventListener("mouseup", stopDrawing);
  canvas.addEventListener("mouseleave", cancelDrawing);

  // New touch event listeners
  canvas.addEventListener("touchstart", handleTouchStart, { passive: false });
  canvas.addEventListener("touchmove", handleTouchMove, { passive: false });
  canvas.addEventListener("touchend", handleTouchEnd, { passive: false });

  setupSizeControls();

  document
    .getElementById("canvasWidth")
    .addEventListener("change", updateCanvasSize);
  document
    .getElementById("canvasHeight")
    .addEventListener("change", updateCanvasSize);

  document
    .getElementById("zoomSlider")
    .addEventListener("input", handleZoomChange);

  document
    .getElementById("uploadBtn")
    .addEventListener("click", triggerFileInput);
  document
    .getElementById("downloadBtn")
    .addEventListener("click", downloadCanvas);
  document
    .getElementById("fileInput")
    .addEventListener("change", handleFileUpload);

  document.getElementById("invertBtn").addEventListener("click", invertCanvas);

  document
    .getElementById("blackColorPicker")
    .addEventListener("change", updatePreviewColors);
  document
    .getElementById("whiteColorPicker")
    .addEventListener("change", updatePreviewColors);

  window.addEventListener("resize", resizeCanvas);
}
