import { createApp } from "vue";
import "./style.css";
import "./tailwind.css";
import App from "./App.vue";
import { createPinia, PiniaVuePlugin } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
import { plugin, defaultConfig } from "@formkit/vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import router from "./router/router";
import api from "./components/composables/api";
import useFormattedDate from "./components/composables/formatDate";
import BaseSection from "./components/common/BaseSections.vue";
// import VueGoogleMaps from "@fawmi/vue-google-maps";

import {
  faUser,
  faHouse,
  faClover,
  faBriefcase,
  faPeopleGroup,
  faBuilding,
  faXmark,
  faPenToSquare,
  faArrowRightFromBracket,
  faFingerprint,
  faChevronDown,
  faHandHoldingHand,
  faLeaf,
  faList,
  faLocationDot,
  faPhone,
  faBox,
  faPerson,
  faImage,
  faVideo,
  faBars,
  faCamera,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add({
  faUser,
  faHouse,
  faClover,
  faBriefcase,
  faPeopleGroup,
  faBuilding,
  faXmark,
  faPenToSquare,
  faArrowRightFromBracket,
  faFingerprint,
  faChevronDown,
  faHandHoldingHand,
  faLeaf,
  faList,
  faLocationDot,
  faPhone,
  faBox,
  faPerson,
  faImage,
  faVideo,
  faBars,
  faCamera,
});
// components
import Grid from "./layouts/Grid.vue";
import BaseCard from "./components/ui/cards/BaseCard.vue";
import SocialMedia from "./components/common/SocialMedia.vue";
import Toast from "./components/ui/alerts/Toast.vue";

const app = createApp(App);
app.component("toast", Toast);
app.component("social-media", SocialMedia);
app.component("base-section", BaseSection);
app.component("base-card", BaseCard);
app.component("Grid", Grid);
app.component("font-awesome-icon", FontAwesomeIcon);
app.config.globalProperties.$api = api;
app.config.globalProperties.$useFormattedDate = useFormattedDate;
app.use(pinia);
app.use(router);
app.use(plugin, defaultConfig);
app.mount("#app");