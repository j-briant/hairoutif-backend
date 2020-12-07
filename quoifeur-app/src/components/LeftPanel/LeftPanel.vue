<template>
    <div class="left-panel" v-bind:class="{ active: isLeftPanelOpen }">
      <div class="pane-title" v-on:click="closeLeftPanel">Data</div>
      <Bar class="bar-graph"></Bar>
      <TopList class="top-list"></TopList>
      <MiniMap class="mini-map"></MiniMap>s
    </div>
</template>

<script>
import { store, mutation } from '@/store.js'
import Bar from '@/components/Bar.vue'
import MiniMap from '@/components/Map/MiniMap.vue'
import TopList from '@/components/LeftPanel/TopList.vue'

export default {
  components: {
    Bar,
    MiniMap,
    TopList
  },
  methods: {
    closeLeftPanel: mutation.toggleLeft
  },
  computed: {
    isLeftPanelOpen () {
      return store.isLeftOpen
    }
  }
}
</script>

<style scoped>
.pane-title {
  grid-area: paneTitle;
  writing-mode: vertical-rl;
  text-align: center;
  color: #FFF;
  text-transform: uppercase;
  transform: rotate(-180deg);
}

.pane-title:hover {
  cursor: pointer;
  background: #333;
  transition: all 150ms ease-in 0s
}

.bar-graph {
  grid-area: bar;
  padding-right: 10px;
}

.top-list {
  grid-area: toplist;
}

.mini-map {
  grid-area: minimap;
}

.left-panel {
  position: absolute;
  display: grid;
  grid-template-columns: 90% 10%;
  grid-template-rows: 20% 1fr 1fr;
  grid-template-areas:
    "bar paneTitle"
    "toplist paneTitle"
    "minimap paneTitle";
  align-items: stretch;
  justify-content: center;
  background-color: #111;
  top: 0;
  left: 0;
  padding: 0 0 0 10px;
  column-gap: 5px;
  z-index: 10;
  height: 100%;
  width: 40%;
  transition: all 150ms ease-in 0s
}

.active {
  transform: translateX(-90%);
  transition: all 150ms ease-in 0s
}

</style>
