import './main.scss'
import template from './main.html'

import { GraphPanel } from './components/graph-panel/graph-panel'
import { Map } from './components/map/map'
import { ApiService } from './services/api'
import { BackButton } from './components/back-button/back-button'
import { Logo } from './components/sertit-logo/sertit-logo'

/** Main UI Controller Class */
class ViewController {
	/** Initialize Application */
	constructor () {
		document.getElementById('app').outerHTML = template

    // Initialize API service
    if (window.location.hostname === 'localhost') {
    	this.api = new ApiService('http://localhost:5000/')
    } else {
    	this.api = new ApiService('https://130.79.221.33/')
    }

    this.initializeComponents()
    this.loadMapData()
}

/** initialize Components with data and event listeners */
initializeComponents () {
		// Initialize logo
		this.logoComponent = new Logo('sertit-logo')

		// Initialize Graph Panel
		this.graphComponent = new GraphPanel('graph-panel-placeholder', {
			data: {apiService: this.api},
		})

		// Initialize Map
		this.mapComponent = new Map('map-placeholder', {
			data: {apiService: this.api},
			events: {
				locationSelected: async event => {
					// Show graph in graphComponent on "locationSelected" event
					const {name, id} = event.detail
					await this.graphComponent.showGraph(name, id)
					this.mapComponent.zoomToAOI(id)
				}}
			})

		// Initialize Button
		this.buttonComponent = new BackButton('back-button-placeholder', {
			events: {
				viewReset: event => {
					this.mapComponent.map.setView([ 30, 0 ], 2)
					if (this.mapComponent.layers['aois']){
						this.mapComponent.toggleLayer('aois')
					} else {}
				}
			}
		})
	}

	async loadMapData () {
		// Download the centroid data
		const centroidsGeojson = await this.api.getCentroids()

		// Add centroids to map
		this.mapComponent.addCentroidsGeojson(centroidsGeojson, 'https://upload.wikimedia.org/wikipedia/commons/1/1c/Circle-icons-water.svg')

		// Show centroids
		this.mapComponent.toggleLayer('centroids')
	}

}

window.ctrl = new ViewController()