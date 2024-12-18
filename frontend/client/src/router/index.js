import { createWebHistory, createRouter } from "vue-router";

import Homepage from "@/views/Homepage.vue";
const routes = [
  {
    path: "/",
    name: "homepage",
    component: Homepage,
  },

  {
    path: "/cart",
    name: "cart",
    component: () => import("@/views/cart/Cart.vue"),
  },

  {
    path: "/help",
    name: "help",
    component: () => import("@/views/help/Help.vue"),
  },

  {
    path: "/product/",
    name: "product",
    component: () => import("@/views/product/Product.vue"),
    props: true,
  },

  {
    path: "/product/",
    name: "product",
    component: () => import("@/views/product/Product.vue"),
    props: true,
  },

  {
    path: "/sale/",
    name: "sale",
    component: () => import("@/views/product/Product_Sale.vue"),
    props: true,
  },

  {
    path: "/search/",
    name: "search",
    component: () => import("@/views/search/Search.vue"),
    props: true,
  },

  {
    path: "/privacyPolicy/",
    name: "privacyPolicy",
    component: () => import("@/views/footer/Privacy_Policy.vue"),
    props: true,
  },
  {
    path: "/question/",
    name: "question",
    component: () => import("@/views/footer/Question.vue"),
    props: true,
  },

  {
    path: "/payment",
    name: "payment",
    component: () => import("@/views/payment/Payment.vue"),
  },

  {
    path: "/product/detail/:id",
    name: "product/detail",
    component: () => import("@/views/product/Product_Detail.vue"),
    props: true,
  },

  {
    path: "/favorite",
    name: "favorite",
    component: () => import("@/views/favorite/Favorite.vue"),
  },

  {
    path: "/account",
    name: "account",
    component: () => import("@/views/account/Account.vue"),
  },

  {
    path: "/brand_collection/:id",
    name: "brand_collection",
    component: () => import("@/views/collection/Brand_Collection.vue"),
  },

  {
    path: "/seasonal_collection/:id",
    name: "seasonal_collection",
    component: () => import("@/views/collection/Seasonal_Collection.vue"),
  },

  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: () => import("@/views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
