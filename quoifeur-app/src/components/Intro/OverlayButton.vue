<template>
  <div class="button-container">
    <button
    :class="{ 'active' : isOverlayActive}"
    @click.prevent="remove"><h3>C'est partif!</h3>
    </button>
  </div>
</template>

<script type="text/javascript">
import { store, mutation } from '@/store.js'

export default {
  name: 'overlay-button',
  computed: {
    isOverlayActive () {
      return store.isIntroOpen
    }
  },
  methods: {
    remove () {
      mutation.removeOverlay()
    }
  }
}
</script>

<style type="text/css" scoped>
  button {
    border-radius: 10px;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    border: 0;
    transition: all 0.3s ease 0s;
    padding: 0 2.5em;
  }

  button:hover {
    background: #222;
    color: #FFF;
  }

</style>
