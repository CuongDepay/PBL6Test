import { createApp } from 'vue';
// global css
import 'uno.css';
import '@/assets/styles/index.scss';
import 'element-plus/theme-chalk/dark/css-vars.css';

// Import Bootstrap and BootstrapVue css files:
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import BootstrapVue3 from 'bootstrap-vue-3';

//Element-plus
import ElementPlus from 'element-plus';

import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';

loadFonts();

// App、router、store
import App from './App.vue';
import store from './store';
import router from './router';

// custom directive
import directive from './directive';

// Register plugin
import plugins from './plugins/index'; // plugins
import { download } from '@/utils/request';

// preset animation
import animate from './animate';

// svg icon
import 'virtual:svg-icons-register';
import ElementIcons from '@/plugins/svgicon';

// permission control
import './permission';

import { useDict } from '@/utils/dict';
import { getConfigKey, updateConfigByKey } from '@/api/system/config';
import { parseTime, addDateRange, handleTree, selectDictLabel, selectDictLabels, openLink } from '@/utils/starcinema';

// globalization
import i18n from '@/lang/index';

const app = createApp(App);
if (import.meta.env.VITE_CONSOLE_SILENT === true) {
  app.config.errorHandler = () => null;
  app.config.warnHandler = () => null;
}

// Global method mount
app.config.globalProperties.useDict = useDict;
app.config.globalProperties.getConfigKey = getConfigKey;
app.config.globalProperties.updateConfigByKey = updateConfigByKey;
app.config.globalProperties.download = download;
app.config.globalProperties.parseTime = parseTime;
app.config.globalProperties.openLink = openLink;
app.config.globalProperties.handleTree = handleTree;
app.config.globalProperties.addDateRange = addDateRange;
app.config.globalProperties.selectDictLabel = selectDictLabel;
app.config.globalProperties.selectDictLabels = selectDictLabels;
app.config.globalProperties.animate = animate;

app.use(ElementIcons);
app.use(router);
app.use(store);
app.use(i18n);
app.use(BootstrapVue3);
app.use(ElementPlus);
app.use(vuetify);
app.use(plugins);
// custom directive
directive(app);

setTimeout(() => {
  app.mount('#app');
}, 1000);
