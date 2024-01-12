import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
export default (path: any, isBuild: boolean) => {
  return createSvgIconsPlugin({
    // Specify the icon folder that needs to be cached
    iconDirs: [path.resolve(path.resolve(__dirname, '../../src'), 'assets/icons/svg')],
    // Specify the symbolId format
    symbolId: 'icon-[dir]-[name]',
    svgoOptions: isBuild
  });
};
