# Disappointment Timer 
Floating countdown extension for Chrome and Chromium browsers with customizable messages and colors based on the elapsed time

![Screenshot](https://github.com/codybrom/disappointment-clock/assets/241370/67b0b959-33a4-4e3f-9418-525b7e6f1998)


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
2. The countdown timer will automatically start counting.
3. Use the Pause/Resume button to take a break, or the Restart button to start over.
5. The messages and colors will change based on the elapsed time.

## Customization

To customize the extension, follow these steps:

1. Left-click on the extension icon in your toolbar or right-click and select Options 
2. Modify the desired fields:
   - `Domain`: Specify the domain of the website (ie. example.com - no https://) where the extension should
     activate.
   - `Times`: Specify the duration in minutes (decimals okay) for each message/color change.
   - `Messages`: Customize the messages displayed based on elapsed time.
   - `Colors`: Customize the colors displayed based on elapsed time.
4. Click on the "Save" button to save the configuration.
