<template>
  <div class="navbar">
    <div class="title-logo">
      <!--<img src="../../assets/images/n_logo.png"/>-->
      <p class="title">{{ title }}</p>
      <p>
        <span>客情大数据监测与分析平台</span>
        <span>Big data monitoring and analysis platform</span>
      </p>
    </div>
    <div class="first-menus">
      <div class="content">
        <template v-for="(item, key) in menus">
          <div :class="activeColumn === item.id? 'menus-item active' :'menus-item'" :key="key"
               @click="changeColumn(item)">{{item.name}}
          </div>
        </template>
        <div class="close" @click="close()" v-show="false">
          <span class="axon-icon" v-html="'&#xe612;'"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Breadcrumb from '../../components/Breadcrumb'
import Hamburger from '../../components/Hamburger'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data () {
    return {}
  },
  computed: {
    ...mapState({
      menus: ({ menus }) => menus.list.sort((a, b) => { return a.id - b.id > 0 }),
      activeColumn: ({ menus }) => menus.activeColumn
    }),
    // 标题
    title () {
      return this.menus.find(_x => _x.id === this.activeColumn).name
    }
  },
  methods: {
    // 切換板塊
    changeColumn (item) {
      try {
        this.$store.dispatch('set_active_colume', item.id)
        let route = this.menus.find(_x => _x.id === this.activeColumn).children[0].link
        this.$router.push({
          path: route
        })
      } catch (e) {
        this.$notify.error({
          title: '错误',
          message: '跳转失败，请稍后再试'
        })
      }
    },
    // 关闭平台
    close () {
      this.$message.warning({ message: '平台正在运行，请勿关闭！' })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "../../styles/font";

.navbar {
  height: 60px;
  width: 100%;
  display: flex;
  background-color: #ffffff;
  justify-content: center;
  top: 0;
  box-shadow: 0px 1px 1px #ccc;
  z-index: 100;
  .title-logo {
    flex: 0 0 45%;
    position: relative;
    padding: 0 20px;
    p {
      &.title {
        font-size: $font-size-xxxxl;
        padding-left: 10px;
        line-height: 60px;
      }
      &:not(.title) {
        padding-top: 17px;
        padding-bottom: 11px;
        padding-left: 6px;
        font-size: 13px;
      }
      span {
        display: block;
      }
    }

    img {
      width: 40px;
      margin-top: 13px;
    }
    p, img {
      float: left;
    }
  }
  .first-menus {
    flex: 0 0 55%;
    .content {
      width: 540px;
      float: right;
      display: flex;
      justify-content: center;
      line-height: 60px;
      text-align: center;
      .menus-item {
        flex: 0 0 25%;
        cursor: pointer;
        &.active {
          background-color: #409eff;
          color: #ffffff;
        }
      }
      .close {
        flex: 0 0 60px;
        cursor: pointer;
        text-align: center;
        border-left: 1px solid #ccc;
        &:hover {
          background: #f56c6c;
          border-color: #f56c6c;
          color: #fff;
        }
      }
    }
  }
}
</style>
