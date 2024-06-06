import {createApp} from "vue";
import App from "./App.vue";
import "./assets/css/tailwindcss.css";
import 'virtual:svg-icons-register';

import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/dark/css-vars.css';


import mitt from 'mitt'

import installGlobalComponent from '@/components';

import router from '@/router';
import {installPinia} from "@/store";

import ElementPlus from 'element-plus';
import zhCn from "element-plus/es/locale/lang/zh-cn";

const app = createApp(App);
app.use(router);

app.use(ElementPlus, {size: 'small', locale: zhCn});
app.config.globalProperties.$bus = mitt();
installPinia(app);
installGlobalComponent(app);

app.mount("#app");
