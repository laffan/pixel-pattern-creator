// ============================================
// CANVAS - Canvas rendering functions
// ============================================

function resizeCanvas() {
  const container = document.getElementById("canvasContainer");
  const containerWidth = container.clientWidth;
  const containerHeight = container.clientHeight;

  // Calculate the size to fit the 3x3 grid at minimum zoom
  const minTileSize = Math.min(containerWidth / 3, containerHeight / 3);

  // Calculate the size to fit the largest dimension of the primary instance at maximum zoom
  const maxTileSize = Math.min(containerWidth, containerHeight);

  // Calculate the current tile size based on the zoom level
  const currentTileSize =
    minTileSize + (maxTileSize - minTileSize) * (editorZoomLevel - 1);

  // Calculate pixel size
  pixelSize = Math.floor(
    currentTileSize / Math.max(canvasSize.width, canvasSize.height)
  );

  // Set the canvas size
  canvas.width = containerWidth;
  canvas.height = containerHeight;

  // Calculate the size of a single instance
  const instanceWidth = canvasSize.width * pixelSize;
  const instanceHeight = canvasSize.height * pixelSize;

  // Store the repeatable area information for later use
  canvas.repeatableArea = {
    width: instanceWidth,
    height: instanceHeight,
    x: Math.round((containerWidth - instanceWidth) / 2),
    y: Math.round((containerHeight - instanceHeight) / 2),
  };

  drawCanvas();
  updatePreview();
}

function drawCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const { width, height, x, y } = canvas.repeatableArea;

  // Calculate how many instances we need to draw in each direction
  const instancesX = Math.ceil(canvas.width / width) + 2;
  const instancesY = Math.ceil(canvas.height / height) + 2;

  // Calculate the offset to start drawing instances
  const startX = x - Math.floor(instancesX / 2) * width;
  const startY = y - Math.floor(instancesY / 2) * height;

  // Draw instances
  for (let iy = 0; iy < instancesY; iy++) {
    for (let ix = 0; ix < instancesX; ix++) {
      const drawX = startX + ix * width;
      const drawY = startY + iy * height;
      drawInstance(drawX, drawY);
    }
  }

  // Draw the 2px black border around the central tile
  ctx.strokeStyle = "red";
  ctx.lineWidth = 0.5;
  ctx.strokeRect(x, y, width, height);
}

function drawInstance(startX, startY) {
  for (let py = 0; py < canvasSize.height; py++) {
    for (let px = 0; px < canvasSize.width; px++) {
      const pixelX = startX + px * pixelSize;
      const pixelY = startY + py * pixelSize;

      // Only draw pixels that are within the canvas bounds
      if (
        pixelX + pixelSize > 0 &&
        pixelX < canvas.width &&
        pixelY + pixelSize > 0 &&
        pixelY < canvas.height
      ) {
        if (previewData && previewData[py] && previewData[py][px]) {
          ctx.fillStyle = pixelData[py][px]
            ? "rgba(255, 255, 255, 0.7)"
            : "rgba(0, 0, 0, 0.7)";
        } else {
          ctx.fillStyle = pixelData[py][px] ? "#000000" : "#ffffff";
        }
        ctx.fillRect(pixelX, pixelY, pixelSize, pixelSize);

        ctx.strokeStyle = "#cccccc";
        ctx.strokeRect(pixelX, pixelY, pixelSize, pixelSize);
      }
    }
  }
}

function drawPixel(x, y) {
  ctx.fillStyle = pixelData[y][x] ? "#000000" : "#ffffff";
  ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);

  if (previewData[y][x]) {
    ctx.fillStyle = pixelData[y][x]
      ? "rgba(255, 255, 255, 0.7)"
      : "rgba(0, 0, 0, 0.7)";
    ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
  }

  ctx.strokeStyle = "#cccccc";
  ctx.strokeRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
}
