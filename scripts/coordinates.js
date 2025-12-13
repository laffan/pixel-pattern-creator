// ============================================
// COORDINATES - Pixel coordinate calculations
// ============================================

function getPixelCoords(e) {
  const rect = canvas.getBoundingClientRect();
  const { width, height, x: areaX, y: areaY } = canvas.repeatableArea;

  const mouseX = e.clientX - rect.left - areaX;
  const mouseY = e.clientY - rect.top - areaY;

  // Calculate the position relative to the central tile
  const relativeX = (mouseX + width) % width;
  const relativeY = (mouseY + height) % height;

  // Convert to pixel coordinates
  const pixelX = Math.floor(relativeX / pixelSize);
  const pixelY = Math.floor(relativeY / pixelSize);

  return { x: pixelX, y: pixelY };
}
