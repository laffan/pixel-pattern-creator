// ============================================
// DRAWING - Drawing interaction functions
// ============================================

function startDrawing(e) {
  isDrawing = true;
  const coords = getPixelCoords(e);
  startPixel = coords;
  currentPixel = coords;
  dragStartColor = pixelData[coords.y][coords.x];

  // Start the hold timer
  holdTimer = setTimeout(() => {
    if (currentPixel.x === startPixel.x && currentPixel.y === startPixel.y) {
      isHoldingForLine = true;
      clearPreviewData();
      updateDragPreview();
    }
  }, holdDuration);

  // Immediately toggle the first pixel
  togglePixel(coords.x, coords.y);
}

function handleMouseMove(e) {
  if (!isDrawing) return;

  const coords = getPixelCoords(e);

  if (coords.x !== currentPixel.x || coords.y !== currentPixel.y) {
    currentPixel = coords;

    if (!isHoldingForLine) {
      // If we've moved before the hold timer completes, cancel the timer
      clearTimeout(holdTimer);
      // Paint individual pixels
      togglePixel(coords.x, coords.y);
    } else {
      // Update the line preview
      updateDragPreview();
    }
  }
}

function stopDrawing() {
  clearTimeout(holdTimer);

  if (isHoldingForLine) {
    applyDragPreview();
  }

  isDrawing = false;
  isHoldingForLine = false;
  startPixel = null;
  currentPixel = null;
  dragStartColor = null;
  clearPreviewData();
  drawCanvas();
  updatePreview();
}

function cancelDrawing() {
  clearTimeout(holdTimer);
  isDrawing = false;
  isHoldingForLine = false;
  startPixel = null;
  currentPixel = null;
  dragStartColor = null;
  clearPreviewData();
  drawCanvas();
  updatePreview();
}

function togglePixel(x, y) {
  if (x < 0 || x >= canvasSize.width || y < 0 || y >= canvasSize.height) return;

  pixelData[y][x] = 1 - pixelData[y][x];
  drawCanvas();
}

function invertCanvas() {
  for (let y = 0; y < canvasSize.height; y++) {
    for (let x = 0; x < canvasSize.width; x++) {
      pixelData[y][x] = 1 - pixelData[y][x];
    }
  }
  drawCanvas();
  updatePreview();
}
