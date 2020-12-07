<template>
  <div v-if="isOverlayOpen" class="overlay">
    <div class="intro-container">
      <h1>Hair ou Tif?</h1>
      <div id="intro"><p>Car il y a des sujets d'importance capitale, on se doit parfois d'essayer d'y amener des réponses. Ce site est un hommage à tou.te.s les coiffeuses et coiffeurs à l'âme créative et au nom improbable.</p></div>
      <overlay-button></overlay-button>
    </div>
  </div>
</template>

<script>
import { store, mutation } from '@/store.js'
import OverlayButton from './OverlayButton.vue'

export default {
  components: {
    'overlay-button': OverlayButton
  },
  methods: {
    closeOverlay: mutation.removeOverlay
  },
  computed: {
    isOverlayOpen () {
      return store.isIntroOpen
    }
  }
}
</script>

<style>

.overlay {
  display: flex;
  flex-flow: column;
  position: absolute;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
  background: rgba(34,34,34,0.5);
  color: #222;
  z-index: 20;
}

.intro-container {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  overflow-y: auto;
  max-width: 50%;
  background: rgba(235,235,235,1);
  padding: 2em;
}

p {
  padding-bottom: 1.5em;
}

</style>
