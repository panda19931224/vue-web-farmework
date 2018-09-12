<template>
  <div class="app-wrapper">
    <sidebar class="sidebar-container"></sidebar>
    <div class="main-container">
      <navbar></navbar>
      <app-main></app-main>
    </div>
  </div>
</template>

<script type="">
import { Navbar, Sidebar, AppMain } from './components/Index'

export default {
  name: 'layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  computed: {}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "../styles/mixin.scss";

.app-wrapper {
  position: relative;
  height: 100%;
  background-color: #edf1f4;
  .main-container {
    width: calc(#{"100% - 180px"});
    height: 100%;
    position: relative;
  }
}
</style>
