chrome.storage.sync.get(['config'], function (result) {
  const config = result.config;

  // Check if the current URL matches the specific website
  if (window.location.href.includes(config.websiteUrl)) {
    // Create the header and set its initial properties
    const header = document.createElement('div');
    header.className = 'disappointment-header';
    header.style.backgroundColor = config.colors[0];
    header.style.color = isColorDark(config.colors[0]) ? 'white' : 'black';

    const messageSpan = document.createElement('span');
    messageSpan.textContent = config.messages[0];
    header.appendChild(messageSpan);

    // Separate the timer from the message to place it on a new line
    const timerSpan = document.createElement('span');
    timerSpan.id = 'timer';
    timerSpan.textContent = '00:00';
    header.appendChild(timerSpan); // This will now be on its own line due to the updated CSS

    // Add buttons
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'button-container';

    const pauseButton = document.createElement('button');
    pauseButton.textContent = 'Pause';
    pauseButton.className = 'pause-restart-button';
    buttonContainer.appendChild(pauseButton);

    const restartButton = document.createElement('button');
    restartButton.textContent = 'Restart';
    restartButton.className = 'pause-restart-button';
    buttonContainer.appendChild(restartButton);

    header.appendChild(buttonContainer);

    // Append the header to the body
    document.body.appendChild(header);

    // Initialize the counter and start the countdown
    let secondsPassed = 0;
    let isPaused = false;

    const interval = setInterval(function () {
      if (isPaused) return;

      secondsPassed++;
      updateDisplay(secondsPassed);
    }, 1000);

    // Button functionalities
    pauseButton.addEventListener('click', function () {
      isPaused = !isPaused; // Toggle pause status
      pauseButton.textContent = isPaused ? 'Resume' : 'Pause';
    });

    restartButton.addEventListener('click', function () {
      secondsPassed = 0; // Reset timer
      isPaused = false; // Resume timer
      pauseButton.textContent = 'Pause';
      updateDisplay(secondsPassed);
    });

    // Update function to handle messages and styles
    function updateDisplay(elapsedTime) {
      const minutes = Math.floor(elapsedTime / 60);
      const seconds = elapsedTime % 60;

      // Find the appropriate message and color based on elapsed time
      let message = config.messages[config.messages.length - 1]; // default to the last message
      let colorClass = config.colors[config.colors.length - 1]; // default to the last color

      for (let i = 0; i < config.times.length; i++) {
        if (elapsedTime < config.times[i] * 60) {
          message = config.messages[i];
          colorClass = config.colors[i];
          header.style.color = isColorDark(colorClass) ? 'white' : 'black';
          break;
        }
      }

      messageSpan.textContent = message;
      header.style.backgroundColor = colorClass;

      timerSpan.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
        2,
        '0'
      )}`;
    }
  }
});

function isColorDark(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  // Calculate the luminance of the color
  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

  return luminance < 0.5;
}
