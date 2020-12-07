<template>
  <div id="closing" v-on:click='remove'>
      <button type="button" class="closing-button" title="Close">
        <span class="closing-bar closing-bar--1"></span>
        <span class="closing-bar closing-bar--3"></span>
      </button>
  </div>
</template>

<script type="text/javascript">
import { mutation } from '@/store.js'

export default {
  name: 'closing-button',
  methods: {
    remove () {
      mutation.removeOverlay()
    }
  }
}
</script>

<style scoped>

button {
  cursor: pointer;
}

/* remove blue outline */
button:focus {
  outline: 0;
}

.closing-button {
  position: relative;
  height: 30px;
  width: 32px;
  display: block;
  z-index: 1000;
  border: 0;
  border-radius: 50%;
  background-color: #222;
  pointer-events: all;
  transition: transform .6s cubic-bezier(.165,.84,.44,1);
  margin: 1em auto;
}

.closing-bar {
  background-color: #FFF;
  position: absolute;
  top: 50%;
  right: 6px;
  left: 6px;
  height: 2px;
  width: auto;
  margin-top: -1px;
  transition: transform .6s cubic-bezier(.165,.84,.44,1),opacity .6s cubic-bezier(.165,.84,.44,1),background-color .6s cubic-bezier(.165,.84,.44,1);
}

.closing-bar--1 {
  -webkit-transform: translateY(-6px);
  transform: translateY(-6px);
}

.closing-bar--3 {
  transform: translateY(6px);
}

#closing .closing-button:hover {
  transform: rotate(-180deg);
}

#closing .closing-bar--1 {
  transform: rotate(45deg)
}

#closing .closing-bar--3 {
  transform: rotate(-45deg)
}
</style>
