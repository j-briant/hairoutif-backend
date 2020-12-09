<template>
  <div class="list">
    <ol>
      <li v-for="(item, idx) in items" :key="idx">
       {{ item.name }}&#9;{{ item.n }}
      </li>
    </ol>
  </div>
</template>

<script type="text/javascript">
import { store, utils } from '@/store'
import { bus } from '@/main'

export default {
  name: 'top-list',
  data () {
    return {
      items: null
    }
  },
  methods: {
    async getTopNames (id) {
      this.items = await store.api.getTop(id)
    }
  },
  created () {
    utils.initializeApi()
    this.getTopNames(1)
    bus.$on('regionSelected', e => this.getTopNames(e.rid))
  }

}

</script>

<style type="text/css" scoped>
  .list {
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
    margin: 0;
    color: #FFF;
  }

  .list:hover {
    background: #222;
  }

  li {
    flex-grow: 1;
    color: #FFF;
  }

  li:hover {
    color: #222;
    background: #FFF;
  }

</style>
