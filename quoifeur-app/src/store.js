import Vue from 'vue'
import { ApiService } from '@/components/ApiService'

export const store = Vue.observable({
  overlayName: null,
  overlayDesc: {
    About: 'Les données utilisées sont issues de <a class="osm-link" href="https://www.openstreetmap.org/">OpenStreetMap</a> et mises à jour régulièrement. Si votre commerce n\'apparaît pas et que vous n\'êtes pas satisfait.e, parce que quand même hein, considérez participer au projet <a class="osm-link" href="https://www.openstreetmap.org/">OpenStreetMap</a> et à l\'inclure dans la base de donnée.<br>Les noms sont extraits automatiquement s\'ils inclus les termes \'tif\' et \'hair\', certains n\'ont aucun jeu de mot et nous nous excusons pour cela.<br>En vous souhaitant de tomber sur les perles rares.',
    Contact: 'Pour toutes réclamations, suggestions, insultes et autres, veuillez remplir le formulaire ci-dessous:'
  },
  isNavOpen: false,
  isIntroOpen: true,
  isLeftOpen: false,
  isOverlayOpen: {
    About: false,
    Contact: false
  },
  api: null
})

export const mutation = {
  toggleNav () {
    store.isNavOpen = !store.isNavOpen
  },
  removeOverlay () {
    store.isIntroOpen = false
    for (const o in store.isOverlayOpen) { store.isOverlayOpen[o] = false }
  },
  toggleOverlay (val) {
    store.isOverlayOpen[String(val)] = !store.isOverlayOpen[String(val)]
    store.overlayName = String(val)
  },
  toggleLeft () {
    store.isLeftOpen = !store.isLeftOpen
  }
}

export const utils = {
  initializeApi () {
    // Initialize API service
    if (window.location.hostname === 'localhost') {
      store.api = new ApiService('http://localhost:5000/')
    } else {
      store.api = new ApiService('http://localhost:5000/')
    }
  }
}
