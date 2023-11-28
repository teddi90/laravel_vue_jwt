
import './bootstrap';
import { createApp } from 'vue';
import router from "./router.js";



const app = createApp({});

import Index from './components/Index.vue';
app.component('index', Index);
app.use(router);


app.mount('#app');
