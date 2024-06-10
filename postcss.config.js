import { defineConfig } from 'vite';
import postcssNested from 'postcss-nested';
import postCSSpresentenv from 'postcss-preset-env';
export default defineConfig({
  css: {
    postcss: {
      plugins: [
        postcssNested(), // Call as a function
        postCSSpresentenv({
          /* use stage 3 features + css nesting rules */
          stage: 3,
          features: {
            'nesting-rules': true,
          },
        }), // Call as a function
      ],
    },
  },
});
