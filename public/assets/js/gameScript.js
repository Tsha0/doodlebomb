
// Get the canvas element and its context
const canvas = document.getElementById('drawingCanvas');
const context = canvas.getContext('2d');
canvas.width = 450;
canvas.height = 400;

// Set initial variables for drawing
let isDrawing = false;
let lastX = 0;
let lastY = 0;

// Function to get mouse coordinates relative to the canvas
function getMousePos(e) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  };
}
function updateMouseCoordinates(e) {
  const { x, y } = getMousePos(e);
  document.getElementById('mouseCoordinates').innerText = `Mouse Coordinates: (${x}, ${y})`;
}

// Function to start drawing
function startDrawing(e) {
  isDrawing = true;
  const { x, y } = getMousePos(e);
  [lastX, lastY] = [x, y];
}

// Function to draw on the canvas
function draw(e) {
  if (!isDrawing) return; // Stop the function if not drawing
  const { x, y } = getMousePos(e);

  context.lineCap = 'round';
  context.lineJoin = 'round';
  context.lineWidth = 5;
  context.strokeStyle = '#000'; // Set the color to black

  context.beginPath();
  context.moveTo(lastX, lastY);
  context.lineTo(x, y);
  context.stroke();
  // context.fillRect(0,0,100,100);

  [lastX, lastY] = [x, y];
}

// Function to stop drawing
function stopDrawing() {
  isDrawing = false;
}

// Event listeners to handle drawing
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', function(e){
  draw(e);
  updateMouseCoordinates(e);
});
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);


// Function to save the canvas as an image
function saveCanvas() {
  const image = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = image;
  link.download = 'drawing.png';
  link.click();
}


