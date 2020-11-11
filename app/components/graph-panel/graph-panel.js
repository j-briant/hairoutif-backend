import './graph-panel.scss'
import template from './graph-panel.html'
import { Component } from '../component'

const chart = require('chart.js')

/**
 * Info Panel Component
 * Download and display metadata for selected items.
 * @extends Component
 */
export class GraphPanel extends Component {
  /** LayerPanel Component Constructor
   * @param { Object } props.data.apiService ApiService instance to use for data fetching
   */
  constructor (placeholderId, props) {
    super(placeholderId, props, template)
    this.api = props.data.apiService

    // Toggle info panel on title click
    this.refs.title.addEventListener('click', () => this.refs.container.classList.toggle('graph-active'))

    // Listener on the Cloud slider
    this.refs.cloudSlider.oninput = (v) => this.applyFilters()

    // Listeners on Date fields
    this.refs.startDate.oninput = (v) => this.applyFilters()
    this.refs.endDate.oninput = (v) => this.applyFilters()
    
    // Object for containing raw query results
    this.rawData = {}

    // Config. the graph
    this.config = {
  			type: 'line',
  			data: {
  				labels: [],
  				datasets: [{
  					backgroundColor: '#01B3FE',
  					borderColor: '#01B3FE',
  					data: [],
  					lineTension: 0,
  					fill: false
  				}]
  			},
  			options: {
  				responsive: true,
  				legend: false,
  				title: {
  					display: true,
  					fontSize: 16
  				},
  				tooltips: {
  					mode: 'nearest',
  					intersect: false
  				},
  				scales: {
  					xAxes: [{
  						type: 'time',
  						display: true,
  						scaleLabel: {
  							display: true,
  							labelString: 'Date',
  							fontSize: 14,
  							fontStyle: 'bold'
  						},
  						time:{
  							displayFormats: {day: 'DD MMM YYYY'}
  						}
  					}],
  					yAxes: [{
  						display: true,
  						scaleLabel: {
  							display: true,
  							labelString: 'Water surface [km²]',
  							fontSize: 14,
  							fontStyle: 'bold'
  						}
  					}]
  				}
  			}
  		}

    // Setup the graph object
    this.graph = new chart(this.refs.content.getContext('2d'), this.config)
  	}


  	/** Show graph when a point is selected */
  	async showGraph(name, id){
  		this.refs.title.innerHTML = `<h1>${name}</h1>`

  		// Clear the graph
  		this.graph.destroy()

  		// Set the cloud value span text to 100
  		document.getElementById('cl-val').innerText = '100'

  		// Set the slider value to 100
  		this.refs.cloudSlider.value = 100
  		
  		// Get data
  		this.rawData = await this.api.getAOISurfaces(id)
  		if (this.rawData.length){

  			// Get max date
  			const eD = new Date(Math.max.apply(null, this.rawData.map(date => Date.parse(date.d))))
  			eD.setDate(eD.getDate()+1)

  			// Fill date fields with min and max dates
  			this.refs.startDate.valueAsDate = new Date(Math.min.apply(null, this.rawData.map(date => Date.parse(date.d))))
			this.refs.endDate.valueAsDate = eD

  			//Set min and max 
  			this.refs.startDate.min = this.refs.startDate.valueAsDate
  			this.refs.endDate.max = this.refs.endDate.valueAsDate

	  		const clouds = this.rawData.map(cl => parseFloat(cl.cloud))
	  		this.config.data.labels = this.rawData.map(date => Date.parse(date.d))
	  		this.config.data.datasets[0].data = this.rawData.map(surf=> parseFloat(surf.surface).toFixed(2))

	  		this.config.options.title.text = `Water surface variation at Lake ${name}`

	  		this.graph = new chart(this.refs.content.getContext('2d'), this.config)
	  	} else {
	  		throw new Error(`Error while fetching surfaces data.`)
	  	}
	  }

	 applyFilters(){
	 	document.getElementById('cl-val').innerText = this.refs.cloudSlider.value

		// If data is present for the lake, apply the filter
  		if(this.rawData.length){
  			// CLOUDFILTER
  			const cloudedData = this.rawData.filter(e => {return parseFloat(e.cloud) <= this.refs.cloudSlider.value})
  			
  			// DATE FILTERS
  			if(this.refs.startDate.value >= this.refs.endDate.value){
  				alert('The starting date is higher than the ending. Please change your interval.')
  			} else {
	  			const startFilter = cloudedData.filter(e => {return e.d >= this.refs.startDate.value})
	  			const endFilter = startFilter.filter(e => {return e.d <= this.refs.endDate.value})

	  			// Reassign the surfaces and dates values in the chart config
	  			this.config.data.datasets[0].data = endFilter.map(e => parseFloat(e.surface).toFixed(2))
	  			this.config.data.labels = endFilter.map(e => Date.parse(e.d))

	  			// Update the graph
	  			this.graph.update()  		
	  		}
	  	}
	  }
/*
  	cloudUpdate(val){
  		// Get the span element and update its inner text
  		document.getElementById('cl-val').innerText = val.target.value

  		// If data is present for the lake, apply the filter
  		if(this.rawData.length){

	  		// Cloud filter the initial dataset 
	  		const cloudedData = this.rawData.filter(e => {return parseFloat(e.cloud) <= val.target.value})	  		
	  		
	  		// Reassign the surfaces and dates values in the chart config
	  		this.config.data.datasets[0].data = cloudedData.map(e => parseFloat(e.surface).toFixed(2))
	  		this.config.data.labels = cloudedData.map(e => Date.parse(e.d))

	  		// Update the graph
	  		this.graph.update()
	  	}
	  }

	dateUpdate(){
		// If data is present for the lake, apply the filter
  		if(this.rawData.length){
  			if(this.refs.startDate.value >= this.refs.endDate.value){
  				alert('The starting date is higher than the ending. Please change your interval.')
  			} else {

	  		// Cloud filter the initial dataset 
	  		const startFilter = this.rawData.filter(e => {return e.d >= this.refs.startDate.value})
	  		const endFilter = startFilter.filter(e => {return e.d <= this.refs.endDate.value})
	  		
	  		// Reassign the surfaces and dates values in the chart config
	  		this.config.data.datasets[0].data = endFilter.map(e => parseFloat(e.surface).toFixed(2))
	  		this.config.data.labels = endFilter.map(e => Date.parse(e.d))

	  		// Update the graph
	  		this.graph.update()
	  	}
	  	}
	}  
*/
	  formatDates(date) {
	  	const day = date.getDate()
	  	const month = date.getMonth()+1
	  	const year = date.getFullYear()
	  	day = (day < 10 ? `0${day}` : day)
	  	month < 10 ? month = `0${month}` : month = month
	  	return `${year}-${month}-${day}`
	  }
	}
  