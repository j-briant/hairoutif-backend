import { CancelToken, get, post } from 'axios'

/** API Wrapper Service Class */
export class ApiService {
  constructor (url = 'http://localhost:5000/') {
    this.url = url
    this.cancelToken = CancelToken.source()
  }

  async httpGet (endpoint = '') {
    // this.cancelToken.cancel('Cancelled Ongoing Request')
    // this.cancelToken = CancelToken.source()
    const response = await get(`${this.url}${endpoint}`, { cancelToken: this.cancelToken.token })
    return response.data
  }

  async httpPost (endpoint = '', data) {
    this.cancelToken.cancel('Cancelled Ongoing Request')
    this.cancelToken = CancelToken.source()
    const response = await post(`${this.url}${endpoint}`, { cancelToken: this.cancelToken.token, d: data })
    return response
  }

  getMarkers () {
    return this.httpGet('locations')
  }

  getDescription (id) {
    return this.httpGet(`locations/desc/${id}`)
  }

  getDistribution (id) {
    return this.httpGet(`distr/${id}`)
  }

  getTop (id) {
    return this.httpGet(`top/${id}`)
  }

  getRegions () {
    return this.httpGet('regions')
  }

  postForm (data) {
    return this.httpPost('form', data)
  }
}
