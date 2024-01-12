import UnoCss from 'unocss/vite';
import { presetUno, presetAttributify, presetIcons } from 'unocss';

export default () => {
  return UnoCss({
    presets: [presetUno(), presetAttributify(), presetIcons()],
    // rules: [['search', {}]],
    shortcuts: {
      'panel-title':
        'pb-[5px] font-sans leading-[1.1] font-medium text-base text-[#6379bb] border-b border-b-solid border-[var(--el-border-color-light)] mb-5 mt-0'
    },
    hmrTopLevelAwait: false // unocss is true by default, browsers with lower versions do not support it, and an error will be reported after startup
  });
};
