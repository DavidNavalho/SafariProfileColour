# ProfileThemeColour

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Caveats](#caveats)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Open the Project in Xcode](#open-the-project-in-xcode)
  - [Configure Signing](#configure-signing)
  - [Build and Run the Extension](#build-and-run-the-extension)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Troubleshooting](#troubleshooting)
- [Acknowledgments](#acknowledgments)

## Overview

**ProfileThemeColour** is a Safari browser extension designed to enhance your browsing experience by allowing you to customize the theme color of Safari's user interface based on your preferences. By injecting precise `<meta name="theme-color">` tags into web pages, the extension ensures that Safari's tab bar and other UI elements reflect your chosen colors seamlessly across different light and dark modes.

## Features

- **Color Customization:** Choose from a predefined palette of colors to personalize Safari's appearance.
- **Light and Dark Mode Support:** Automatically applies different color variants based on the system's color scheme.
- **Real-Time Updates:** Changes take effect immediately upon selection without the need to refresh the page.
- **Reset to Default:** Easily revert to the default theme color at any time.
- **Centralized Configuration:** Maintains a single source for color definitions, ensuring consistency across the extension.

## Caveats

While **ProfileThemeColour** offers extensive customization of Safari's theme colors, there are some important considerations and limitations to keep in mind:

1. **Brightness in Dark Mode:**
   
   - **Avoid Overly Bright Colors:** When selecting colors for dark mode, ensure that the light variant of the color is not too bright. Extremely bright colors may cause Safari to default to its standard dark grey theme instead of applying the chosen color.
   
   - **Color Contrast:** Maintain sufficient contrast between the background and text/icons to ensure readability and visual comfort.

   - You can use the following site to live-test what works and what doesn't: [https://roger.zone/theme-color-preview/](https://roger.zone/theme-color-preview/)

1. ** Tabs layout **

    - Safari can only apply colour if your Tab Layout is set to `Compact`. It doesn't work in the traditional `Separate` setting. In order to activate the compact Layout, open up Safari Settings, locate the `Tabs` section, and select the `Compact` Tab Layout. 


## Installation

Follow the steps below to run **ProfileThemeColour** locally on your machine.

### Prerequisites

Before you begin, ensure you have the following:

1. **Mac Computer:** The extension is developed using Xcode, which is only available on macOS.
2. **Xcode:** Download and install [Xcode](https://developer.apple.com/xcode/) from the Mac App Store.
3. **Apple Developer Account:** A free Apple ID is required to sign the extension for local development and testing.

### Open the Project in Xcode

1. **Launch Xcode:** Open Xcode from your Applications folder.

2. **Open the Project:**

   - In Xcode, go to `File > Open`.
   - Navigate to the cloned `ProfileThemeColour` directory.
   - Select `ProfileThemeColour.xcodeproj` and click `Open`.

### Configure Signing

To run the extension locally, you need to configure signing with your Apple ID.

1. **Add Your Apple ID to Xcode:**

   - In Xcode, go to `Xcode > Settings` (`Preferences`).
   - Navigate to the `Accounts` tab.
   - Click the `+` button and select `Apple ID`.
   - Enter your Apple ID credentials and sign in.

2. **Configure the Extension Target:**

   - In the Project Navigator (left sidebar), select the `ProfileThemeColour` project.
   - Choose the `ProfileThemeColour` target.
   - Navigate to the `Signing & Capabilities` tab.
   - Ensure that `Automatically manage signing` is checked.
   - Select your Apple ID from the `Team` dropdown menu.

### Build and Run the Extension

1. **Select the Extension Scheme:**

   - At the top of Xcode, ensure that the `ProfileThemeColour` scheme is selected.

2. **Build the Project:**

   - Go to `Product > Build` or press `Cmd + B`.
   - Ensure that the build succeeds without errors.

3. **Run the Extension in Safari:**

   - **Enable the Extension in Safari:**
     - Open Safari.
     - Navigate to `Safari > Settings… > Extensions`.
     - Locate `ProfileThemeColour` in the list and ensure it's enabled.

   - **Allow Unsigned Extensions (if necessary):**
     - Since you're running a development version, you might need to allow unsigned extensions.
     - In Safari, go to `Develop > Allow Unsigned Extensions`. *(Note: This option may vary based on Safari versions.)*

   - **Test the Extension:**
     - Visit any website.
     - Click on the `ProfileThemeColour` toolbar icon to open the popup.
     - Select a color and observe the changes in Safari's UI.

## Usage

Once installed, using **ProfileThemeColour** is straightforward:

1. **Open the Extension Popup:**
   - Click on the `ProfileThemeColour` icon in Safari's toolbar.

2. **Select a Color:**
   - Click on any of the available color buttons to choose your preferred theme color.
   - The change will apply immediately without needing to refresh the page.

3. **Preview Colors:**
   - The popup displays previews of how the selected color will look in both light and dark modes.

4. **Reset to Default:**
   - Click the `Reset to Default Color` button to revert Safari's theme color to its original setting.
   - A confirmation prompt ensures that resets are intentional.

## Changing Colours
You can change colours by editing the `ProfileThemeColour Extension/Resources/colors.js` file. You'll need to rebuild the extension after that.

## License

This project is licensed under the [MIT License](LICENSE).

## Troubleshooting

If you encounter issues where the selected color does not apply immediately or requires a page refresh, follow these steps:
- Check Console Logs:
  - Open Safari’s Web Inspector (Develop > Show Web Inspector).
  - Navigate to the Console tab to view logs from content-script.js.
  - Check Xcode’s Console for logs from background.js.
  - Look for any error messages or failed operations.
- Verify Script Loading Order:
  - Ensure that colors.js is included before other scripts in both manifest.json and popup.html.
- Ensure Proper Signing:
  - Double-check that your Apple ID is correctly configured in Xcode and that the extension is signed without issues.
- Reload the Extension:
  - After making changes, reload the extension in Safari by toggling it off and on in the Extensions settings.
- Test on Different Websites:
  - Some websites have strict Content Security Policies (CSP) that might prevent meta tag injections. Test the extension on multiple websites to identify any CSP-related issues.
- Update Safari and Xcode:
  - Ensure that both Safari and Xcode are updated to their latest versions to avoid compatibility issues.

If problems persist, consider opening an issue in the GitHub Issues section of the repository for further assistance.
