<template>
  <div id="app">
    <IntroOverlay></IntroOverlay>
    <nav class="main-nav">
      <PanelButton></PanelButton>
    </nav>
    <AboutOverlay></AboutOverlay>
    <Sidebar>
      <ul class="sidebar-panel-nav">
        <about-list>About</about-list>
        <li>Contact</li>
      </ul>
    </Sidebar>
    <body>
      <Map></Map>
    </body>
  </div>
</template>

<script>
import Map from '@/components/Map/Map.vue'
import PanelButton from '@/components/Menu/PanelButton.vue'
import Sidebar from '@/components/Menu/SideBar.vue'
import IntroOverlay from '@/components/Intro/IntroOverlay.vue'
import AboutList from '@/components/About/AboutList.vue'
import AboutOverlay from '@/components/About/AboutOverlay.vue'

export default {
  name: 'App',
  components: {
    Map,
    PanelButton,
    Sidebar,
    IntroOverlay,
    AboutList,
    AboutOverlay
  }
}
</script>

<style>
  body {
    display: flex;
    flex-direction: row;
    overflow: hidden;
    width: 100vw;
    height: 100vh;
    margin: 0;
    font-family: 'Arial';
  }

  .main-nav {
    display: flex;
    flex-direction: row-reverse;
    position: absolute;
    top: 0;
    width: 100vw;
    padding: 10px 0rem;
    background: #111;
    z-index: 10;
 }

 ul.sidebar-panel-nav {
  padding: 0em;
  margin: 0
}

ul.sidebar-panel-nav > li {
  color: #fff;
  text-decoration: none;
  font-size: 1.3rem;
  display: block;
  padding-left: 1em;
  padding-top: 5px;
  padding-bottom: 5px
}

ul.sidebar-panel-nav > li:hover {
  background: #FFF;
  color: #222;
  cursor: pointer;
}

</style>
