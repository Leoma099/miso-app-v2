import { createApp } from 'vue'

import App from './App.vue'

import { router } from "./router";
// import store from "./stores";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import 'boxicons/css/boxicons.min.css';

import '../src/assets/css/layout.css';

import axios from "axios";

const app = createApp(App)
    .use(router)
    // .use(store)

app.mount('#app');


const authToken = localStorage.getItem("authToken");
if (authToken) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;
}
