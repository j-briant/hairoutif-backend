<template>
  <div id="descContainer">
    <div id="title"><h1>{{name}}</h1></div>
    <div id="adresse">{{adresse}}, {{pCode}}, {{city}}</div>
    <div id="website">{{website}}</div>
  </div>
</template>

<script>
import { bus } from '../main'

export default {
  name: 'info-panel',
  data () {
    return {
      name: null,
      adresse: null,
      pCode: null,
      city: null,
      website: null
    }
  },
  created () {
    bus.$on('markerClicked', (desc) => {
      console.log(desc)
      this.name = desc.name
      this.adresse = desc['addr:street']
      this.pCode = desc['addr:postcode']
      this.city = desc['addr:city']
      this.website = desc.website
    })
  }
}

</script>

<style>
  #descContainer {
    position: absolute;
    display: flex;
    flex-direction: column;
    width: 30%;
    z-index: 1000;
    bottom: 20px;
    left: 20px;
    border: 3px #C75C5C solid;
    border-radius: 4px;
    background: #faebd7;
    color: #C75C5C;
    text-align: center;
    font-family: 'Lato', sans-serif;
  }
</style>
