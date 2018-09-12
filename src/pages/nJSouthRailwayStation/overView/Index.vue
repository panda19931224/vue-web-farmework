<template>
  <div class="dashboard-editor-container" style="height: 90vh;background: #edf1f3;margin: -12px 0 0 -12px">
    <el-row style="width: 101%;">
      <div class="left">
        <el-col class="left-part" :span="11">
          <div class="nav_left">
            <div class="nan_left_top">
              <div style="padding-bottom:0.5rem;width:49.5%;height:100%;float:left;">
                <div class="nan_left_top_l">
                  <div class="keliu_name">实时客流</div>
                  <div class="keliu_val">{{realTimePassengerFlow[0]}}</div>
                </div>
              </div>
              <div style="padding-bottom:0.5rem;width:49.5%;height:100%;float:right;">
                <div class="nan_left_top_r">
                  <div class="keliu_name">昨日客流</div>
                  <div class="keliu_val">{{yesterdayPassengerFlow[0]}}</div>
                </div>
              </div>
            </div>
            <div class="nan_left_middle">
              <fld :fldDataX="fldDataX" :fldDataY="fldDataY"></fld>
            </div>
            <div class="nan_left_bottom">
              <span class="nan_left_bottom_tit">昨日游客性别、年龄分布</span>
              <div style="width:50%;height:100%;float:left;">
                <n-indexPieChart :chart-id="age" :pieBarData="pieBarDataAge"></n-indexPieChart>
              </div>
              <div style="width:50%;height:100%;float:left;">
                <n-indexPieChart :chart-id="sex" :pieBarData="pieBarDataSex"></n-indexPieChart>
              </div>
            </div>
          </div>
        </el-col>
        <el-col class="right-part" :span="7">
          <div style="padding:0.5rem;height:88.8vh;">
            <div class="nan_middle_top">
              <div style="position: absolute;right: 10px;z-index: 999;">
                <el-radio-group v-model="isProvince" size="mini">
                  <el-radio-button :label="false" :showDataRange="false">省外</el-radio-button>
                  <el-radio-button :label="true">省内</el-radio-button>
                </el-radio-group>
              </div>
              <nation v-if="!isProvince" touristName="昨日客流来源分析" :touristData="nationData"></nation>
              <jiangsu-map v-else touristName="昨日客流来源分析" :data="jiangsuData"></jiangsu-map>
            </div>
            <div class="nan_middle_bottom">
              <i-l-bar :xAxis="(isProvince ? jiangsuData.map(item => item.name.slice(0, item.name.length - 1)) : nationData.map(item => item.name))"
                       :yAxis="(isProvince ? jiangsuData.map(item => item.value) : nationData.map(item => item.value))"></i-l-bar>
            </div>
          </div>
        </el-col>
      </div>
      <el-col :span="6" class="right" style="background: #e2e2e2;">
        <div class="mapTit">
          <p>南京南站平面示意图</p>
          <el-switch
            style="position:absolute;right:0.5rem;top:1rem;"
            v-model="value3"
            active-text="探针">
          </el-switch>
        </div>
        <div class="mapBox"
             :style="{background: 'url(' + require(value3 === true ? '../../../assets/images/nstation_map_all.png' : '../../../assets/images/nstation_map_null.png') + ')center no-repeat'}">
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import LineChart from './components/LineChart'
import fld from './components/FoldLineDiagram.vue'
import iLBar from './components/iLBar.vue'
import CountTo from 'vue-count-to'
import BarChart from './components/BarChart'
import nIndexPieChart from './components/nIndexPieChart'
import GradientBarChart from './components/GradientBarChart'
import Json from '../../../../static/json/data/NJSorthRailwayStation'
import Nation from '../../../components/iEcharts/TouristSourceAna'
import jiangsuMap from '../../../components/iEcharts/JiangsuMap'
import BLL from './Index'

export default {
  components: {
    LineChart,
    nIndexPieChart,
    BarChart,
    GradientBarChart,
    CountTo,
    fld,
    iLBar,
    jiangsuMap,
    Nation
  },
  data () {
    return {
      filterForm: {
        date: '' // 日期
      },
      data: Json,
      passengerFlow: [],
      realTimePassengerFlow: [],
      yesterdayPassengerFlow: [],
      fldDataX: [],
      fldDataY: [],
      pieBarDataSex: [],
      pieBarDataAge: [],
      nationData: [],
      nationDataBar: [],
      pieBarData: [],
      jiangsuData: [],
      isProvince: true,
      n: 1,
      age: 'age',
      sex: 'sex',
      value3: true
    }
  },
  created () {
    this.BLL = new BLL(this)
    this.filterForm.date = this.$utils.Date.format(new Date(new Date().getTime() - 24 * 60 * 60 * 1000), 'yyyy-MM-dd')
  },
  mounted () {
    this.initData()
    this.initNationData()
  },
  computed: {},
  methods: {
    initNationData () {
      this.BLL.getRealTimeFlow()
      this.BLL.getYesterdayIndexRealTime()
      this.BLL.getIndexFlowOnTime()
      this.BLL.getIndexYesterdayTouristAgeAnalysis()
      // this.BLL.getYesterdayTouristTraceAnalysisIn()
      // this.BLL.getYesterdayTouristTraceAnalysisOut()
      this.BLL.getIndexYesterdayTouristSexAnalysis()
      this.BLL.flowProvDay()
      this.BLL.flowCityDay()
    },
    // 根据日期筛选
    changeDate (val) {
      this.filterForm.date = this.$utils.Date.format(new Date(val.getTime()), 'yyyy-MM-dd')
      this.initNationData()
    },
    // 初始化数据
    initData () {
      // this.passengerFlow.push(this.data[2].value[0].yesterdayPassengerFlow, this.data[2].value[1].todayPassengerFlow)
      // this.data[3].value && this.data[3].value.map(item => this.fldDataX.push(item.dayTime))
      // this.data[3].value && this.data[3].value.map(item => this.fldDataY.push(item.dayTimePassengerFlow))
      // this.data[4].value && this.data[4].value.map(item => this.pieBarDataAge.push(item))
      // this.data[5].value && this.data[5].value.map(item => this.pieBarDataSex.push(item))
      // this.data[6].value && this.data[6].value.map(item => this.jiangsuData.push(item))
      // this.data[11].value && this.data[11].value.map(item => this.nationData.push(item))
    }
  }
}
</script>

<style lang="scss">
.nj-source-railway-station-index-page {
  background-color: #edf1f3;
  display: flex;
  justify-content: center;
  height: 100%;
  width: 100%;
  .left {
    flex: 0 0 70%;
    position: relative;
    height: 100%;
    display: flex;
    .left-part {
      flex: 0 0 55%;
    }
    .right-part {
      flex: 0 0 45%;
    }
  }
  .right {
    flex: 0 0 30%;
    height: 100%;
    /*background: #e2e2e2;*/
  }
}

div:before {
  display: table;
  content: '';
}

.nav_left {
  height: 100%;
  padding: 0.5rem 0;
}

.nan_left_top {
  width: 100%;
  height: 20vh;
  /*padding:0.5rem 0.2rem;*/
  .keliu_name {
    text-align: left;
    padding-left: 1rem;
    font-size: 1rem;
    color: #fff;
    margin: 8%;
  }
  .keliu_val {
    height: 58%;
    text-align: center;
    padding-left: 1rem;
    font-size: 35px;
    color: #fff;
    font-weight: bold;
  }
}

.nan_left_top_l, .nan_left_top_r {
  height: 100%;
  width: 100%;
}

.nan_left_top_l {
  background: #4167b8;
}

.nan_left_top_r {
  background: #2486c0;
}

.nan_left_middle {
  height: 33vh;
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  background: #fff;
}

.nan_left_bottom {
  height: 33vh;
  padding: 0.5rem;
  position: relative;
  background: #fff;
}

.nan_left_bottom_tit {
  position: absolute;
  top: 1rem;
  left: 1rem;
}

.nan_left_top_l .keliu_val {
  background: url(../../../assets/images/wave.png) no-repeat bottom center;
  background-size: 100%;
}

.nan_left_top_r .keliu_val {
  background: url(../../../assets/images/wave.png) no-repeat bottom center;
  background-size: 100%;
}

.nan_middle_top {
  height: 60%;
  position: relative;
  background: #fff;
}

.nan_middle_bottom {
  height: 40%;
  background: #fff;
  overflow: hidden;
  text-align: center;
  position: relative;
}

.right {
  /*background: #e2e2e2;*/
}

.mapTit {
  height: 8vh;
  position: relative;
  text-align: center;
}

.mapBox {
  height: 80.8vh;
  padding: 0.5rem;
  background-size: contain !important;
}

.mapTit p {
  display: inline-block;
  margin-top: 18px;
}

.map {
  height: 30%;
  margin-top: 5%;
}

.mapBox .map:nth-child(1) {
  background: url(../../../assets/images/nstation_map.png) no-repeat;
  background-size: 100% 100%;
}

.mapBox .map:nth-child(2) {
  background: url(../../../assets/images/nstation_map_2.png) no-repeat;
  background-size: 100% 100%;
}

.mapBox .map:nth-child(3) {
  background: url(../../../assets/images/nstation_map_3.png) no-repeat;
  background-size: 100% 100%;
}
</style>
