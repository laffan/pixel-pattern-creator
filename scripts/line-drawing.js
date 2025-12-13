// ============================================
// LINE DRAWING - Line preview and Bresenham algorithm
// ============================================

function updateDragPreview() {
  clearPreviewData();
  const x0 = startPixel.x,
    y0 = startPixel.y;
  const x1 = currentPixel.x,
    y1 = currentPixel.y;

  // Use Bresenham's line algorithm for more accurate line drawing
  const dx = Math.abs(x1 - x0);
  const dy = Math.abs(y1 - y0);
  const sx = x0 < x1 ? 1 : -1;
  const sy = y0 < y1 ? 1 : -1;
  let err = dx - dy;

  let x = x0;
  let y = y0;

  while (true) {
    setPreviewPixel(x, y);
    if (x === x1 && y === y1) break;
    const e2 = 2 * err;
    if (e2 > -dy) {
      err -= dy;
      x += sx;
    }
    if (e2 < dx) {
      err += dx;
      y += sy;
    }
  }

  drawCanvas();
}

function setPreviewPixel(x, y) {
  x = (x + canvasSize.width) % canvasSize.width;
  y = (y + canvasSize.height) % canvasSize.height;
  previewData[y][x] = 1;
}

function clearPreviewData() {
  previewData = Array(canvasSize.height)
    .fill()
    .map(() => Array(canvasSize.width).fill(0));
}

function applyDragPreview() {
  const newColor = 1 - dragStartColor;
  for (let y = 0; y < canvasSize.height; y++) {
    for (let x = 0; x < canvasSize.width; x++) {
      if (previewData[y][x]) {
        pixelData[y][x] = newColor;
      }
    }
  }
}
