import Vue from 'vue'
import VueRouter from 'vue-router'
import About from '../views/About.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'About',
    component: About,
    meta:{
      title:"About",
    }
  },
  {
    path: '/installation',
    name: 'Installation',
    component: () => import('../views/Installation.vue'),
    meta:{
      title:"Installation",
    }
  },
  {
    path: '/data-overview',
    name: 'Data',
    component: () => import('../views/Data.vue'),
    meta:{
      title:"Data Overview",
    }
  },
  {
    path: '/monitors/:id?',
    name: 'Monitors',
    component: () => import('../views/Monitors.vue'),
    meta:{
      title:"Monitors",
    }
  }
]
const router = new VueRouter({
  mode: 'hash',
  base: (process.env.NODE_ENV == "development") ? "/" : "/~vspillai/packet-lab/",
  routes
})
router.beforeEach((to, from, next)=>{
  let title = to.meta.title;
  if(to.name == "Monitors"){
    if(to.params.id){
      title+=" "+to.params.id
    }
  }
  to.meta.currentPageTitle = title;
  document.title = title+" | PacketLab";
  next();
})
router.onError(error => {
  if (/loading chunk \d* failed./i.test(error.message)) {
    window.location.reload()
  }
})
export default router
