import {createApp, createVNode} from 'vue'
import './style.css'
import App from './App.vue'
import router from "@/router/index.js";
import {createPinia} from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import '@/config/AxiosConfig.js';
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate);


const app = createApp(App);
app.use(router);
app.use(pinia);
app.mount('#app');
