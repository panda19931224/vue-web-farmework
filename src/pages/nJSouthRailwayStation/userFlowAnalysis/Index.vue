<template>
  <div class="user-flow-analysis-page">
    <!--region --><!--endregion-->
    <el-row style="height: 89.5vh;width: 101%;">
      <div class="left animated fadeInLeft">
        <el-col class="left-part" :span="18" style="padding:0.5rem 1rem;">
          <div class="analysis_con_half">
            <div class="queryDate" v-if="false">
              <el-date-picker
                v-model="dataValue"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </div>
            <el-row>
              <el-col :span="12">
                <div class="analysis_con_half_chart">
                  <div class="analysis_con_half_chart_tit">
                    <div class="keliu_name">南京南站昨日客流：<p style="font-size: 35px;display: inline-block;">
                    {{yesterdayPassengerFlow[0]}}</p></div>
                    <!--<div class="keliu_val">{{passengerFlow[1]}}</div>-->
                  </div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="analysis_con_half_chart2">
                  <div class="analysis_con_half_chart_tit">
                    <!--<div class="keliu_name">昨日客流：<p style="font-size: 35px;display: inline-block;">-->
                      <!--{{yesterdayPassengerFlow[0]}}</p></div>-->
                    <div class="keliu_name">场站昨日客流：<p style="font-size: 35px;display: inline-block;">
                      {{terminalYesterdayPassengerFlow}}</p></div>
                    <!--<div class="keliu_val">{{passengerFlow[0]}}</div>-->
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <div class="analysis_con_half_chart">
                  <div class="analysis_con_half_chart_con">
                    <n-bar :xAxis="dailyWaitingTime.map(item => item.date)"
                           :fldData="dailyWaitingTime.map(item => item.time)" v-if="isDailyWaitingTime"></n-bar>
                  </div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="analysis_con_half_chart2">
                  <div class="analysis_con_half_chart_con">
                    <fld :yeterdayPassenger="yeterdayPassenger" v-if="isYeterdayPassenger"></fld>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <div class="analysis_con_half_bottom_chart">
                  <div class="analysis_con_half_chart_con">
                    <brokenLine :holidayPassenger="holidayPassenger" v-if="isHolidayPassenger"></brokenLine>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </div>
      <div class="right animated fadeInRight" style="background: #e2e2e2;">
        <el-col class="left-part" :span="1" style="height:90vh;background: #e2e2e2;margin-top: -12px;">
          <template v-for="(item, index) in Transportation">
            <div :class="item == spec ? 'attr_icon active' : 'attr_icon'" :key="index" @click="clickChange(item)">
              <i></i>
              <h5>{{item}}</h5>
            </div>
          </template>
        </el-col>
        <el-col class="right-part" :span="5" style="height:90vh;background: #e2e2e2;margin-top: -12px;">
          <div class="analysis_con_half">
            <div class="mapTit2">
              <p>南京南站平面示意图</p>
              <el-switch
                style="position:absolute;right:10px;top:40px;"
                active-text="探针"
                v-model="value3">
              </el-switch>
            </div>
            <!--<div class="mapBox2" ref="mapBox2"-->
                 <!--:style="{background: 'url(' + require(value3 === true ? '../../../assets/images/subway.png' : '../../../assets/images/subwayClose.png') + ')center no-repeat'}">-->
            <!--</div>-->
            <div class="mapBox2" ref="mapBox2"
                 :style="{background: value3 === true ? mapBoxBgActive : mapBoxBg}">
            </div>
          </div>
        </el-col>
      </div>
    </el-row>
  </div>
</template>

<script>
import nBar from './components/nBar.vue'
import fld from './components/FoldLineDiagram.vue'
import brokenLine from './components/brokenLine.vue'
import CountTo from 'vue-count-to'
import BLL from './Index'

export default {
  components: {
    CountTo,
    nBar,
    fld,
    brokenLine
  },
  data () {
    return {
      isHolidayPassenger: true,
      isYeterdayPassenger: true,
      isDailyWaitingTime: true,
      data: [],
      mapBoxBgActive: 'url(' + require('../../../assets/images/subway.png') + ') no-repeat',
      mapBoxBg: 'url(' + require('../../../assets/images/subwayClose.png') + ') no-repeat',
      passengerFlow: [],
      dailyWaitingTime: [],
      yeterdayPassenger: [],
      yesterdayPassengerFlow: [],
      realTimePassengerFlow: [],
      holidayPassenger: [],
      terminalYesterdayPassengerFlow: '111111',
      Transportation: ['高铁', '大巴', '公交', '地铁', '东出租车场', '西出租车场'],
      dataValue: '',
      spec: '地铁', // 当前点击的是那个站点
      value3: true,
      chartId: 'bn',
      fldData: [
        {
          name: '邮件营销',
          type: 'line',
          stack: '总量',
          lineStyle: {
            normal: {
              color: '#938337'
            }
          },
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: '联盟广告',
          type: 'line',
          stack: '总量',
          lineStyle: {
            normal: {
              color: '#4588D6'
            }
          },
          data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
          name: '视频广告',
          type: 'line',
          stack: '总量',
          lineStyle: {
            normal: {
              color: '#379392'
            }
          },
          data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
          name: '直接访问',
          type: 'line',
          stack: '总量',
          lineStyle: {
            normal: {
              color: '#B8498A'
            }
          },
          data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
          name: '搜索引擎',
          type: 'line',
          stack: '总量',
          lineStyle: {
            normal: {
              color: '#6C49B8'
            }
          },
          data: [820, 932, 901, 934, 1290, 1330, 1320]
        }
      ]
    }
  },
  created () {
    this.BLL = new BLL(this)
  },
  mounted () {
    this.BLL.getRealTimeFlow()
    this.BLL.getYesterdayIndexRealTime()
    this.BLL.getLastWeekWaitDuration()
    this.BLL.getYesterdayFlowOnTime()
    this.BLL.getHolidayFlowContrast()
    this.BLL.getTerminalYesterdayIndexRealTime(this.spec)
  },
  computed: {},
  methods: {
    // 获取切换站点
    clickChange (param) {
      if (param === '东出租车场') {
        this.spec = '东出租车场'
        this.mapBoxBgActive = 'url(' + require('../../../assets/images/taxiEast.png') + ') no-repeat'
        this.mapBoxBg = 'url(' + require('../../../assets/images/taxiEastClose.png') + ') no-repeat'
      } else if (param === '西出租车场') {
        this.spec = '西出租车场'
        this.mapBoxBgActive = 'url(' + require('../../../assets/images/taxiWest.png') + ') no-repeat'
        this.mapBoxBg = 'url(' + require('../../../assets/images/taxiWestClose.png') + ') no-repeat'
      } else if (param === '高铁') {
        this.spec = param
        this.mapBoxBgActive = 'url(' + require('../../../assets/images/highSpeedRail.png') + ') no-repeat'
        this.mapBoxBg = 'url(' + require('../../../assets/images/highSpeedRailClose.png') + ') no-repeat'
      } else if (param === '地铁') {
        this.spec = param
        this.mapBoxBgActive = 'url(' + require('../../../assets/images/subway.png') + ') no-repeat'
        this.mapBoxBg = 'url(' + require('../../../assets/images/subwayClose.png') + ') no-repeat'
      } else if (param === '公交') {
        this.spec = param
        this.mapBoxBgActive = 'url(' + require('../../../assets/images/traffic.png') + ') no-repeat'
        this.mapBoxBg = 'url(' + require('../../../assets/images/trafficClose.png') + ') no-repeat'
      } else if (param === '大巴') {
        this.spec = param
        this.mapBoxBgActive = 'url(' + require('../../../assets/images/bus.png') + ') no-repeat'
        this.mapBoxBg = 'url(' + require('../../../assets/images/busClose.png') + ') no-repeat'
      }
      this.BLL.getRealTimeFlow()
      this.BLL.getYesterdayIndexRealTime()
      this.BLL.getLastWeekWaitDuration()
      this.BLL.getYesterdayFlowOnTime()
      this.BLL.getHolidayFlowContrast()
      // console.log(param)
      this.BLL.getTerminalYesterdayIndexRealTime(param)
    }
  }
}
</script>

<style lang="scss">
div:before {
  display: table;
  content: '';
}

.analysis_con_half {
  /*padding:0.5rem;*/
}

.queryDate {
  text-align: right;
  padding-bottom: 0.5rem;
}

.analysis_con_half_chart {
  padding-right: 0.25rem;
}

.analysis_con_half_chart2 {
  padding-left: 0.25rem;
}

.analysis_con_half_chart .analysis_con_half_chart_tit {
  height: 8vh;
  background: url(../../../assets/images/ana_tit_k.png) no-repeat;
  background-size: 100% 100%;
}

.analysis_con_half_chart2 .analysis_con_half_chart_tit {
  height: 8vh;
  background: url(../../../assets/images/ana_tit_y.png) no-repeat;
  background-size: 100% 100%;
}

.analysis_con_half_chart .analysis_con_half_chart_con {
  height: 32vh;
  margin-top: 0.5rem;
  background: #fff;
}

.analysis_con_half_chart2 .analysis_con_half_chart_con {
  height: 32vh;
  margin-top: 0.5rem;
  background: #fff;
}

.analysis_con_half_bottom_chart .analysis_con_half_chart_con {
  height: 39vh;
  margin-top: 0.5rem;
  background: #fff;
}

.keliu_name {
  text-align: left;
  padding-left: 1rem;
  font-size: 1rem;
  color: #fff;
  margin: 3%;
}

.keliu_val {
  height: 57%;
  padding-left: 12%;
  font-size: 45px;
  color: #fff;
  font-weight: bold;
}

.attr_icon {
  width: 2rem;
  height: 4.5rem;
  margin-top: 0.8rem;
  background: url(../../../assets/images/nav_bg.png) no-repeat;
  background-size: 100% 100%;
  cursor: pointer;
  &.active {
    background-image: url(../../../assets/images/bg-active.png) !important;
    h5 {
      color: #ffffff;
    }
    &:nth-child(1) i {
      background-image: url(../../../assets/images/arr_1.png) !important;
    }
    &:nth-child(2) i {
      background-image: url(../../../assets/images/arr_2.png) !important;
    }
    &:nth-child(3) i {
      background-image: url(../../../assets/images/arr_2.png) !important;
    }
    &:nth-child(4) i {
      background-image: url(../../../assets/images/arr_2.png) !important;
    }
    &:nth-child(5) i {
      background-image: url(../../../assets/images/arr_3.png) !important;
    }
    &:nth-child(6) i {
      background-image: url(../../../assets/images/arr_3.png) !important;
    }
  }
}

.attr_icon:nth-child(5) {
  height: 7.7rem;
}

.attr_icon:nth-child(6) {
  height: 7.7rem;
}

.attr_icon h5 {
  padding: 0 0.5rem;
  font-weight: 300;
  font-size: 13px;
  color: #333;
  text-align: center;
  margin: 0;
}

.attr_icon i {
  width: 1rem;
  height: 1rem;
  display: block;
  margin: 0.5rem auto 0.5rem;
}

.attr_icon:nth-child(1) i {
  background: url(../../../assets/images/arr_1_1.png) no-repeat;
  background-size: 100% 100%;
}

.attr_icon:nth-child(2) i {
  background: url(../../../assets/images/attr_bg_icon_2.png) no-repeat;
  background-size: 100% 100%;
}

.attr_icon:nth-child(3) i {
  background: url(../../../assets/images/attr_bg_icon_2.png) no-repeat;
  background-size: 100% 100%;
}

.attr_icon:nth-child(4) i {
  background: url(../../../assets/images/attr_bg_icon_1.png) no-repeat;
  background-size: 100% 100%;
}

.attr_icon:nth-child(5) i {
  background: url(../../../assets/images/attr_bg_icon_3.png) no-repeat;
  background-size: 100% 100%;
}

.attr_icon:nth-child(6) i {
  background: url(../../../assets/images/attr_bg_icon_3.png) no-repeat;
  background-size: 100% 100%;
}

.mapTit2 {
  height: 8vh;
  position: relative;
  text-align: center;
}

.mapBox2 {
  height: 80.8vh;
  padding: 0.5rem;
  background-size: contain !important;
}

.mapTit2 p {
  display: inline-block;
  margin-top: 18px;
  font-size: 1rem;
}

.map {
  height: 30%;
  margin-top: 5%;
}

.mapBox2 .map:nth-child(1) {
  background: url(../../../assets/images/nstation_analy_map.png) no-repeat;
  background-size: 100% 100%;
}

.mapBox2 .map:nth-child(2) {
  background: url(../../../assets/images/nstation_analy_map2.png) no-repeat;
  background-size: 100% 100%;
}

.mapBox2 .map:nth-child(3) {
  background: url(../../../assets/images/nstation_analy_map3.png) no-repeat;
  background-size: 100% 100%;
}
</style>
