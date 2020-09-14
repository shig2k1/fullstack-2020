<template lang="pug">
  #app
    // not logged in - show log in
    div(v-if="!loggedIn")
      form(@submit.prevent="login")
        input(type="text" v-model="nickname")#nickname
        button(type="submit" :disabled="isLoading")
          span(v-if="!isLoading") login
          span(v-else) ...

    // create a game

    // game lobby

    // logged in - show info & log out
    div(v-else)
      button(@click="logout") log out
      landing-page

    // check state
    // :: logged in
    pre {{ state }}
    // :: not logged in
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import session from '@/utils/localstorage'
import api from '@/api'

import LandingPage from '@/components/LandingPage.vue'

const { localStorage } = session

@Component({
  components: {
    LandingPage
  }
})
export default class App extends Vue {
  connection!: SocketIOClient.Socket

  state = {}
  loggedIn = false
  isLoading = false

  nickname = ''

  async login () {
    this.isLoading = true
    const loginData = await api.GetUser(this.nickname)
    if (loginData) {
      await localStorage.setItem('user', loginData)
      this.loggedIn = true
    }
    this.isLoading = false
  }

  async logout () {
    await localStorage.removeItem('user')
    this.loggedIn = false
  }

  async mounted () {
    this.setupSockets()
  }

  setupSockets () {
    this.$socketIO.on('msg', this.messageEvent)
  }

  messageEvent (data: object) {
    console.log('yo!!!', data)
  }

  async created () {
    const user = await localStorage.getItem('user')
    // check is a user logged in

    // check if the user is in a game already
    if (user) {
      console.log('user', user)
      this.loggedIn = true
    } else {
      console.log('no user')
    }
  }

  destroyed () {
    console.log('clearinign up')
    this.$socketIO.off('msg', this.messageEvent)
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
