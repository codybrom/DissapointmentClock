chrome.storage.sync.get(['config'], function (result) {
  const config = result.config;

  if (window.location.href.includes(config.websiteUrl)) {
    // Create main container
    const header = document.createElement('div');
    header.className = 'disappointment-header';
    header.style.backgroundColor = config.colors[0];
    header.style.color = isColorDark(config.colors[0]) ? 'white' : 'black';

    // Create message display
    const messageSpan = document.createElement('span');
    messageSpan.className = 'message-text';
    messageSpan.textContent = config.messages[0] || "Don't get lost here.";
    header.appendChild(messageSpan);

    // Create timer display
    const timerSpan = document.createElement('span');
    timerSpan.id = 'timer';
    timerSpan.textContent = '00:00';
    header.appendChild(timerSpan);

    // Create button container
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'button-container';

    // Create pause button
    const pauseButton = document.createElement('button');
    pauseButton.textContent = 'Pause';
    pauseButton.className = 'pause-restart-button';
    buttonContainer.appendChild(pauseButton);

    // Create restart button
    const restartButton = document.createElement('button');
    restartButton.textContent = 'Restart';
    restartButton.className = 'pause-restart-button';
    buttonContainer.appendChild(restartButton);

    header.appendChild(buttonContainer);

    // Add close button
    const closeButton = document.createElement('button');
    closeButton.className = 'close-button';
    closeButton.innerHTML = '&times;';
    header.appendChild(closeButton);

    // Add progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    header.appendChild(progressBar);

    // Append the timer to the body
    document.body.appendChild(header);

    // Make the timer draggable
    makeDraggable(header);

    // Initialize state
    let secondsPassed = 0;
    let isPaused = false;
    let lastElapsedMinutes = 0;
    let currentStage = 0;

    // Set maximum time for progress bar calculation
    const maxTimeInSeconds = config.times[config.times.length - 1] * 60;

    // Start timer interval
    const interval = setInterval(function () {
      if (isPaused) return;

      secondsPassed++;
      updateDisplay(secondsPassed);

      // Update progress bar
      const progress = Math.min((secondsPassed / maxTimeInSeconds) * 100, 100);
      progressBar.style.width = `${progress}%`;
    }, 1000);

    // Button event listeners
    pauseButton.addEventListener('click', function () {
      isPaused = !isPaused;
      pauseButton.textContent = isPaused ? 'Resume' : 'Pause';
      header.style.opacity = isPaused ? '0.75' : '1';
    });

    restartButton.addEventListener('click', function () {
      secondsPassed = 0;
      isPaused = false;
      pauseButton.textContent = 'Pause';
      header.style.opacity = '1';
      updateDisplay(secondsPassed);
      progressBar.style.width = '0%';
    });

    closeButton.addEventListener('click', function () {
      header.style.opacity = '0';
      header.style.transform = 'translateY(20px)';
      setTimeout(() => {
        header.remove();
        clearInterval(interval);
      }, 300);
    });

    // Update the display based on elapsed time
    function updateDisplay(elapsedTime) {
      const minutes = Math.floor(elapsedTime / 60);
      const seconds = elapsedTime % 60;

      // Format the timer display
      timerSpan.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
        2,
        '0'
      )}`;

      // Check if we should update the stage
      let newStage = config.times.length; // Default to the final stage

      for (let i = 0; i < config.times.length; i++) {
        if (elapsedTime < config.times[i] * 60) {
          newStage = i;
          break;
        }
      }

      // Only update if the stage has changed
      if (newStage !== currentStage) {
        currentStage = newStage;

        // Get the appropriate message and color
        const message =
          config.messages[Math.min(currentStage, config.messages.length - 1)] ||
          ["Don't get lost here.", 'Hey! Wrap it up!', "I'm disappointed in you..."][
            Math.min(currentStage, 2)
          ];

        const color =
          config.colors[Math.min(currentStage, config.colors.length - 1)] ||
          ['#D3D3D3', '#FFA500', '#FF0000'][Math.min(currentStage, 2)];

        // Update the display
        messageSpan.textContent = message;
        header.style.backgroundColor = color;

        // Ensure good text contrast
        const isDark = isColorDark(color);
        header.style.color = isDark ? 'white' : 'black';

        // Also update button styles for better contrast
        const buttons = header.querySelectorAll('button');
        buttons.forEach(button => {
          button.style.color = isDark ? 'white' : 'black';
        });

        // Add pulse animation
        header.classList.add('pulse');
        setTimeout(() => header.classList.remove('pulse'), 1000);
      }

      // If the minute count has changed, update the display
      if (Math.floor(elapsedTime / 60) !== lastElapsedMinutes) {
        lastElapsedMinutes = Math.floor(elapsedTime / 60);
      }
    }
  }
});

// Helper function to determine if a color is dark
function isColorDark(hex) {
  if (!hex || typeof hex !== 'string' || !hex.startsWith('#') || hex.length !== 7) {
    return false; // Default to assuming light color for invalid inputs
  }

  try {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
    return luminance < 0.5;
  } catch (e) {
    console.error('Error calculating color darkness:', e);
    return false;
  }
}

// Function to make an element draggable with precise 1:1 movement
function makeDraggable(element) {
  // Initialize variables for tracking movement
  let offsetX = 0;
  let offsetY = 0;
  let isDragging = false;

  // Ensure the element has the right positioning
  element.style.position = 'fixed';

  // Add a visual handle to the top of the timer
  const handle = document.createElement('div');
  handle.className = 'drag-handle';
  handle.style.position = 'absolute';
  handle.style.top = '0';
  handle.style.left = '0';
  handle.style.width = '100%';
  handle.style.height = '28px';
  handle.style.cursor = 'move';
  handle.style.borderRadius = '10px 10px 0 0';

  // Insert handle as the first child
  element.insertBefore(handle, element.firstChild);

  // Setup the mousedown event on the handle
  handle.addEventListener('mousedown', function (e) {
    e.preventDefault();

    // Get the current position of the element relative to the cursor
    const rect = element.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    // Start dragging
    isDragging = true;

    // Add visual indication
    handle.style.backgroundColor = 'rgba(128, 128, 128, 0.1)';

    // Add the document-level event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  });

  // Handle mouse movement during drag
  function handleMouseMove(e) {
    if (!isDragging) return;

    // Direct 1:1 positioning - the element follows the cursor exactly
    element.style.left = e.clientX - offsetX + 'px';
    element.style.top = e.clientY - offsetY + 'px';

    // Ensure we're not using right/bottom positioning
    element.style.right = 'auto';
    element.style.bottom = 'auto';
  }

  // Handle mouse release
  function handleMouseUp() {
    if (!isDragging) return;

    // End dragging
    isDragging = false;

    // Remove visual indication
    handle.style.backgroundColor = 'transparent';

    // Remove the document-level event listeners
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);

    // Keep within bounds of the window
    const rect = element.getBoundingClientRect();

    // Check and adjust horizontal position if needed
    if (rect.left < 10) {
      element.style.left = '10px';
    } else if (rect.right > window.innerWidth - 10) {
      element.style.left = window.innerWidth - rect.width - 10 + 'px';
    }

    // Check and adjust vertical position if needed
    if (rect.top < 10) {
      element.style.top = '10px';
    } else if (rect.bottom > window.innerHeight - 10) {
      element.style.top = window.innerHeight - rect.height - 10 + 'px';
    }
  }

  // Add styles for the drag handle to highlight on hover
  const style = document.createElement('style');
  style.textContent = `
    .drag-handle:hover {
      background-color: rgba(128, 128, 128, 0.1);
    }
  `;
  document.head.appendChild(style);
}
