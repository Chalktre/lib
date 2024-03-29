import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import { getuserInfoApi } from '@/api'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/views/layout'),
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: () => import('@/views/home')
      },
      {
        path: 'user-info',
        component: () => import('@/views/user-info')
      },
      {
        path: 'user-avatar',
        component: () => import('@/views/user-avatar')
      },
      {
        path: 'user-pwd',
        component: () => import('@/views/user-pwd')
      },
      {
        path: 'art-cate',
        component: () => import('@/views/article/artCate.vue')
      },
      {
        path: 'art-list',
        component: () => import('@/views/article/artList.vue')
      }
    ]
  },
  {
    path: '/reg',
    component: () => import('@/views/register')
  },
  {
    path: '/login',
    component: () => import('@/views/login')
  },
  {
    path: '*',
    component: () => import('@/views/notfound')
  }
]

const router = new VueRouter({
  routes
})

// 无需验证token的页面
const whiteList = ['/login', '/reg']

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (token) {
    // 如果有token, 证明已登录

    if (!store.state.userInfo.username) {
      // 有token但是没有用户信息, 才去请求用户信息保存到vuex里
      // 调用actions里方法请求数据
      getuserInfoApi().then(res => {
        store.commit('updateUserInfo', res.data.data)
      })
      // 下次切换页面vuex里有用户信息数据就不会重复请求用户信息
    }

    next() // 路由放行
  } else {
    // 如果无token
    // 如果去的是白名单页面, 则放行
    if (whiteList.includes(to.path)) {
      next()
    } else {
      // 如果其他页面请强制拦截并跳转到登录页面
      next('/login')
    }
  }
})

export default router
