import Vue from 'vue'
import Vuex from 'vuex'

import GameModule from './game.module'

import AuthService from '../api/auth.service'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    SET_USER (state, user) {
      state.user = user
    }
  },
  actions: {
    checkLogin: async ({ commit, state }, { token }) => {
      const user: any = await AuthService.GetUser()
      commit('SET_USER', user.username)
    }
  },
  modules: {
    game: {
      namespaced: true,
      ...GameModule
    }
  }
})
