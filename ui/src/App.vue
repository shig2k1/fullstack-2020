<template lang="pug">
  #app
    // not logged in - show log in
    div(v-if="!loggedIn")
      form(@submit.prevent="login")
        input(type="text" v-model="userModel.username")#username
        input(type="text" v-model="userModel.password")#password
        button(type="submit" :disabled="isLoading")
          span(v-if="!isLoading") login
          span(v-else) ...

    // create a game

    // game lobby

    // logged in - show info & log out
    div(v-else)
      pre user {{ user }}

      button(@click="logout") log out

      test

      landing-page

    // check state
    // :: logged in
    pre {{ state }}
    // :: not logged in
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import session from '@/utils/localstorage'
import authService from './api/auth.service'

import LandingPage from '@/components/LandingPage.vue'
import Test from '@/components/test.vue'

import Cookies from 'js-cookie'

const { localStorage } = session

@Component({
  components: {
    LandingPage,
    Test
  }
})
export default class App extends Vue {
  connection!: SocketIOClient.Socket

  state = {}
  loggedIn = false
  isLoading = false

  userModel = {
    username: '',
    password: ''
  }

  get user () {
    return this.$store.state.user
  }

  async login () {
    this.isLoading = true
    const loginData = await authService.Login(this.userModel.username, this.userModel.password)
    if (loginData) {
      await localStorage.setItem('user', loginData)
      this.loggedIn = true
      this.checkLogin()
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

  checkLogin () {
    const token = Cookies.get('token')
    // check if the user is in a game already
    if (token) {
      console.log('user', token)
      this.$store.dispatch('checkLogin', { token })
      this.loggedIn = true
    } else {
      console.log('no user')
    }
  }

  async created () {
    // const user = await localStorage.getItem('user')
    // check is a user logged in
    this.checkLogin()
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
