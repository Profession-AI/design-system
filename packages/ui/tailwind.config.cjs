// Esempio di config per un'app consumer del DS. Copiare in ogni nuova app.
const { heroui } = require("@heroui/react");
const preset = require("../../tokens/dist/tailwind.preset.cjs");
const theme = require("../../tokens/dist/heroui.theme.cjs");
module.exports = {
  presets: [preset],
  content: ["./src/**/*.{ts,tsx}", "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}", "../../packages/ui/src/**/*.{ts,tsx}"],
  darkMode: "class",
  plugins: [heroui(theme)],
};
