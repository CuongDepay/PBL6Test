declare module '*.vue' {
  import { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
declare module '*.avif' {
  const src: string;
  export default src;
}

declare module '*.bmp' {
  const src: string;
  export default src;
}

declare module '*.gif' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.webp' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  const src: string;
  export default src;
}

declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.sass' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
// environment variable
interface ImportMetaEnv {
  VITE_APP_TITLE: string;
  VITE_APP_PORT: number;
  VITE_APP_BASE_API: string;
  VITE_APP_BASE_URL: string;
  VITE_APP_CONTEXT_PATH: string;
  VITE_APP_MONITRO_ADMIN: string;
  VITE_APP_XXL_JOB_ADMIN: string;
  VITE_APP_GRAY_LOG_ADMIN: string;
  VITE_APP_ENV: string;
  VITE_SYSTEM_TYPE: string;
  VITE_API_ADMIN: string;
  VITE_API_CUSTOMER: string;
  VITE_API_SHIPPINGLINE: string;
  VITE_CONSOLE_SILENT: boolean;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
  // readonly glob: any;
}
