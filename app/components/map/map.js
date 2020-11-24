import './map.scss'
import L from 'leaflet'
import { Component } from '../component'

const template = '<div ref="mapContainer" class="map-container"></div>'

/**
 * Leaflet Map Component
 * Render GoT map items, and provide user interactivity.
 * @extends Component
 */
 export class Map extends Component {
  /** Map Component Constructor
   * @param { String } placeholderId Element ID to inflate the map into
   * @param { Object } props.events.click Map item click listener
   */
   constructor (mapPlaceholderId, props) {
    super(mapPlaceholderId, props, template)
    this.api = props.data.apiService

    // Initialize Leaflet map
    this.map = L.map(this.refs.mapContainer, {
      center: [ 30, 0 ],
      zoom: 2,
      maxZoom: 13,
      minZoom: 2,
      maxBounds: [ [ 300, -300], [ -300, 300 ] ]
    })

   // Render tile baselayer || CARTO
   const cartoBaseMap = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd'
  }).addTo(this.map)

    // Render tile baselayer || ESRI-WI
    const Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    })//.addTo(this.map)
    

    // MAP CONTROLS
    const baseMaps = {
      "CartoDB": cartoBaseMap,
      "ESRI-WI": Esri_WorldImagery
    }

    L.control.scale({position: 'bottomright', maxWidth: 200}).addTo(this.map)
    L.control.layers(baseMaps, null, {position:'bottomright'}).addTo(this.map)
    this.map.zoomControl.setPosition('bottomright') // Position zoom control


    this.map.on('zoomend', () => {
      if(this.map.getZoom() < 8){
        this.map.addLayer(cartoBaseMap)
        this.map.removeLayer(Esri_WorldImagery)
      } else {
        this.map.addLayer(Esri_WorldImagery)
        this.map.removeLayer(cartoBaseMap)    
      }
    })


    this.layers = {} // Map layer dict (key/value = title/layer)
  }

  /** Add centroid to  the leaflet instance */
  addCentroidsGeojson(geojson, iconUrl){
      // Initialize new geojson layer
      this.layers['centroids'] = L.geoJSON(geojson, {
        pointToLayer: (feature, latlng) => {
          return L.marker(latlng, {
            icon: L.icon({iconUrl, iconSize: [30, 50]}),
            title: feature.properties.name
          })
        },
        onEachFeature: this.onEachLocation.bind(this)
      })
    }

    /** Assign Popup and click listener for each centroid */
    onEachLocation (feature, layer) {
      // Bind popup to marker
      layer.bindPopup(feature.properties.name, {closeButton: false})
      layer.on({click: (e) => {
        const {name, id} = feature.properties
        this.triggerEvent('locationSelected', {name, id})
      }})
    }

    /** Toggle map layer visibility */
    toggleLayer (layerName) {
      const layer = this.layers[layerName]
      if (this.map.hasLayer(layer)){
        this.map.removeLayer(layer)
      } else {
        this.map.addLayer(layer)
      }
    }

    async zoomToAOI (id) {
      // Remove popup
      this.map.closePopup()
      // Download the AOI geom data
      let AOIGeojson = await this.api.getAOIGeom(id)

      // Toggle the aois layer
      if(this.layers.aois){
        this.toggleLayer('aois')
      }
      // Create the geojson layer
      this.layers['aois'] = L.geoJSON(AOIGeojson, {
        style: {
          'opacity': 0,
          'fillOpacity':0
        },
        
      })
      this.layers.aois.on('mouseover', () => {
        this.layers.aois.setStyle({
          'color': '#FFB200',
          'weight': 2,
          'opacity': 0.7,
          'fillOpacity': 0.3
        })
      })

      this.layers.aois.on('mouseout', () => {
        this.layers.aois.resetStyle()
      })

      this.toggleLayer('aois')
      this.map.fitBounds(this.layers.aois.getBounds(), {paddingTopLeft: [ 900, 0 ], paddingBottomRight: [0, 0] })
    }
  }