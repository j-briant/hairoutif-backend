import './sertit-logo.scss'
import { Component } from '../component'
import template from './sertit-logo.html'

/**
 * Leaflet Map Component
 * Render GoT map items, and provide user interactivity.
 * @extends Component
 */
 export class Logo extends Component {
  /** Map Component Constructor
   * @param { String } placeholderId Element ID to inflate the map into
   * @param { Object } props.events.click Map item click listener
   */
   constructor (logoPlaceholderId, props) {
    super(logoPlaceholderId, props, template)
  }
}