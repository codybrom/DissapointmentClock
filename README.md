README.md

# Disappointment Timer Chrome Extension

This Chrome extension adds a header with a countdown timer when you open a specific website. The
header displays messages and changes colors based on the elapsed time.

## Features

- Displays a header with a countdown timer when on a specific website
- Customizable messages and colors based on elapsed time
- Pause and restart functionality for the timer

## Build Instructions & Installation

To build the extension from source, follow these steps:

1. Make sure you have Node.js installed on your system.
2. Open a terminal and navigate to the project folder.
3. Run the following command to install the dependencies:

   ```shell
   npm install
   ```

4. Customize the extension by modifying the source files if needed.
5. Run the following command to build the extension:

   ```shell
   npm run build
   ```

6. The built extension will be available in the `dist` folder.
7. Open Google Chrome and go to `chrome://extensions`.
8. Enable Developer Mode by toggling the switch in the top right corner.
9. Click on "Load unpacked" and select the `dist` folder.
10. The extension should now be installed and active.

## Usage

1. Open the specific website configured in the extension.
2. The header with the countdown timer will be displayed.
3. The timer will automatically start counting.
4. Use the "Pause" button to pause the timer and "Resume" to continue.
5. Use the "Restart" button to reset the timer.
6. The messages and colors will change based on the elapsed time.

## Customization

To customize the extension, follow these steps:

1. Click on the extension icon in the Chrome toolbar.
2. Click on "Options" to open the options page.
3. Modify the desired fields:
   - `Domain`: Specify the Domain (ie. example.com - no https://) where the extension should
     activate.
   - `Times`: Specify the duration in minutes for each message/color change.
   - `Messages`: Customize the messages displayed based on elapsed time.
   - `Colors`: Customize the colors displayed based on elapsed time.
4. Click on the "Save" button to save the configuration.
