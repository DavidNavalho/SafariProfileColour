// background.js

chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed");
});

// Listen for changes in storage to update open tabs
chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === "local" && changes.selectedColorName) {
    const newColorName = changes.selectedColorName.newValue;
    console.log("Selected color changed to:", newColorName);

    // Retrieve the new color's hex codes from the color palette
    if (colorPalette[newColorName]) {
      const colors = colorPalette[newColorName];
      // Send a message to all tabs to update theme color
      chrome.tabs.query({}, (tabs) => {
        tabs.forEach((tab) => {
          if (tab.id) {
            chrome.tabs.sendMessage(tab.id, {
              type: "UPDATE_THEME_COLOR",
              colorName: newColorName,
              colors: colors
            }, () => {
              if (chrome.runtime.lastError) {
                console.error("Error sending message to tab:", tab.id, chrome.runtime.lastError);
              } else {
                console.log("Sent UPDATE_THEME_COLOR to tab:", tab.id);
              }
            });
          }
        });
      });
    } else {
      console.warn(`Color "${newColorName}" not found in colorPalette.`);
    }
  }
});
