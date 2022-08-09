import { createApp } from 'vue';
import { createPinia } from "pinia";
import router from "./router"
import App from './App.vue'
import piniaPersist from "pinia-plugin-persist";
import ElementPlus from "element-plus";
import 'normalize.css/normalize.css';
import 'element-plus/dist/index.css';

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPersist);
app.use(router);
app.use(pinia);
app.use(ElementPlus);
app.mount('#app');
