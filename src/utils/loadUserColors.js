// src/utils/loadUserColors.js

/**
 * Converts an unlocked color array to a linear gradient string
 * @param {string[]} unlockedColors - array of color names in order [red, blue, yellow, orange, green, purple, indigo]
 * @returns {string} CSS linear-gradient string with 7 segments
 */
export const generateColorGradient = (unlockedColors) => {
  const allColors = [
    "#eeeeee", // default gray for red
    "#dddddd", // blue
    "#cccccc", // yellow
    "#bbbbbb", // orange
    "#aaaaaa", // green
    "#999999", // purple
    "#888888"  // indigo
  ];

  const colorMap = {
    red: "#ff4d4d",
    blue: "#4d88ff",
    yellow: "#ffe24d",
    orange: "#ff944d",
    green: "#4dff88",
    purple: "#b84dff",
    indigo: "#4d4dff"
  };

  unlockedColors.forEach((colorName, index) => {
    const slot = ["red", "blue", "yellow", "orange", "green", "purple", "indigo"].indexOf(colorName);
    if (slot !== -1) {
      allColors[slot] = colorMap[colorName];
    }
  });

  // Build gradient stops based on 7 colors (each about 14.28% of height)
  const stops = allColors.map((color, i) => {
    const start = (i * 14.28).toFixed(2);
    const end = ((i + 1) * 14.28).toFixed(2);
    return `${color} ${start}%, ${color} ${end}%`;
  });

  return `linear-gradient(to bottom, ${stops.join(", ")})`;
};
