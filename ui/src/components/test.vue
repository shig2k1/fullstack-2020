<template lang="pug">
  pre {{ userData }}
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

@Component
export default class TestComponent extends Vue {
  userData: object = {}
}
</script>
<style lang="scss">
</style>
