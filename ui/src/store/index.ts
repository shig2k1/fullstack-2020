import Vue from 'vue'
import Vuex from 'vuex'

import GameModule from './game.module'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    bob: 'test'
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    game: {
      namespaced: true,
      ...GameModule
    }
  }
})
