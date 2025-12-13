// ============================================
// STATE - Global state variables
// ============================================

let canvas, ctx, previewCanvas, previewCtx;
let pixelSize = 40;
let zoomMin = 2;
let zoomMax = 20;
let zoomStart = 4;
let zoomLevel = zoomStart;
let previewColors = {
  black: "#A2A2A2",
  white: "#D8D8D8",
};
let editorZoomLevel = 1;

let pixelData = [];
let previewData = [];
let canvasSize = { width: 20, height: 20 };
let canvasMax = 50;

let isDrawing = false;
let isDragging = false;
let startPixel = null;
let currentPixel = null;
let dragStartColor = null;

let holdTimer;
const holdDuration = 1000; // 1 second hold time
let isHoldingForLine = false;
