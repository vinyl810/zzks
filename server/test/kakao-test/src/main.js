import { createApp } from "vue";
import App from "./App.vue";

createApp(App).mount("#app");

window.Kakao.init(process.env.VUE_APP_JS_KEY);
