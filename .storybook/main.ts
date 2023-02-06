import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  stories: [
    "../components/**/*.stories.@(ts|tsx|mdx)",
    "../components/**/*.mdx"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "storybook-tailwind-dark-mode"
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {}
  },
  staticDirs: ['../public'],
  docs: {
    autodocs: "tag"
  }
};
export default config;
