<template lang="pug">
  pre {{ userData }}
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import gameService from '../api/game.service'

@Component
export default class TestComponent extends Vue {
  userData: object = {}

  async mounted () {
    this.userData = await gameService.GetUser()
  }
}
</script>
<style lang="scss">
</style>
