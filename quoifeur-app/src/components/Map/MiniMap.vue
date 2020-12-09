<template>
  <div id="main-map">
    <div id="guyane-map"></div>
    <div id="martinique-map"></div>
    <div id="guadeloupe-map"></div>
    <div id="mayotte-map"></div>
    <div id="reunion-map"></div>
  </div>
</template>

<script type="text/javascript">
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { store, utils } from '@/store'
import { bus } from '@/main'

export default {
  name: 'mini-map',
  data () {
    return {
      mainDiv: null,
      guyaneDiv: null,
      martiniqueDiv: null,
      guadeloupeDiv: null,
      mayotteDiv: null,
      reunionDiv: null,
      selected: null,
      layers: {
        metro: {},
        guyane: {},
        martinique: {},
        guadeloupe: {},
        reunion: {},
        mayotte: {}
      }
    }
  },
  methods: {
    setupMiniMaps: function () {
      this.mainDiv = L.map('main-map', {
        zoomControl: false,
        attributionControl: false
      }).fitBounds([[41.28, -6.5], [51.5, 10]])
      this.guyaneDiv = L.map('guyane-map', {
        zoomControl: false,
        attributionControl: false
      }).fitBounds([[2.11, -53.65], [6.06, -52.5]])
      this.martiniqueDiv = L.map('martinique-map', {
        zoomControl: false,
        attributionControl: false
      }).fitBounds([[14.2, -61.2], [15, -60.8]])
      this.guadeloupeDiv = L.map('guadeloupe-map', {
        zoomControl: false,
        attributionControl: false
      }).fitBounds([[15.8, -61.65], [16.6, -61.35]])
      this.mayotteDiv = L.map('mayotte-map', {
        zoomControl: false,
        attributionControl: false
      }).fitBounds([[-12.5, 45], [-13.1, 45.2]])
      this.reunionDiv = L.map('reunion-map', {
        zoomControl: false,
        attributionControl: false
      }).fitBounds([[-20.7, 55], [-21.5, 56]])
    },

    addRegions: function (geojson, region) {
      // Initialize new geojson layer
      this.layers[region] = L.geoJSON(geojson.filter(e => (region.indexOf(e.properties.loc) !== -1)), {
        style: {
          color: '#FFF',
          weight: 1,
          opacity: 0.65
        },
        onEachFeature: this.onEachRegion
      })
    },

    onEachRegion (feature, layer) {
      layer.on({
        click: (e) => {
          // send description
          this.sentRegionDesc(feature, layer)
          // If a layer is currently selected, deselect it
          if (this.selected) {
            for (const l in this.layers) {
              this.layers[l].resetStyle(this.selected)
            }
          }
          // Select the provided region layer
          this.selected = layer
          if (this.selected) {
            this.selected.setStyle({ color: 'green' })
          }
        }
      })
    },

    sentRegionDesc (feature, layer) {
      bus.$emit('regionSelected', { bounds: layer.getBounds(), rid: feature.properties.id })
    },

    async loadMapData () {
      const geojson = await store.api.getRegions()
      this.addRegions(geojson, ['metro'])
      this.addRegions(geojson, ['guyane'])
      this.addRegions(geojson, ['martinique'])
      this.addRegions(geojson, ['guadeloupe'])
      this.addRegions(geojson, ['reunion'])
      this.addRegions(geojson, ['mayotte'])
      this.mainDiv.addLayer(this.layers.metro)
      this.guyaneDiv.addLayer(this.layers.guyane)
      this.martiniqueDiv.addLayer(this.layers.martinique)
      this.guadeloupeDiv.addLayer(this.layers.guadeloupe)
      this.mayotteDiv.addLayer(this.layers.mayotte)
      this.reunionDiv.addLayer(this.layers.reunion)
    }
  },
  mounted () {
    utils.initializeApi()
    this.setupMiniMaps()
    this.loadMapData()
  }
}
</script>

<style type="text/css">
  #main-map {
    position: relative;
    height: 100%;
    width: 100%;
    z-index: 100;
    background: transparent;
  }

  #main-map:hover {
    background: #222;
  }

  #guyane-map {
    position: absolute;
    height: 30%;
    width: 20%;
    left: 0;
    bottom: 0%;
    z-index: 100;
    border: 2px solid #FFF;
    background: transparent;
  }

  #martinique-map {
    position: absolute;
    height: 30%;
    width: 20%;
    left: 0;
    bottom: 30%;
    z-index: 100;
    border: 2px solid #FFF;
    border-bottom: 0px;
    background: transparent;
  }

  #guadeloupe-map {
    position: absolute;
    height: 30%;
    width: 20%;
    left: 0;
    bottom: 60%;
    z-index: 100;
    border: 2px solid #FFF;
    border-bottom: 0px;
    background: transparent;
}

  #mayotte-map {
    position: absolute;
    height: 30%;
    width: 20%;
    right: 0;
    bottom: 0%;
    z-index: 100;
    border: 2px solid #FFF;
    background: transparent;
  }

  #reunion-map {
    position: absolute;
    height: 30%;
    width: 20%;
    right: 0;
    bottom: 30%;
    z-index: 100;
    border: 2px solid #FFF;
    background: transparent;
    border-bottom: 0px;
  }

</style>
