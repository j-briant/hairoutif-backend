import Vue from 'vue'

export const store = Vue.observable({
  isNavOpen: false,
  isOverlayOpen: true,
  isAboutOpen: false
})

export const mutation = {
  toggleNav () {
    store.isNavOpen = !store.isNavOpen
  },
  removeOverlay () {
    store.isOverlayOpen = false
  },
  toggleAbout () {
    store.isAboutOpen = !store.isAboutOpen
  }
}
