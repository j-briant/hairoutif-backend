<template>
  <button v-on:click="resView">Reset View</button>
</template>

<script>
import { bus } from '../main'
export default {
  name: 'back-button',
  methods: {
    resView: function () {
      bus.$emit('clicked')
    }
  }
}
</script>

<style>
button {
  position: absolute;
  top: 50%;
  left: 20px;
  z-index: 1000;
  background: #C75C5C;
  color: #faebd7;
  border: 3px #C75C5C solid;
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
