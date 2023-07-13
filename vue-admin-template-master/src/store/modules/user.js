import { login, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { constantRoutes } from "@/router"

const getDefaultState = () => {
  return {
    token: getToken(),
    userInfo: {},
    routes: constantRoutes
  }
}

const state = getDefaultState()

const mutations = {
  setToken(state, token) {
    state.token = token
    setToken(token)
  },
  removeToken(state) {
    state.token = null
    removeToken()
  },
  getInfo(state, info) {
    state.userInfo = info
  },
  setRoutes(state, newRoutes) {
    state.routes = [...constantRoutes, ...newRoutes]
  }
}

const actions = {

  async login(contxt, loginfrom) {
    const res = await login(loginfrom)
    contxt.commit('setToken', res.data)
  },
  async logout({ commit }) {
    commit('removeToken')
    commit('getInfo', {})
  },
  async userInfo({ commit }) {
    const res = await getInfo()
    // 存储 用户资料
    commit('getInfo', res.data)
    // 用于拿到权限标识
    return res.data
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
