document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('configForm');
  const saveButton = document.getElementById('saveButton');
  const originalButtonContent = saveButton.innerHTML;

  // Load saved configuration
  loadSavedConfiguration();

  // Form submission handler
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    saveConfiguration();
  });

  // Input validation
  const time1Input = document.getElementById('time1');
  const time2Input = document.getElementById('time2');
  const websiteUrlInput = document.getElementById('websiteUrl');

  time1Input.addEventListener('change', validateTimeInputs);
  time2Input.addEventListener('change', validateTimeInputs);

  // Add validation for website URL
  websiteUrlInput.addEventListener('input', function () {
    // Clean up input - remove https://, http://, www. prefixes
    let value = websiteUrlInput.value.trim();
    if (value.match(/^(https?:\/\/)?(www\.)?/i)) {
      value = value.replace(/^(https?:\/\/)?(www\.)?/i, '');
      websiteUrlInput.value = value;
    }
  });

  // Validate color contrast
  const colorInputs = document.querySelectorAll('input[type="color"]');
  colorInputs.forEach(input => {
    input.addEventListener('change', function () {
      validateColorContrast(input);
    });
  });

  function validateTimeInputs() {
    const time1Value = parseFloat(time1Input.value);
    const time2Value = parseFloat(time2Input.value);

    if (time2Value <= time1Value) {
      time2Input.value = time1Value + 1;
    }

    // Ensure values are at least 1
    if (time1Value < 1) time1Input.value = 1;
    if (time2Value < 2) time2Input.value = 2;
  }

  function validateColorContrast(input) {
    const color = input.value;
    const isColorDark = checkIfColorIsDark(color);

    // Add a small indicator or tooltip if needed
    input.style.border = isColorDark
      ? '1px solid rgba(255,255,255,0.5)'
      : '1px solid rgba(0,0,0,0.3)';
  }

  function checkIfColorIsDark(hex) {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
    return luminance < 0.5;
  }

  function saveConfiguration() {
    // Extract values from form
    let websiteUrl = document.getElementById('websiteUrl').value.trim();

    // Use default value if empty
    if (!websiteUrl) {
      websiteUrl = 'threads.net';
    }

    // Clean up URL format - remove http://, https://, www. if present
    websiteUrl = websiteUrl.replace(/^(https?:\/\/)?(www\.)?/i, '');

    const config = {
      websiteUrl: websiteUrl,
      times: [
        parseFloat(document.getElementById('time1').value),
        parseFloat(document.getElementById('time2').value),
      ],
      messages: [
        document.getElementById('message1').value || "Don't get lost here.",
        document.getElementById('message2').value || 'Hey! Wrap it up!',
        document.getElementById('message3').value || "I'm disappointed in you...",
      ],
      colors: [
        document.getElementById('color1').value,
        document.getElementById('color2').value,
        document.getElementById('color3').value,
      ],
    };

    // Show saving indicator
    saveButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" class="spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M12 6v6l4 2"></path>
      </svg>
      Saving...
    `;

    // Save to Chrome storage
    chrome.storage.sync.set({config: config}, function () {
      // Update the input with the saved value
      document.getElementById('websiteUrl').value = websiteUrl;

      // Show success message
      saveButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
        </svg>
        Saved!
      `;

      // Reset button after delay
      setTimeout(function () {
        saveButton.innerHTML = originalButtonContent;
      }, 2000);
    });
  }

  function loadSavedConfiguration() {
    chrome.storage.sync.get(['config'], function (result) {
      if (result.config) {
        // Set values with fallbacks
        const config = result.config;
        document.getElementById('websiteUrl').value = config.websiteUrl || 'threads.net';
        document.getElementById('time1').value =
          config.times && config.times[0] ? config.times[0] : 2;
        document.getElementById('time2').value =
          config.times && config.times[1] ? config.times[1] : 3;
        document.getElementById('message1').value =
          config.messages && config.messages[0] ? config.messages[0] : "Don't get lost here.";
        document.getElementById('message2').value =
          config.messages && config.messages[1] ? config.messages[1] : 'Hey! Wrap it up!';
        document.getElementById('message3').value =
          config.messages && config.messages[2] ? config.messages[2] : "I'm disappointed in you...";
        document.getElementById('color1').value =
          config.colors && config.colors[0] ? config.colors[0] : '#D3D3D3';
        document.getElementById('color2').value =
          config.colors && config.colors[1] ? config.colors[1] : '#FFA500';
        document.getElementById('color3').value =
          config.colors && config.colors[2] ? config.colors[2] : '#FF0000';
      } else {
        // Set default values if no config exists
        document.getElementById('websiteUrl').value = 'threads.net';
        document.getElementById('time1').value = 2;
        document.getElementById('time2').value = 3;
        document.getElementById('message1').value = "Don't get lost here.";
        document.getElementById('message2').value = 'Hey! Wrap it up!';
        document.getElementById('message3').value = "I'm disappointed in you...";
        document.getElementById('color1').value = '#D3D3D3';
        document.getElementById('color2').value = '#FFA500';
        document.getElementById('color3').value = '#FF0000';
      }
    });
  }
});
