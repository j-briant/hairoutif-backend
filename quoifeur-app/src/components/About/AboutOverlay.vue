<template>
  <div v-if="isAboutOpen" class="about">
    <div class="about-container">
      <h1>A propos</h1>
      <div id="apropos"><p>Les données utilisées sont issues de <a href="https://www.openstreetmap.org/">OpenStreetMap</a> et mises à jour régulièrement. Si votre commerce n'apparaît pas et que vous n'êtes satisfait.e, parce que quand même hein, ce qui est tout à fait normal, considérez participer au projet et à l'inclure dans la base de donnée.</p></div>
      <closing-button></closing-button>
    </div>
  </div>
</template>

<script>
import { store, mutation } from '@/store.js'
import ClosingButton from '@/components/ClosingButton.vue'

export default {
  methods: {
    closeOverlay: mutation.removeOverlay
  },
  components: {
    'closing-button': ClosingButton
  },
  computed: {
    isAboutOpen () {
      return store.isAboutOpen
    }
  }
}
</script>

<style>

.about {
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

.about-container {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  overflow-y: auto;
  max-width: 50%;
  max-height: 50%;
  background: rgba(235,235,235,1);
  padding: 2em;
}

p {
  padding-bottom: 1.5em;
}

a {
  color: #42c600;
  font-weight: bold;
  text-decoration: none;
}

</style>
