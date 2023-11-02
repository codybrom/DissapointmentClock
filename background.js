chrome.runtime.onInstalled.addListener(function (details) {
  if (details.reason === 'install') {
    const defaultConfig = {
      websiteUrl: 'threads.net',
      times: [2, 3],
      messages: ["Don't get lost here.", 'Hey! Wrap it up!', "I'm disappointed in you..."],
      colors: ['#D3D3D3', '#FFA500', '#FF0000'],
    };
    chrome.storage.sync.set({config: defaultConfig});
  }
});
