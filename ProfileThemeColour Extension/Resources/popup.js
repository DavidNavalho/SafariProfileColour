// popup.js

document.addEventListener('DOMContentLoaded', () => {
  const colorOptions = document.getElementById("colorOptions");
  const lightPreview = document.getElementById("lightPreview");
  const darkPreview = document.getElementById("darkPreview");
  const resetBtn = document.getElementById("resetBtn");
  const feedback = document.getElementById("feedback");

  let selectedColorName = null;

  // Function to create color buttons
  function createColorButtons() {
    for (const colorName in colorPalette) {
      const btn = document.createElement("button");
      btn.className = "color-button";
      btn.setAttribute("data-color-name", colorName);
      btn.style.backgroundColor = colorPalette[colorName].light; // Use light variant for button color
      btn.title = colorName;
      btn.addEventListener("click", () => {
        // Deselect all buttons
        document.querySelectorAll('.color-button').forEach(button => button.classList.remove('selected'));
        // Select the clicked button
        btn.classList.add('selected');
        // Set the selected color name
        selectedColorName = colorName;
        // Update previews
        updatePreviews(colorName);
        // Apply the color immediately
        applyColorSelection(colorName);
      });
      colorOptions.appendChild(btn);
    }
  }

  // Function to update preview boxes
  function updatePreviews(colorName) {
    if (!colorName || !colorPalette[colorName]) return;
    const lightColor = colorPalette[colorName].light;
    const darkColor = colorPalette[colorName].dark;

    lightPreview.style.backgroundColor = lightColor;
    darkPreview.style.backgroundColor = darkColor;

    // Display the hex codes
    lightPreview.textContent = lightColor;
    darkPreview.textContent = darkColor;
  }

  // Function to apply the selected color
  function applyColorSelection(colorName) {
    if (!colorName || !colorPalette[colorName]) return;

    chrome.storage.local.set({
      selectedColorName: colorName
    }, () => {
      // Show feedback to the user
      feedback.style.display = "block";
      feedback.textContent = "Color applied successfully!";
      setTimeout(() => {
        feedback.style.display = "none";
        feedback.textContent = "";
      }, 2000);

      // Notify background script to update all open tabs
      chrome.runtime.sendMessage({
        type: "UPDATE_THEME_COLOR",
        colorName: colorName,
        colors: colorPalette[colorName]
      });
    });
  }

  // Function to load previously selected color
  function loadSelectedColor() {
    chrome.storage.local.get(["selectedColorName"], (result) => {
      if (result.selectedColorName && colorPalette[result.selectedColorName]) {
        selectedColorName = result.selectedColorName;
        // Highlight the selected button
        const btn = document.querySelector(`.color-button[data-color-name="${selectedColorName}"]`);
        if (btn) {
          btn.classList.add('selected');
          updatePreviews(selectedColorName);
        }
      } else {
        // Optionally, set a default color
        const defaultColorName = "Red";
        selectedColorName = defaultColorName;
        const btn = document.querySelector(`.color-button[data-color-name="${defaultColorName}"]`);
        if (btn) {
          btn.classList.add('selected');
          updatePreviews(defaultColorName);
          // Apply default color immediately
          applyColorSelection(defaultColorName);
        }
      }
    });
  }

  // Reset to default color
  resetBtn.addEventListener("click", () => {
    const confirmation = confirm("Are you sure you want to reset to the default color?");
    if (!confirmation) return;

    const defaultColorName = "Red"; // Define your default color name here
    const defaultColors = colorPalette[defaultColorName];

    if (!defaultColors) {
      alert("Default color not found.");
      return;
    }

    chrome.storage.local.set({
      selectedColorName: defaultColorName
    }, () => {
      // Deselect all buttons and select the default
      document.querySelectorAll('.color-button').forEach(button => button.classList.remove('selected'));
      const defaultBtn = document.querySelector(`.color-button[data-color-name="${defaultColorName}"]`);
      if (defaultBtn) {
        defaultBtn.classList.add('selected');
      }

      // Update previews
      updatePreviews(defaultColorName);

      // Show feedback
      feedback.style.display = "block";
      feedback.textContent = "Colors reset to default!";
      setTimeout(() => {
        feedback.style.display = "none";
        feedback.textContent = "";
      }, 3000);

      // Notify background script to update all open tabs
      chrome.runtime.sendMessage({
        type: "UPDATE_THEME_COLOR",
        colorName: defaultColorName,
        colors: defaultColors
      });
    });
  });

  // Initialize the popup
  createColorButtons();
  loadSelectedColor();
});
