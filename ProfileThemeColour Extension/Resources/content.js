// content-script.js

(async () => {
  try {
    console.log("Content script loaded");

    // Retrieve selected color from storage
    const { selectedColorName } = await chrome.storage.local.get("selectedColorName");
    console.log("Retrieved selectedColorName:", selectedColorName);

    if (selectedColorName && colorPalette[selectedColorName]) {
      const lightColor = colorPalette[selectedColorName].light;
      const darkColor = colorPalette[selectedColorName].dark;

      console.log("Applying light color:", lightColor);
      console.log("Applying dark color:", darkColor);

      // Inject or update the theme-color meta tags for light and dark modes
      createOrUpdateMetaTag("theme-color", lightColor, "(prefers-color-scheme: light)");
      createOrUpdateMetaTag("theme-color", darkColor, "(prefers-color-scheme: dark)");
    }

  } catch (error) {
    console.error("Error in content script:", error);
  }
})();

// Listen for messages to update theme colors dynamically
chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "UPDATE_THEME_COLOR") {
    console.log("Received UPDATE_THEME_COLOR message:", message.colorName);
    const { colorName, colors } = message;
    if (!colorName || !colors) return;

    try {
      const { light, dark } = colors;

      // Inject or update the theme-color meta tags for light and dark modes
      createOrUpdateMetaTag("theme-color", light, "(prefers-color-scheme: light)");
      createOrUpdateMetaTag("theme-color", dark, "(prefers-color-scheme: dark)");

      console.log(`Theme color updated to: Light=${light}, Dark=${dark}`);

      // Re-insert the meta tags to trigger browser recognition
      reinsertMetaTag("theme-color", light, "(prefers-color-scheme: light)");
      reinsertMetaTag("theme-color", dark, "(prefers-color-scheme: dark)");

    } catch (error) {
      console.error("Error updating theme colors:", error);
    }
  }
});

// Function to create or update a meta tag
function createOrUpdateMetaTag(name, content, media) {
  let metaTag;
  if (media) {
    metaTag = document.querySelector(`meta[name="${name}"][media="${media}"]`);
  } else {
    metaTag = document.querySelector(`meta[name="${name}"]`);
  }

  if (!metaTag) {
    metaTag = document.createElement("meta");
    metaTag.setAttribute("name", name);
    if (media) {
      metaTag.setAttribute("media", media);
    }
    document.head.appendChild(metaTag);
    console.log(`<meta name="${name}" ${media ? `media="${media}"` : ""}> created`);
  } else {
    console.log(`<meta name="${name}" ${media ? `media="${media}"` : ""}> found`);
  }

  metaTag.setAttribute("content", content);
  console.log(`<meta name="${name}" ${media ? `media="${media}"` : ""}> updated to: ${content}`);
}

// Function to re-insert a meta tag to trigger browser recognition
function reinsertMetaTag(name, content, media) {
  let metaTag;
  if (media) {
    metaTag = document.querySelector(`meta[name="${name}"][media="${media}"]`);
  } else {
    metaTag = document.querySelector(`meta[name="${name}"]`);
  }

  if (metaTag) {
    // Remove and re-append the meta tag
    metaTag.parentNode.removeChild(metaTag);
    document.head.appendChild(metaTag);
    console.log(`<meta name="${name}" ${media ? `media="${media}"` : ""}> re-inserted`);
  }
}
