/** true fuori dalla build di produzione (Vite/Next/Storybook). */
export const isDev: boolean = (() => { try { return (globalThis as any).process?.env?.NODE_ENV !== "production"; } catch { return true; } })();
