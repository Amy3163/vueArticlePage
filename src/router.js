import Vue from 'vue'
import Router from 'vue-router'
import store from './store/index'
import Login from './views/Login.vue'

Vue.use(Router)
let router = new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Home.vue'),
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: () => import('./views/Detail.vue'),
      // meta: {
      //   requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      // },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue'),
    },
    {
      path: '*',
      name: '404',
      component: () => import('./views/NotFound.vue'),
    }
  ]
})

router.beforeEach((to,from,next) => {
  const token = store.state.token;
  if(to.meta.requireAuth) {
    if(token) {
      next()
    }else {
      next({
        path: '/login'
      })
    }
  }else {
    next()
  }
}) 
export default router
