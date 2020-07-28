import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Detail from '../views/Detail.vue'
import About from '../views/About.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/nplid/:id',
    name: 'Detail',
    component: Detail
  },
  {
    path: '/om',
    name: 'About',
    component: About
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
