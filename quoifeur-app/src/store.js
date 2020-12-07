import Vue from 'vue'
import { ApiService } from '@/components/ApiService'

export const store = Vue.observable({
  overlayName: null,
  overlayDesc: {
    About: 'Les données utilisées sont issues de <a href="https://www.openstreetmap.org/">OpenStreetMap</a> et mises à jour régulièrement. Si votre commerce n\'apparaît pas et que vous n\'êtes pas satisfait.e, parce que quand même hein, ce qui est tout à fait normal, considérez participer au projet <a href="https://www.openstreetmap.org/">OpenStreetMap</a> et à l\'inclure dans la base de donnée.<br>Si vous n\'êtes pas coiffeur / coiffeuse, et bien rien de particulier.',
    Contact: 'Pour toutes réclamations, suggestions, insultes et autres, veuillez remplir le formulaire ci-dessous:'
  },
  isNavOpen: false,
  isIntroOpen: true,
  isLeftOpen: true,
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
