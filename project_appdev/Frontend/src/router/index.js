import { createRouter, createWebHistory } from 'vue-router'
//import HomeView from '../views/HomeView.vue'
import loginview from '../views/loginview.vue'
import register from '../views/register.vue'
import home from '../views/home.vue'
import admin from '../views/admin.vue'
import product from '../views/product.vue'
import cart from '../views/cart.vue'
import checkout from '../views/checkout.vue'
import landingpage from '../views/landingpage.vue'
import profile from '../views/profile.vue'

const routes = [
  {
    path: '/',
    name: 'landingpage',
    component: landingpage
  },
  {
    path: '/login',
    name: 'login',
    component: loginview
  },

  {
    path: '/signup',
    name: 'signup',
    component: register
  },

  {
    path: '/home',
    name: 'home',
    component: home
  },
  {
    path: '/profile',
    name: 'profile',
    component: profile
  },
  {
    path: '/admin/dashboard',
    name: 'admin',
    component: admin
  },

  { path: '/cart', component: cart },
  { path: '/product', component: product },

  {
    path: '/checkout',
    name: 'checkout',
    component: checkout
  },
  {
    path: '/cart',
    name: 'Cart',
    component: cart
  },
  

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
