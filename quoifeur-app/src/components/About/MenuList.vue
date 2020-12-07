<template>
  <ul class="sidebar-panel-nav">
    <li v-for="n in listValue" :key="n" v-on:click="openOverlay(n)">{{n}}</li>
  </ul>
</template>

<script type="text/javascript">
import { mutation } from '@/store.js'

export default {
  name: 'menu-list',
  data () {
    return {
      listValue: {
        about: 'About',
        contact: 'Contact'
      }
    }
  },
  methods: {
    openOverlay (n) {
      mutation.toggleOverlay(n)
      mutation.toggleNav()
    }
  }
}
</script>
