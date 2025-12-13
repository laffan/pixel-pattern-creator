// ============================================
// FILE OPERATIONS - Upload and download
// ============================================

function triggerFileInput() {
  document.getElementById("fileInput").click();
}

function handleFileUpload(e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (event) {
      const img = new Image();
      img.onload = function () {
        if (img.width <= canvasMax && img.height <= canvasMax) {
          canvasSize.width = img.width;
          canvasSize.height = img.height;
          initializePixelData();

          const tempCanvas = document.createElement("canvas");
          tempCanvas.width = img.width;
          tempCanvas.height = img.height;
          const tempCtx = tempCanvas.getContext("2d");
          tempCtx.drawImage(img, 0, 0);

          for (let y = 0; y < canvasSize.height; y++) {
            for (let x = 0; x < canvasSize.width; x++) {
              const imageData = tempCtx.getImageData(x, y, 1, 1);
              pixelData[y][x] = imageData.data[0] < 128 ? 1 : 0;
            }
          }

          resizeCanvas();
          drawCanvas();
          updatePreview();
          document.getElementById("canvasWidth").value = canvasSize.width;
          document.getElementById("canvasHeight").value = canvasSize.height;
        } else {
          alert("Image dimensions must be canvasMaxxcanvasMax or smaller.");
        }
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  }
}

function downloadCanvas() {
  const downloadCanvas = document.createElement("canvas");
  downloadCanvas.width = canvasSize.width;
  downloadCanvas.height = canvasSize.height;
  const downloadCtx = downloadCanvas.getContext("2d");

  for (let y = 0; y < canvasSize.height; y++) {
    for (let x = 0; x < canvasSize.width; x++) {
      downloadCtx.fillStyle = pixelData[y][x] ? "#000000" : "#ffffff";
      downloadCtx.fillRect(x, y, 1, 1);
    }
  }

  const link = document.createElement("a");
  link.download = "pixel-brush.png";
  link.href = downloadCanvas.toDataURL();
  link.click();
}
