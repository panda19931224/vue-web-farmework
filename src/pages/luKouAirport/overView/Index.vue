<template>
  <div class="lukou-airport-over-view-page">
    <div class="upper-part">
      <div class="left-map animated fadeInLeft">
        <div id="mapContent" class="map-content"></div>
        <div class="cover-div">
          <div class="item">
            <p class="desc">
              实时客流量
            </p>
            <p class="data">
              <count-to class="card-panel-num" :startVal="0"
                        :endVal="realtimeFlow.realtimeFlow"
                        :decimals=0
                        :duration="1000"></count-to>
            </p>
          </div>
          <div class="item">
            <p class="desc">
              今日累计客流量
            </p>
            <p class="data">
              <count-to class="card-panel-num" :startVal="0"
                        :endVal="realtimeFlow.cumulativeFlow"
                        :decimals=0
                        :duration="1000"></count-to>
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
        <i-over-view-line-no-area-chart title="昨日停留时长分布" chartId="overViewOnAreaLineChart" :data="lineNoAreaChart.data"
                                        :legendData="lineNoAreaChart.legendData"
                                        :xAxis="lineNoAreaChart.xAxis"></i-over-view-line-no-area-chart>
      </div>
    </div>
  </div>
</template>

<script>
import BMap from 'BMap'
import iOverViewLineNoAreaChart from '../../../components/iEcharts/OverViewLineNoAreaChart'
import iOverViewLineChart from '../../../components/iEcharts/OverViewLineChart'
import iOverViewPieChart from '../../../components/iEcharts/OverViewPieChart'
import BLL from './Index'
import Nation from '../../../components/iEcharts/TouristSourceAna'
import iJiangsuMap from '../../../components/iEcharts/JiangsuMap'

const CountTo = () => import('vue-count-to')
export default {
  components: { CountTo, iJiangsuMap, iOverViewLineChart, iOverViewPieChart, iOverViewLineNoAreaChart, Nation },
  data () {
    return {
      filterForm: {
        isProvince: false, // 是否为省内
        isAge: true, // 年龄/性别
        date: '', // 日期
        validDate: '' // 有效日期
      },
      data: [],
      provinceData: [], // 全省地图数据
      provinceList: [],
      nationData: [], // 全国地图数据
      isProvince: true,
      realtimeFlow: {
        realtimeFlow: 0,
        cumulativeFlow: 0
      }, // 实时客流量
      lineChart: {
        data: [],
        xAxis: [],
        legendData: []
      }, // 当日分时段客流
      pieData: {
        data: [], // 数据
        legendData: [],
        title: '',
        chartId: 'userPropertyOverView'
      },
      lineNoAreaChart: {
        data: [],
        xAxis: [],
        legendData: []
      }, // 昨日通行折线图
      legendData: ['昨日停留时长'],
      setIntervalObj: null
    }
  },
  created () {
    this.BLL = new BLL(this)
    this.BLL.realtimeFlowAmount()
  },
  beforeMount () {
    this.BLL.setInterval()
  },
  mounted () {
    this.initBDMap()
    this.initData()
  },
  computed: {},
  methods: {
    // 初始化百度地图
    initBDMap () {
      // 百度地图API功能
      // 创建Map实例
      let map = new BMap.Map('mapContent', { enableMapClick: true })
      // 初始化地图,设置中心点坐标和地图级别
      let point = new BMap.Point(118.889045, 31.744269)
      map.centerAndZoom(point, 14)
      let marker = new BMap.Marker(point)
      // 禁止拖动
      map.disableDragging()
      // 创建标注
      map.addOverlay(marker)
      marker.setAnimation(BMAP_ANIMATION_BOUNCE) // eslint-disable-line
      let ctrl = new BMapLib.TrafficControl({ // eslint-disable-line
        showPanel: false // 是否显示路况提示面板
      })
      map.addControl(ctrl)
      ctrl.setAnchor(BMAP_ANCHOR_TOP_RIGHT) // eslint-disable-line
      ctrl.showTraffic({ predictDate: { hour: 15, weekday: 5 } })
    },
    // 初始化数据
    initData () {
      this.BLL.ageDistribution()
      // this.BLL.flowSourceInsideProvince()
      // this.BLL.flowSourceOutsideProvince()
      this.BLL.stayDuration()
      this.BLL.onTimeFlowAmount()
      this.BLL.flowSourceOutsideProvince()
      this.BLL.flowSourceInsideProvince()
    },
    changeProperty (val) {
      if (val) {
        this.BLL.ageDistribution()
      } else {
        this.BLL.genderDistribution()
      }
    }
  },
  // 销毁
  beforeRouteLeave (to, from, next) {
    if (this.setIntervalObj) {
      window.clearInterval(this.setIntervalObj)
    }
    next()
  }
}
</script>

<style lang="scss">
.lukou-airport-over-view-page {
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
              line-height: 46px;
              .card-panel-num {
                padding-left: 10px;
                font-size: 30px;
                font-weight: 600;
              }
            }
          }
          &:first-child {
            /*background-color: rgba(65, 103, 184, 0.9);*/
            margin-right: 20px;
            background: rgb(65, 103, 184) url(../../../assets/images/wave.png) 95% bottom no-repeat;
            background-size: 100%;
          }
          &:last-child {
            background: rgb(35, 134, 193) url(../../../assets/images/wave.png) 95% bottom no-repeat;
            background-size: 100%;
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
