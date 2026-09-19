import type { Preview } from "@storybook/react";
import { HeroUIProvider } from "@heroui/react";
import { RegisterRoot } from "../src/lib/Register";
import { PaiToastProvider } from "../src/components/Toast";
import "./tailwind.css";

const preview: Preview = {
  parameters: { layout: "padded", a11y: { config: { rules: [{ id: "color-contrast", enabled: true }] } } },
  globalTypes: {
    density: { description: "Densità", defaultValue: "comfortable", toolbar: { icon: "grid", items: ["comfortable", "compact"] } },
    theme: { description: "Tema", defaultValue: "light", toolbar: { icon: "circlehollow", items: ["light", "dark"] } },
  },
  decorators: [
    (Story, ctx) => (
      <HeroUIProvider locale="it-IT">
        <RegisterRoot register="operational" density={ctx.globals.density} dark={ctx.globals.theme === "dark"} className="p-6">
          <PaiToastProvider />
          <Story />
        </RegisterRoot>
      </HeroUIProvider>
    ),
  ],
};
export default preview;
