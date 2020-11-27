<template>
  <div id="app">
    <Map></Map>
    <back-button></back-button>
    <info-panel></info-panel>
    <Bar></Bar>
  </div>
</template>

<script>
import Map from '@/components/Map.vue'
import BackButton from '@/components/BackButton.vue'
import InfoPanel from '@/components/InfoPanel.vue'
import Bar from '@/components/Bar.vue'

export default {
  name: 'App',
  components: {
    Bar,
    Map,
    BackButton,
    InfoPanel
  }
}
</script>

<style>
  body {
    width: 100vw;
    height: 100vh;
    margin: 0;
  }
</style>
