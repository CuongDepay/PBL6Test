import AutoImport from 'unplugin-auto-import/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import IconsResolver from 'unplugin-icons/resolver';

export default (path: any) => {
  return AutoImport({
    // Automatically import Vue related functions
    imports: ['vue', 'vue-router', '@vueuse/core', 'pinia'],
    eslintrc: {
      enabled: false,
      filepath: './.eslintrc-auto-import.json',
      globalsPropValue: true
    },
    resolvers: [
      // Automatically import Element Plus related functions ElMessage, ElMessageBox... (with styles)
      ElementPlusResolver(),
      IconsResolver({
        prefix: 'Icon'
      })
    ],
    vueTemplate: true, // Whether to automatically import in the vue template
    dts: path.resolve(path.resolve(__dirname, '../../src'), 'types', 'auto-imports.d.ts')
  });
};
