<template>
  <div class="wrapper">
    <div class="slide">
      <p>INFO</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'left-panel',
  data () {
  }
}
</script>

<style>
p {
  height: 100%;
  writing-mode: vertical-rl;
  text-orientation: upright;
  text-align: center;
}
p:hover {
  cursor: pointer;
}

.wrapper {
    position: absolute;
    z-index: 1000;
    overflow: hidden;
    width: 100px;
    height: 100vh;
}

.slide {
    position: absolute;
    float: right;
    left: -50px;
    width: 100px;
    height: 100vh;
    background: #222;
    transition: 0.3s;
}

.wrapper:active .slide {
    transition: 0.3s;
    left: 0;
}

</style>
