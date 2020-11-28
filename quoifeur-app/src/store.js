import Vue from 'vue'

export const store = Vue.observable({
  isNavOpen: false
})

export const mutation = {
  toggleNav () {
    store.isNavOpen = !store.isNavOpen
  }
}
