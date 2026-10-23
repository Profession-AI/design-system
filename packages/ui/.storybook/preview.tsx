import type { Preview } from "@storybook/react-vite";
import { RegisterRoot } from "../src/lib/Register";
import "./storybook.css";

const preview: Preview = {
  parameters: { layout: "padded", a11y: { config: { rules: [{ id: "color-contrast", enabled: true }] } } },
  globalTypes: {
    density: { description: "Densità", defaultValue: "comfortable", toolbar: { icon: "grid", items: ["comfortable", "compact"] } },
    theme: { description: "Tema", defaultValue: "light", toolbar: { icon: "circlehollow", items: ["light", "dark"] } },
  },
  decorators: [
    (Story, ctx) => (
      <RegisterRoot register="operational" density={ctx.globals.density} dark={ctx.globals.theme === "dark"} className="p-6">
        <Story />
      </RegisterRoot>
    ),
  ],
};
export default preview;
