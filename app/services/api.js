import { CancelToken, get } from 'axios'

/** API Wrapper Service Class */
export class ApiService {
  constructor (url = 'http://localhost:5000/') {
    this.url = url
    this.cancelToken = CancelToken.source()
  }

  async httpGet (endpoint = '') {
    this.cancelToken.cancel('Cancelled Ongoing Request')
    this.cancelToken = CancelToken.source()
    const response = await get(`${this.url}${endpoint}`, { cancelToken: this.cancelToken.token })
    return response.data
  }

  getCentroids () {
    return this.httpGet('aoi/centroids')
  }

  getAOIGeom (id) {
    return this.httpGet(`aoi/geom/${id}`)
  }

  getAOISurfaces (id) {
    return this.httpGet(`aoi/surfaces/${id}`)
  }
}