import './back-button.scss'
import template from './back-button.html'
import { Component } from '../component'

/**
 * Info Panel Component
 * Download and display metadata for selected items.
 * @extends Component
 */
export class BackButton extends Component {
  /** LayerPanel Component Constructor
   * @param { Object } props.data.apiService ApiService instance to use for data fetching
   */
  constructor (placeholderId, props) {
    super(placeholderId, props, template)

     // Reset view on button click
    this.refs.butt.addEventListener('click', () => this.triggerEvent('viewReset', {}))
    }

}