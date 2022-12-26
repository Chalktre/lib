import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    userInfo: {}
  },
  getters: {
    nickname: state => state.userInfo.nickname,
    username: state => state.userInfo.username,
    user_pic: state => state.userInfo.user_pic
  },
  mutations: {
    updateToken (state, newToken) {
      state.token = newToken
    },
    updateUserInfo (state, newInfo) {
      state.userInfo = newInfo
    }
  },
  actions: {
  },
  modules: {
  },
  plugin: [createPersistedState()]
})
