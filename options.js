document.getElementById('saveButton').addEventListener('click', function () {
  let config = {
    websiteUrl: document.getElementById('websiteUrl').value,
    times: [document.getElementById('time1').value, document.getElementById('time2').value],
    messages: [
      document.getElementById('message1').value,
      document.getElementById('message2').value,
      document.getElementById('message3').value,
    ],
    colors: [
      document.getElementById('color1').value,
      document.getElementById('color2').value,
      document.getElementById('color3').value,
    ],
  };

  chrome.storage.sync.set({config: config}, function () {
    alert('Configuration saved!');
  });
});

// On page load, populate form fields with saved values
chrome.storage.sync.get(['config'], function (result) {
  if (result.config) {
    document.getElementById('websiteUrl').value = result.config.websiteUrl;
    document.getElementById('time1').value = result.config.times[0];
    document.getElementById('time2').value = result.config.times[1];
    document.getElementById('message1').value = result.config.messages[0];
    document.getElementById('message2').value = result.config.messages[1];
    document.getElementById('message3').value = result.config.messages[2];
    document.getElementById('color1').value = result.config.colors[0];
    document.getElementById('color2').value = result.config.colors[1];
    document.getElementById('color3').value = result.config.colors[2];
  }
});
