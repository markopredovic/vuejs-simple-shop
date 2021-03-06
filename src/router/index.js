import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/categories",
    name: "categoryPage",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/CategoryPage.vue")
  },
  {
    path: "/products",
    name: "productPage",
    component: () => import("../views/ProductPage.vue")
  },
  {
    path: "/checkout",
    name: "checkoutPage",
    component: () => import("../views/CheckoutPage.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
