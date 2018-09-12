<template>
  <div class="jy-bridge-over-view-page">
    <div class="upper-part">
      <div class="left-map animated fadeInLeft">
        <div id="mapContent" class="map-content"></div>
        <div class="cover-div">
          <div class="item">
            <p class="desc">
              实时客流量
            </p>
            <p class="data">
              由南向北<span>{{todayFlowValueObj.SouthToNorth}}</span>
            <p class="data">
              由北向南<span>{{todayFlowValueObj.NorthToSouth}}</span>
            </p>
          </div>
          <div class="item">
            <p class="desc">
              今日累计客流量
            </p>
            <p class="data">
              由南向北<span>{{todayFlowValueObj.TodayNorthToSouth}}</span>
            </p>
            <p class="data">
              由北向南<span>{{todayFlowValueObj.TodaySouthToNorth}}</span>
            </p>
          </div>
        </div>
      </div>
      <div class="right-map animated fadeInRight">
        <div style="position: absolute;right: 10px;z-index: 999;">
          <el-radio-group v-model="isProvince" size="mini">
            <el-radio-button :label="false" :showDataRange="false">省外</el-radio-button>
            <el-radio-button :label="true">省内</el-radio-button>
          </el-radio-group>
        </div>
        <nation v-if="!isProvince" touristName="昨日客流来源分析" :touristData="nationData"></nation>
        <i-jiangsu-map v-else touristName="昨日客流来源分析" :data="provinceData"></i-jiangsu-map>
      </div>
    </div>
    <div class="lower-part">
      <div class="left-line-chart animated fadeInUp">
        <i-over-view-line-chart chartId="overViewLineChart" title="当日分时段客流"
                                :legendData="lineChart.legendData"
                                :xAxis="lineChart.xAxis"
                                :data="lineChart.data"></i-over-view-line-chart>
      </div>
      <div class="center-per-chart animated fadeInUp">
        <div class="change-lat">
          <el-radio-group v-model="filterForm.isAge" size="mini" @change="changeProperty">
            <el-radio-button :label="true">年龄</el-radio-button>
            <el-radio-button :label="false">性别</el-radio-button>
          </el-radio-group>
        </div>
        <i-over-view-pie-chart v-if="pieData.data.length > 0" :chartId="pieData.chartId" style="margin: 0 auto"
                               :data="pieData.data" title="昨日旅客性别年龄分布"
                               :legendData="pieData.legendData"></i-over-view-pie-chart>
      </div>
      <div class="right-line-chart animated fadeInUp">
        <i-over-view-line-no-area-chart title="昨日通行时长分布" chartId="overViewOnAreaLineChart" :data="lineNoAreaChart.data"
                                        :legendData="lineNoAreaChart.legendData"
                                        :xAxis="lineNoAreaChart.xAxis"></i-over-view-line-no-area-chart>
      </div>
    </div>
  </div>
</template>

<script>
import BMap from 'BMap'
import iOverViewLineChart from '../../../components/iEcharts/OverViewLineChart'
import iOverViewPieChart from '../../../components/iEcharts/OverViewPieChart'
import BLL from './Index'
import iOverViewLineNoAreaChart from '../../../components/iEcharts/OverViewLineNoAreaChart'
import Nation from '../../../components/iEcharts/TouristSourceAna'
import iJiangsuMap from '../../../components/iEcharts/JiangsuMap'

export default {
  components: { iJiangsuMap, iOverViewLineChart, iOverViewPieChart, iOverViewLineNoAreaChart, Nation },
  data () {
    return {
      data: [],
      todayFlowValueObj: {
        SouthToNorth: '--',
        NorthToSouth: '--',
        TodayNorthToSouth: '--',
        TodaySouthToNorth: '--'
      },
      provinceData: [], // 全省地图数据
      provinceList: [],
      nationData: [], // 全国地图数据
      isProvince: true, // 省内省外
      lineChart: {
        data: [],
        xAxis: [],
        legendData: []
      },
      pieData: {
        data: [], // 数据
        legendData: [],
        title: '',
        chartId: 'userPropertyOverView'
      },
      lineNoAreaChart: {
        data: [],
        xAxis: [],
        legendData: ['由南向北', '由北向南']
      }, // 昨日通行折线图
      filterForm: {
        isProvince: false, // 是否为省内
        isAge: true, // 年龄/性别
        date: '' // 日期
      },
      todayFlowAccumulationData: {
        todayDate: '',
        bridgeName: '江阴大桥'
      },
      setIntervalObj: null
    }
  },
  created () {
    this.BLL = new BLL(this)
    this.filterForm.date = this.$utils.Date.format(new Date(new Date().getTime() - 24 * 60 * 60 * 1000), 'yyyyMMdd')
    this.todayFlowAccumulationData.todayDate = this.$utils.Date.format(new Date(), 'yyyyMMdd')
  },
  beforeMount () {
    this.BLL.setInterval()
  },
  mounted () {
    this.initBDMap()
    this.initData()
    console.log(this.$store.state.menus.index)
  },
  computed: {},
  methods: {
    // 初始化百度地图
    initBDMap () {
      // 百度地图API功能
      // 创建Map实例
      let map = new BMap.Map('mapContent', { enableMapClick: true })
      // 初始化地图,设置中心点坐标和地图级别
      let point = new BMap.Point(120.288774, 31.934733)
      map.centerAndZoom(point, 13)
      map.enableScrollWheelZoom()
      let marker = new BMap.Marker(point)
      // 禁止拖动
      map.disableDragging()
      // 创建标注
      map.addOverlay(marker)
      marker.setAnimation(BMAP_ANIMATION_BOUNCE) // eslint-disable-line
      var ctrl = new BMapLib.TrafficControl({ // eslint-disable-line
        showPanel: false // 是否显示路况提示面板
      })
      map.addControl(ctrl)
      ctrl.setAnchor(BMAP_ANCHOR_TOP_RIGHT) // eslint-disable-line
      ctrl.showTraffic({ predictDate: { hour: 15, weekday: 5 } })
    },
    // 初始化数据
    initData () {
      // 实时客流量分析
      this.BLL.realtimeFlowAmount()
      // 昨日客流来源分析 - 外省
      this.BLL.yesterdayOutsideProvinceFlowSourceAnalysis()
      this.BLL.theDaySubPeriodFlow()
      this.BLL.yesterdayInsideProvinceFlowSourceAnalysis()
      // 昨日年龄分布
      this.BLL.yesterdayAgeDistribution()
      // 昨日通行时长分布
      this.BLL.yesterdayPassDurationDistribution()
    },
    // 切换年龄 、 性别
    changeProperty (val) {
      if (val) {
        this.BLL.yesterdayAgeDistribution()
      } else {
        this.BLL.yesterdayGenderDistribution()
      }
    }
  },
  // 离开页面之前，销毁刷新数据
  beforeRouteLeave (to, from, next) {
    if (this.setIntervalObj) {
      window.clearInterval(this.setIntervalObj)
    }
    next()
  }
}
</script>

<style lang="scss">
.jy-bridge-over-view-page {
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  width: 100%;
  $border: 4px solid #e2e2e2;
  .upper-part {
    flex: 0 0 60%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    border-bottom: $border;
    .left-map {
      flex: 0 0 60%;
      height: 100%;
      box-sizing: border-box;
      border-right: $border;
      position: relative;
      .map-content {
        width: 100%;
        height: 100%;
      }
      .cover-div {
        position: absolute;
        display: flex;
        top: 12px;
        left: 12px;
        .item {
          flex: 0 0 50%;
          width: 210px;
          height: 100px;
          padding: 6px;
          box-sizing: border-box;
          p {
            color: #ffffff;
            font-size: 13px;
            font-weight: 300;
            line-height: 20px;
            &.data {
              padding-left: 50px;
              line-height: 24px;
              span {
                padding-left: 10px;
                font-size: 20px;
                font-weight: 600;
              }
            }
          }
          &:first-child {
            background: rgb(65, 103, 184) url(../../../assets/images/bottom_icon.png) 95% bottom no-repeat;
            background-size: 38%;
            margin-right: 20px;
          }
          &:last-child {
            background: rgb(35, 134, 193) url(../../../assets/images/bottom_icon_2.png) 95% bottom no-repeat;
            background-size: 38%;
          }
        }
      }
      .anchorBL {display: none;}
      // 去掉百度地图角标
    }
    .right-map {
      flex: 0 0 40%;
      height: 100%;
      border-left: $border;
    }
  }
  .lower-part {
    flex: 0 0 40%;
    border-top: $border;
    display: flex;
    .left-line-chart {
      flex: 0 0 35%;
      border-right: $border;
    }
    .center-per-chart {
      flex: 0 0 25%;
      border-right: $border;
      border-left: $border;
      position: relative;
      .change-lat {
        position: absolute;
        right: 10px;
        bottom: 2px;
        z-index: 1000;
      }
    }
    .right-line-chart {
      border-left: $border;
      flex: 0 0 40%;
      height: 100%;
    }
  }
}
</style>
