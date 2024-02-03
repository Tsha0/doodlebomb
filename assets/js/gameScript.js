// Get the canvas element and its context
const canvas = document.getElementById('drawingCanvas');
const context = canvas.getContext('2d');
canvas.width = 450;
canvas.height = 400;
let color1 = 'red';
let color2 = 'green';
let color3 = 'blue';

// Set initial variables for drawing
let isDrawing = false;
let lastX = 0;
let lastY = 0;

// Countdown variables
let countdown = 60;
let countdownInterval;

// Function to update the countdown display
function updateCountdownDisplay() {
  document.getElementById('countdown').innerText = `Countdown: ${countdown} seconds`;
}

// Function to start the countdown and disable drawing after completion
function startCountdown() {
  countdownInterval = setInterval(function () {
    countdown--;
    updateCountdownDisplay();

    if (countdown <= 0) {
      clearInterval(countdownInterval);
      stopDrawing();
      document.getElementById('countdown').innerText = "Countdown Finished";
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseup', stopDrawing);
      canvas.removeEventListener('mouseout', stopDrawing);
    }
  }, 1000);
}

// Function to get mouse coordinates relative to the canvas
function getMousePos(e) {
  const rect = canvas.getBoundingClientRect();
  let x, y;

  if (e.type === 'mousedown' || e.type === 'mousemove' || e.type === 'mouseup' || e.type === 'mouseout') {
    x = e.clientX - rect.left;
    y = e.clientY - rect.top;
  } else if (e.type === 'touchstart' || e.type === 'touchmove' || e.type === 'touchend') {
    const touch = e.touches[0] || e.changedTouches[0];
    x = touch.clientX - rect.left;
    y = touch.clientY - rect.top;
  }

  return { x, y };
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
  e.preventDefault();
  const { x, y } = getMousePos(e);

  context.lineCap = 'round';
  context.lineJoin = 'round';
  context.lineWidth = 5;

  context.beginPath();
  context.moveTo(lastX, lastY);
  context.lineTo(x, y);
  context.stroke();

  [lastX, lastY] = [x, y];
}

// Function to stop drawing
function stopDrawing() {
  isDrawing = false;
}
// shuffleColor
function changeToColor1(){
  context.strokeStyle = color1;
}
function changeToColor2(){
  context.strokeStyle = color2;
}
function changeToColor3(){
  context.strokeStyle = color3;
}
function getRandomColor() {
  let red = Math.floor(Math.random() * 256);
  let green = Math.floor(Math.random() * 256);
  let blue = Math.floor(Math.random() * 256);
  return `rgb(${red}, ${green}, ${blue})`;
}
function shuffleColor(){
  let colorButton1 = document.getElementById('color1');
  let colorButton2 = document.getElementById('color2');
  let colorButton3 = document.getElementById('color3');
  let c1 = getRandomColor();
  let c2 = getRandomColor();
  let c3 = getRandomColor();
  colorButton1.style.backgroundColor = c1;
  color1=c1;
  colorButton2.style.backgroundColor = c2;
  color2=c2;
  colorButton3.style.backgroundColor = c3;
  color3=c3;

}
function changeColor(color) {
  console.log(color);
  context.strokeStyle = String(color);
  // context.strokeStyle = "rgb(235, 84, 52)";
}

// Event listeners to handle drawing
// ... (previous code)

// Function to draw on the canvas
function draw(e) {
  if (!isDrawing) return; // Stop the function if not drawing
  e.preventDefault();
  const { x, y } = getMousePos(e);

  context.lineCap = 'round';
  context.lineJoin = 'round';
  context.lineWidth = 5;

  context.beginPath();
  context.moveTo(lastX, lastY);
  context.lineTo(x, y);
  context.stroke();

  [lastX, lastY] = [x, y];
}

// ... (previous code)

// Event listeners to handle drawing
function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints;
}

// Event listeners to handle drawing
canvas.addEventListener(isTouchDevice() ? 'touchstart' : 'mousedown', startDrawing);

canvas.addEventListener(isTouchDevice() ? 'touchmove' : 'mousemove', function (e) {
  e.preventDefault();
  draw(e);
  updateMouseCoordinates(e);
});

canvas.addEventListener(isTouchDevice() ? 'touchend' : 'mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);



// Start the countdown on page load
startCountdown();

// Function to save the canvas as an image
function saveCanvas() {
  const image = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = image;
  link.download = 'drawing.png';
  link.click();
}
