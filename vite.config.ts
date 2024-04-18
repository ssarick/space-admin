import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import svgLoader from 'vite-svg-loader';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';
// import eslintPlugin from 'vite-plugin-eslint';

export default defineConfig({
  plugins: [
    vue(),
    svgLoader({ svgo: false }),
    AutoImport({
      imports: [
        'vue'
      ],
      dts: './src/shared/types/auto-imports.d.ts'
    }),
    Components({
      resolvers: [
        NaiveUiResolver()
      ],
      dts: './src/shared/types/components.d.ts'
    }),
    // eslintPlugin()
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/app/styles/_mixins.scss" as *;
          @use "@/app/styles/_variables.scss" as *;
          @use "@/app/styles/foundation/color.scss" as *;
          @use "@/app/styles/foundation/gradient.scss" as *;
          @use "@/app/styles/foundation/settings.scss" as *;
          @use "@/app/styles/foundation/typography.scss" as *;
          @use "@/app/styles/foundation/animation.scss" as *;
        `
      }
    }
  },
  server: {
    port: 3000
  },
  define: {
    __VUE_I18N_FULL_INSTALL__: true,
    __VUE_I18N_LEGACY_API__: false,
    __INTLIFY_PROD_DEVTOOLS__: false
  }
});
