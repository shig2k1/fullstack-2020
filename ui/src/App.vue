<template lang="pug">
  #app
    // check state
    // :: logged in
    pre {{ state }}
    // :: not logged in
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import session from './utils/localstorage'

const { localStorage } = session

@Component({
  components: {
  }
})
export default class App extends Vue {
  state = {}

  login (nickname: string) {
    console.log('', nickname)
  }

  async mounted () {
    this.setupSockets()
  }

  setupSockets () {
    this.$socketIO.on('msg', function (data: object) {
      console.log('yo', data)
    })
  }

  async created () {
    const user = await localStorage.getItem('user')
    if (user) {
      console.log('user', user)
    } else {
      console.log('no user')
    }
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
