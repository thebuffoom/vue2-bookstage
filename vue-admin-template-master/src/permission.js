import router from './router'
import store from './store'
// import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import { MyRouter} from "./router"
NProgress.configure({ showSpinner: false }) // NProgress Configuration
const whiteList = ['/login', '/404'] // no redirect whitelist
router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()
  // set page title
  document.title = getPageTitle(to.meta.title)
  // determine whether the user has logged in
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      next('/')
      NProgress.done()
    } else {
      // 判断是否有数据
      if(!store.getters.userId){
        // 获取用户数据
      let res = await store.dispatch('user/userInfo')
      // 过滤 进行名称匹配
        const filterRoutes = MyRouter.filter(item=>{
          // 过滤出了来的数据 返回出去
          return res.roles.menus.includes(item.name)
        })
        // 存储在 vuex 中
        store.commit('user/setRoutes',filterRoutes)
        // 动态添加路由
        router.addRoutes([...filterRoutes,{ path: '*', redirect: '/404', hidden: true }])
        // router动态添加 目的让路由留有信息
        next(to.path)
      }
      next()
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
