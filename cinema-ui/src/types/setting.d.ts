declare type DefaultSettings = {
  /**
   * page title
   */
  title?: string;

  /**
   * Sidebar theme theme-dark | theme-light
   */
  sideTheme?: string;

  /**
   * Whether to display system layout settings
   */
  showSettings?: boolean;

  /**
   * Whether to display the top navigation
   */
  topNav?: boolean;

  /**
   * Whether to display multi-tab navigation
   */
  tagsView?: boolean;
  /**
   * Whether to fix the head
   */
  fixedHeader?: boolean;
  /**
   * Whether to display the sidebar Logo
   */
  sidebarLogo?: boolean;
  /**
   * Navigation Bar Layout
   */
  layout?: string;
  /**
   * theme mode
   */
  theme?: string;

  /**
   * layout size
   */
  size?: string;

  /**
   * language
   */
  language?: string;

  /**
   * Whether to display dynamic title
   */
  dynamicTitle?: boolean;
  /**
   * Whether to enable animation effects
   */
  animationEnable?: boolean;
  /**
   * Whether to enable dark mode
   *
   * true: dark mode
   * false: bright mode
   */
  dark?: boolean;

  errorLog?: string;
};
