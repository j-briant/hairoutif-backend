<template>
  <div id="app">
    <Map></Map>
    <back-button></back-button>
  </div>
</template>

<script>
import Map from '@/components/Map.vue'
import BackButton from '@/components/BackButton.vue'

export default {
  name: 'App',
  components: {
    Map,
    BackButton
  }
}
</script>
