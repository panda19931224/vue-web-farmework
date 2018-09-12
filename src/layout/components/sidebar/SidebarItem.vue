<template>
  <div class="menu-wrapper">
    <template v-for="(item, index) in routes">
      <router-link :to="item.link" :key="index">
        <el-menu-item :index="item.link">
          <i class="axon-icon" v-html="item.icon"></i>
          <span class="column-name" v-if="item.name" slot="title">{{ item.name }}</span>
        </el-menu-item>
      </router-link>
    </template>
  </div>
</template>

<script>
export default {
  name: 'SidebarItem',
  props: {
    routes: {
      type: Array
    },
    isNest: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
  },
  methods: {
    subClick (item) {
      this.$router.push({ path: item.link })
    }
  }
}
</script>
<style lang="scss">
.menu-wrapper {
  padding-top: 40px;
  .el-menu-item {
    height: 66px;
    line-height: 66px;
  }
  .axon-icon {
    padding-right: 10px;
    font-size: 20px;
  }
  .column-name {
    font-size: 15px;
  }
  .router-link-active {
    li {
      background-color: #13161d !important;
      border-left: 3px solid #409EFF;
      span, i {
        color: #409EFF;
      }
    }
  }
}
</style>
