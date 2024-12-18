import { createWebHistory, createRouter } from "vue-router";

import Homepage from "@/views/Homepage.vue";
const routes = [
  {
    path: "/",
    name: "login",
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/homepage",
    name: "homepage",
    component: Homepage,
  },

  {
    path: "/profile",
    name: "profile",
    component: () => import("@/views/Profile.vue"),
    props: false,
  },

  {
    path: "/help",
    name: "help",
    component: () => import("@/views/help/Help.vue"),
    props: false,
  },

  {
    path: "/discountCodes",
    name: "discountCodes",
    component: () => import("@/views/discountCode/Discount_Code.vue"),
    props: false,
  },

  {
    path: "/statistical",
    name: "statistical",
    component: () => import("@/views/statistical/Statistical.vue"),
    props: false,
  },

  {
    path: "/category/brand",
    name: "category_brand",
    component: () => import("@/views/category/Category_Brand.vue"),
    props: false,
  },

  {
    path: "/category/gender",
    name: "category_gender",
    component: () => import("@/views/category/Category_Gender.vue"),
    props: false,
  },

  {
    path: "/category/type",
    name: "category_type",
    component: () => import("@/views/category/Category_Type.vue"),
    props: false,
  },

  {
    path: "/category/size",
    name: "category_size",
    component: () => import("@/views/category/Category_Size.vue"),
    props: false,
  },

  {
    path: "/account/staff",
    name: "account_staff",
    component: () => import("@/views/account/Staff_Account.vue"),
    props: false,
  },

  {
    path: "/account/warehouse_staff",
    name: "account_warehouse_staff",
    component: () => import("@/views/account/WareHouse_Staff_Account.vue"),
    props: false,
  },

  {
    path: "/account/client",
    name: "account_client",
    component: () => import("@/views/account/Client_Account.vue"),
    props: false,
  },

  {
    path: "/category/type_detail",
    name: "type_detail",
    component: () => import("@/views/category/Category_Type_Detail.vue"),
    props: false,
  },

  {
    path: "/account/detail/:id",
    name: "account_detail",
    component: () => import("@/views/account/Account_Detail.vue"),
    props: true,
  },

  {
    path: "/product",
    name: "product",
    component: () => import("@/views/product/Product.vue"),
    props: false,
  },

  {
    path: "/message",
    name: "message",
    component: () => import("@/views/message/Message.vue"),
    props: false,
  },

  {
    path: "/brand_collection/:",
    name: "brand_collection",
    component: () => import("@/views/design/Brand_Collection.vue"),
  },

  {
    path: "/seasonal_collection",
    name: "seasonal_collection",
    component: () => import("@/views/design/Seasonal_Collection.vue"),
  },

  {
    path: "/seasonal_collection/details/:id",
    name: "seasonal_collection_details",
    component: () => import("@/views/design/Seasonal_Collection_Details.vue"),
    props: true,
  },

  {
    path: "/product/evaluation",
    name: "product_evaluation",
    component: () => import("@/views/product/Evaluation.vue"),
    props: false,
  },

  {
    path: "/product/evaluation/detail/:id",
    name: "evaluation_details",
    component: () => import("@/views/product/Evaluation_Details.vue"),
    props: true,
  },

  {
    path: "/order_handle",
    name: "order_handle",
    component: () => import("@/views/order/Handle.vue"),
    props: false,
  },

  {
    path: "/order_ordered",
    name: "order_ordered",
    component: () => import("@/views/order/Ordered.vue"),
    props: false,
  },

  {
    path: "/order_completed",
    name: "order_completed",
    component: () => import("@/views/order/Completed_Order.vue"),
    props: false,
  },

  {
    path: "/order_shipping",
    name: "order_shipping",
    component: () => import("@/views/order/Shipping.vue"),
    props: false,
  },

  {
    path: "/order/details/:id",
    name: "order_details",
    component: () => import("@/views/order/Order_Details.vue"),
    props: true,
  },

  {
    path: "/product/add",
    name: "product_add",
    component: () => import("@/views/product/Add_Product.vue"),
    props: false,
  },

  {
    path: "/product/update/:colorItemId",
    name: "product_update_colorItem",
    component: () => import("@/views/product/Update_ColorItem.vue"),
    props: false,
  },

  {
    path: "/product/detail/:id",
    name: "product_detail",
    component: () => import("@/views/product/Product_Detail.vue"),
    props: true,
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
