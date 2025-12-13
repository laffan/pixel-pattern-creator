// ============================================
// SIZE CONTROLS - Canvas size adjustment
// ============================================

function setupSizeControls() {
  const stepButtons = document.querySelectorAll(".step-btn");
  stepButtons.forEach((button) => {
    button.addEventListener("click", handleStepButtonClick);
  });
}

function handleStepButtonClick(e) {
  const input = document.getElementById(e.target.dataset.input);
  const action = e.target.dataset.action;
  const currentValue = parseInt(input.value);
  const step = parseInt(input.step);
  const min = parseInt(input.min);
  const max = parseInt(input.max);

  let newValue;
  if (action === "increment") {
    newValue = Math.min(currentValue + step, max);
  } else {
    newValue = Math.max(currentValue - step, min);
  }

  input.value = newValue;
  updateCanvasSize();
}

function updateCanvasSize() {
  const newWidth = parseInt(document.getElementById("canvasWidth").value);
  const newHeight = parseInt(document.getElementById("canvasHeight").value);

  if (
    newWidth >= 1 &&
    newWidth <= canvasMax &&
    newHeight >= 1 &&
    newHeight <= canvasMax
  ) {
    const blackPixels = getBlackPixels();
    const oldCenter = {
      x: Math.floor(canvasSize.width / 2),
      y: Math.floor(canvasSize.height / 2),
    };

    const relativePositions = blackPixels.map((pixel) => ({
      x: pixel.x - oldCenter.x,
      y: pixel.y - oldCenter.y,
    }));

    canvasSize.width = newWidth;
    canvasSize.height = newHeight;
    initializePixelData();

    const newCenter = {
      x: Math.floor(canvasSize.width / 2),
      y: Math.floor(canvasSize.height / 2),
    };

    relativePositions.forEach((relPos) => {
      const newX = newCenter.x + relPos.x;
      const newY = newCenter.y + relPos.y;
      if (
        newX >= 0 &&
        newX < canvasSize.width &&
        newY >= 0 &&
        newY < canvasSize.height
      ) {
        pixelData[newY][newX] = 1;
      }
    });

    resizeCanvas();
    drawCanvas();
    updatePreview();
  }
}

function getBlackPixels() {
  const blackPixels = [];
  for (let y = 0; y < canvasSize.height; y++) {
    for (let x = 0; x < canvasSize.width; x++) {
      if (pixelData[y][x] === 1) {
        blackPixels.push({ x, y });
      }
    }
  }
  return blackPixels;
}
