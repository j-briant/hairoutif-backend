<template>
  <div id="app">
    <Map></Map>
    <back-button v-on:click="Map.resetView"></back-button>
    <info-panel></info-panel>
  </div>
</template>

<script>
import Map from '@/components/Map.vue'
import BackButton from '@/components/BackButton.vue'
import InfoPanel from '@/components/InfoPanel.vue'

export default {
  name: 'App',
  components: {
    Map,
    BackButton,
    InfoPanel
  }
}
</script>

<style>
  body {
    margin: 0;
  }
</style>
