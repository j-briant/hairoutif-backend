<template>
  <li v-on:click="openAboutOverlay">About</li>
</template>

<script type="text/javascript">
import { mutation } from '@/store.js'

export default {
  name: 'about-list',
  methods: {
    openAboutOverlay () {
      mutation.toggleAbout()
      mutation.toggleNav()
    }
  }
}
</script>
