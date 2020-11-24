<template>
  <button v-on:click="resetView">Retour</button>
</template>

<script>
export default {
  name: 'back-button',
  data () {
    return {
      center: [47.5, 2.4],
      zoom: 6
    }
  },
  methods: {
    resetView: function () {
    }
  }
}
</script>

<style>
button {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 1000;
  background: #222;
  color: #faebd7;
  border: 3px #333 solid;
  border-radius: 4px;
  padding: 8px;
  text-transform: uppercase;
  text-align: center;
}

button:hover {
  background: #faebd7;
  color: #222;
  cursor: pointer;
}

</style>
