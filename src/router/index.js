import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/monitors/:id?',
    name: 'Monitors',
    component: () => import('../views/Monitors.vue')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: (process.env.NODE_ENV == "development ") ? "/" : "/~vspillai/packet-lab/",
  routes
})

export default router
