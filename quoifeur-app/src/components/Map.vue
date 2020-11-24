<template>
  <div id="mapContainer"></div>
</template>

<script>
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import 'leaflet.markercluster/dist/leaflet.markercluster-src.js'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import { ApiService } from './ApiService'

export default {
  name: 'Map',
  data () {
    return {
      mapDiv: null,
      api: null,
      layers: {},
      center: [47.5, 2.4],
      zoom: 6
    }
  },
  methods: {
    initializeApi: function () {
      // Initialize API service
      if (window.location.hostname === 'localhost') {
        this.api = new ApiService('http://localhost:5000/')
      } else {
        this.api = new ApiService('http://localhost:5000/')
      }
    },
    setupLeafletMap: function () {
      this.mapDiv = L.map('mapContainer', {
        minZoom: 5,
        maxBounds: [[41, -6], [52, 10]]
      }).setView(this.center, 6)
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd'
      }).addTo(this.mapDiv)
      this.mapDiv.zoomControl.setPosition('bottomright')
    },
    addMarkers: function (geojson, iconUrl) {
      // Initialize new geojson layer
      this.layers.markerGroup = L.markerClusterGroup()
      this.layers.markers = L.geoJSON(geojson, {
        pointToLayer: (feature, latlng) => {
          return L.marker(latlng, {
            icon: L.icon({ iconUrl, iconSize: [30, 30] }),
            title: feature.properties.name
          })
        }
      })
      this.layers.markerGroup.addLayer(this.layers.markers)
    },
    async loadMapData () {
      const geojson = await this.api.getMarkers()
      this.addMarkers(geojson, 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Circle-icons-scissors.svg/1024px-Circle-icons-scissors.svg.png')
      this.mapDiv.addLayer(this.layers.markerGroup)
    }
  },

  mounted () {
    this.initializeApi()
    this.setupLeafletMap()
    this.loadMapData()
  }
}

</script>

<style scoped>
 #mapContainer {
  width: 100vw;
  height: 100vh;
}
</style>
