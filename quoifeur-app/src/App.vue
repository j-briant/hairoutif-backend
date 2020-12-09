<template>
  <div id="app">
    <IntroOverlay/>
    <Overlay/>
    <nav class="main-nav">
      <a title="logo" class="logo" href="/"><img src="../dist/img/logo.png"></a>
      <a class="title" title="hairoutif" href="/"><span title="hairoutif">HAIROUTIF</span></a>
      <PanelButton title="menu"/>
    </nav>
    <body>
      <LeftPanel/>
      <Map/>
      <Sidebar>
          <menu-list/>
      </Sidebar>
    </body>
    <footer></footer>
  </div>
</template>

<script>
import Map from '@/components/Map/Map.vue'
import PanelButton from '@/components/Menu/PanelButton.vue'
import Sidebar from '@/components/Menu/SideBar.vue'
import IntroOverlay from '@/components/Intro/IntroOverlay.vue'
import MenuList from '@/components/About/MenuList.vue'
import Overlay from '@/components/About/Overlay.vue'
import LeftPanel from '@/components/LeftPanel/LeftPanel.vue'

export default {
  name: 'App',
  components: {
    Map,
    PanelButton,
    Sidebar,
    IntroOverlay,
    MenuList,
    Overlay,
    LeftPanel
  }
}
</script>

<style>

  #app {
    display: flex;
    flex-direction: column;
    position: relative;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
  }

  body {
    position: relative;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", Helvetica, Arial,
    sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width: 100%;
    height: 100%;
    margin: 0;
  }

  .main-nav {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    color: #FFF;
    position: relative;
    top: 0;
    width: 100vw;
    padding: 10px 0;
    background: #111;
    z-index: 10;
 }

 .logo > img {
    margin-left: 10px;
    width: 32px;
 }

 .title {
  color: #FFF;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.2em;
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
