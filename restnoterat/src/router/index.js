import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import HomeAlt from '../views/HomeAlt.vue'
import Detail from '../views/Detail.vue'
import About from '../views/About.vue'
import Feedback from '../views/Feedback.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/alt',
    name: 'Home',
    component: HomeAlt
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
  },
  {
    path: '/feedback',
    name: 'Feedback',
    component: Feedback
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
