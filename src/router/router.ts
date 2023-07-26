import "vue-router";
import { createRouter, createWebHistory } from "vue-router";
import { nextTick } from "vue";

const routes = <any>[
  { path: "/", component: () => import("../views/Home.vue") },
  {
    path: "/public-services",
    component: () => import("../views/PublicServicesDirectory.vue"),
  },
  {
    path: "/about",
    component: () => import("../components/pages/AboutMunicipality.vue"),
  },
  {
    path: "/jobs",
    component: () => import("../components/pages/JobsPage.vue"),
  },
  {
    path: "/single-job/:id?",
    component: () => import("../components/pages/SingleJob.vue"),
  },
  {
    path: "/single-news/:id?",
    component: () => import("../components/home/SingleNews.vue"),
  },
  {
    path: "/mayor-speech",
    component: () => import("../components/pages/MayorSpeech.vue"),
  },
  {
    path: "/departments",
    component: () => import("../components/about/Departments.vue"),
  },
  {
    path: "/services",
    component: () => import("../components/pages/ServicesPage.vue"),
  },
  {
    path: "/media-albums",
    component: () => import("../components/pages/MediaAlbums.vue"),
  },
  {
    path: "/media-albums/album/:id?",
    component: () => import("../components/pages/SingleAlbum.vue"),
  },
  {
    path: "/projects/:slug?",
    component: () => import("../components/pages/Projects.vue"),
  },
  {
    path: "/project/:id?",
    component: () => import("../components/pages/Project.vue"),
  },
  {
    path: "/complaint",
    component: () => import("../components/pages/Complaint.vue"),
  },
  {
    path: "/profile",
    component: () => import("../components/profile/Profile.vue"),
  },
  {
    path: "/ad/:id?",
    component: () => import("../components/pages/SingleAd.vue"),
  },
  {
    path: "/members",
    component: () => import("../components/pages/Members.vue"),
  },
  {
    path: "/urban-planning-documents",
    component: () => import("../components/pages/UrbanPlanning.vue"),
  },
  {
    path: "/control",
    component: () => import("../components/pages/Control.vue"),
  },
  {
    path: "/services-directory",
    component: () => import("../components/pages/ServicesDirectory.vue"),
  },
  {
    path: "/organization-chart",
    component: () => import("../components/pages/OrganizationChart.vue"),
  },
  {
    path: "/all-news",
    component: () => import("../components/pages/AllNews.vue"),
  },
  {
    path: "/all-ads",
    component: () => import("../components/pages/AllAds.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (!router.isReady()) {
    await router.isReady();
  }
  await nextTick();
  next();
});

export default router;
