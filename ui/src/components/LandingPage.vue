<template lang="pug">
  #landing-page
    h1 Landing page

    h4 What you want to do?
    button(@click="createGame") Create game
    button(@click="joinGame") Join game

    pre {{ gamemode }}

</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

@Component
export default class VueComponent extends Vue {
  get gamemode () {
    return this.$store.state ?? 'test'
  }

  createGame () {
    console.log('create')
  }

  joinGame () {
    console.log('join')
  }
}
</script>
<style lang="scss">
</style>
