<template>
  <div class="sidebar">
    <div class="sidebar-backdrop" @click="closeSidebarPanel" v-if="isPanelOpen"></div>
    <transition name="slide">
      <div v-if="isPanelOpen" class="sidebar-panel">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
import { store, mutation } from '@/store.js'

export default {
  methods: {
    closeSidebarPanel: mutation.toggleNav
  },
  computed: {
    isPanelOpen () {
      return store.isNavOpen
    }
  }
}
</script>

<style>
.slide-enter-active,
.slide-leave-active
{
    transition: transform 0.2s ease;
}

.slide-enter,
.slide-leave-to {
    transform: translateX(100%);
    transition: all 150ms ease-in 0s
}

.sidebar-backdrop {
    background-color: rgba(0,0,0,.5);
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    cursor: pointer;
    z-index: 5;
}

.sidebar-panel {
  display: block;
  overflow-y: auto;
  background-color: #111;
  position: fixed;
  right: 0;
  top: 50px;
  z-index: 10;
  padding: 0rem;
  width: 150px;
}

</style>
