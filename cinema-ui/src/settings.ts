const setting: DefaultSettings = {
  /**
   * page title
   */
  title: import.meta.env.VITE_APP_TITLE,

  theme: '#409EFF',

  /**
   * Sidebar theme dark theme theme-dark, light theme theme-light
   */
  sideTheme: 'theme-dark',
  /**
   * Whether the system layout configuration
   */
  showSettings: false,

  /**
   * Whether to display the top navigation
   */
  topNav: false,

  /**
   * Whether to display tagsView
   */
  tagsView: true,

  /**
   * Whether to fix the head
   */
  fixedHeader: true,

  /**
   * Whether to display the logo
   */
  sidebarLogo: false,

  /**
   * Whether to display dynamic title
   */
  dynamicTitle: true,

  /**
   * @type {string | array} 'production' | ['production', 'development']
   * @description Need show err logs component.
   * The default is only used in the production env
   * If you want to also use it in dev, you can pass ['production', 'development']
   */
  errorLog: 'production',

  animationEnable: false,

  dark: false
};
export default setting;
