import { Module } from 'vuex'

import GAME_STATE from '@/enums/gamestate'

const module: Module<object, object> = {
  state: {
    state: GAME_STATE.LOADING,
    test: 'name'
  },
  mutations: {
  },
  actions: {
    restoreLastGame () {
      console.log('restoring last game...')
    }
  }
}

export default module
