<template>
  <div v-if="overlayDescription.bool" class="overlay">
    <div class="overlay-container">
      <h1>{{ name }}</h1>
      <div v-html="description"></div>
      <div v-if="name == 'Contact'">
        <contact-form/>
      </div>
      <closing-button/>
    </div>
  </div>
</template>

<script>
import { store } from '@/store.js'
import ClosingButton from '@/components/ClosingButton.vue'
import ContactForm from '@/components/About/ContactForm.vue'

export default {
  data () {
    return {
      name: null,
      description: null
    }
  },
  components: {
    'closing-button': ClosingButton,
    'contact-form': ContactForm
  },
  computed: {
    overlayDescription () {
      return {
        bool: store.isOverlayOpen[store.overlayName],
        desc: store.overlayDesc[store.overlayName],
        n: store.overlayName
      }
    }
  },
  watch: {
    overlayDescription: {
      handler: function (data) {
        this.name = data.n
        this.description = data.desc
      }
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
  z-index: 100;
}

.overlay-container {
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  overflow-y: auto;
  max-width: 50%;
  max-height: 70%;
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
