import { login, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
// import { resetRouter } from "@/router"

const getDefaultState = () => {
  return {
    token: getToken(),
    userInfo: {}
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
  }
}

const actions = {

  async login(contxt, loginfrom) {
    const res = await login(loginfrom)
    console.log(res)
    contxt.commit('setToken', res.data)
  },

  async userInfo({ commit }) {
    const res = await getInfo()
    console.log(res)
    commit('getInfo', res.data)
  },

  async logout({ commit }) {
    commit('removeToken')
    commit('getInfo', {})
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
