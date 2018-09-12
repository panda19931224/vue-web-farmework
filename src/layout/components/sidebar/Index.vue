<template>
  <div>
    <scroll-bar class="scroll-bar">
      <el-menu mode="vertical" :default-active="$route.path"
               background-color="#304156" text-color="#bfcbd9" :router="false" :unique-opened="true"
               active-text-color="#409EFF">
        <sidebar-item :routes="filterMenus"></sidebar-item>
      </el-menu>
    </scroll-bar>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SidebarItem from './SidebarItem'
import ScrollBar from '../../../components/ScrollBar'

export default {
  components: { SidebarItem, ScrollBar },
  created () {
  },
  computed: {
    ...mapState({
      menus: ({ menus }) => menus.list,
      activeColumn: ({ menus }) => menus.activeColumn
    }),
    // 取当前路由的index
    getMenusIndex () {
      try {
        let children = this.menus.find(_x => _x.id === this.activeColumn).children
        let index = children.find(_y => _y.link === this.$route.path).id
        return index.toString()
      } catch (e) {
      }
      return '0'
    },
    // 过滤当前模块menus
    filterMenus () {
      let activeMenus = []
      try {
        let _column = this.activeColumn
        let _path = this.$route.path
        if (this.activeColumn === 0) {
          if (_path.indexOf('nJSorthRailwayStation/') > -1) {
            _column = 1
          } else if (_path.indexOf('luKouAirport/') > -1) {
            _column = 2
          } else if (_path.indexOf('secondeBridge/') > -1) {
            _column = 3
          } else if (_path.indexOf('jyBridge/') > -1) {
            _column = 4
          }
          this.$store.dispatch('set_active_colume', _column)
        }
        // 根据当前路由地址，取的menu
        if (this.menus.length > 0) {
          activeMenus = this.menus.find(_x => _x.id === _column).children
        }
      } catch (e) {
        activeMenus.length = 0
      }
      return activeMenus
    }
  }
}
</script>
<style lang="less">
.scroll-bar {
  position: fixed !important;
  top: 0;
  width: 180px !important;
}
</style>
