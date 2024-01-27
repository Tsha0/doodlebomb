document.getElementById('startButton').addEventListener('click', redirectToGamePage);

function redirectToGamePage() {
    window.location.href = "prompt.html";
}


function updateCountdown() {
  const now = new Date();
  let target = new Date();

  // Set target to today's date at 12:00 PM
  target.setHours(12, 0, 0, 0);

  // If it's past 12:00 PM, set target to 12:00 PM the next day
  if (now >= target) {
      target.setDate(target.getDate() + 1);
  }

  // Calculate the difference in milliseconds
  const diff = target - now;

  // Convert the difference to hours, minutes, seconds
  let hours = Math.floor(diff / 1000 / 60 / 60);
  let minutes = Math.floor(diff / 1000 / 60) % 60;
  let seconds = Math.floor(diff / 1000) % 60;

  hours = hours.toString().padStart(2, '0');
  minutes = minutes.toString().padStart(2, '0');
  seconds = seconds.toString().padStart(2, '0');

  // Update the HTML
  document.getElementById('hours').textContent = hours;
  document.getElementById('minutes').textContent = minutes;
  document.getElementById('seconds').textContent = seconds;
}

// Update the countdown every second
setInterval(updateCountdown, 1000);

// Initialize the countdown
updateCountdown();
