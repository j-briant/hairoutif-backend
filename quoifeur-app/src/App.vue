<template>
  <div id="app">
    <!--
    <back-button></back-button>
    <Bar></Bar>
    <info-panel></info-panel>-->
    <PanelButton></PanelButton>
    <left-panel></left-panel>
    <Map></Map>
  </div>
</template>

<script>
import Map from '@/components/Map.vue'
// import BackButton from '@/components/BackButton.vue'
// import InfoPanel from '@/components/InfoPanel.vue'
// import Bar from '@/components/Bar.vue'
import PanelButton from '@/components/PanelButton.vue'
import LeftPanel from '@/components/LeftPanel.vue'

export default {
  name: 'App',
  components: {
    // Bar,
    Map,
    // BackButton,
    // InfoPanel,
    PanelButton,
    LeftPanel
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
