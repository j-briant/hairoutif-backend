<template>
  <div id="app">
    <nav class="main-nav">
      <PanelButton></PanelButton>
    </nav>
    <!--
    <back-button></back-button>
    <Bar></Bar>
    <info-panel></info-panel>-->
    <Sidebar>
      <ul class="sidebar-panel-nav">
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </Sidebar>
    <body>
      <Map></Map>
    </body>
  </div>
</template>

<script>
import Map from '@/components/Map.vue'
// import BackButton from '@/components/BackButton.vue'
// import InfoPanel from '@/components/InfoPanel.vue'
// import Bar from '@/components/Bar.vue'
import PanelButton from '@/components/PanelButton.vue'
import Sidebar from '@/components/SideBar.vue'

export default {
  name: 'App',
  components: {
    // Bar,
    Map,
    // BackButton,
    // InfoPanel,
    PanelButton,
    Sidebar
  }
}
</script>

<style>
  body {
    display: block;
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

ul.sidebar-panel-nav > li > a {
 color: #fff;
 text-decoration: none;
 font-size: 1.3rem;
 display: block;
 padding-bottom: 0.6em;
}

li {
  padding-left: 0em;
}

li:hover > a:hover {
  background: #FFF;
  color: #111;
}

a {
  padding-left: 1em;
  padding-top: 5px;
  padding-bottom: 5px
}

</style>
