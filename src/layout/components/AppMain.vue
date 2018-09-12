<template>
  <section class="app-main">
    <transition name="fade" mode="out-in">
      <keep-alive>
        <router-view :key="$route.path"></router-view>
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {}
}
</script>
<style lang="scss">
</style>
