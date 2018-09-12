<template>
  <div class="lu-kou-index-page">
    <div class="left animated fadeInLeft">
      <div class="bg-img" ref="bgImg" :style="{display:block}">
        <img src="../../../assets/images/lukouAirport.png" class="img-start-port"/>
        <img src="../../../assets/images/JiangyinBridge.png" class="img-end-port-1"/>
        <img src="../../../assets/images/nstation.png" class="img-end-port-2"/>
        <img src="../../../assets/images/yangtzeRiverSecondBridge.png" class="img-end-port-3"/>
        <div class="line-1 line" ref="line1">
          <img src="../../../assets/images/arrow.png"/>
        </div>
        <div class="line-2 line" ref="line2"></div>
        <div class="line-3 line" ref="line3"></div>
      </div>
    </div>
    <div class="right animated fadeInRight">
      <!--<div class="date-desc">-->
        <!--<span>{{ tableDate }}</span>-->
      <!--</div>-->
      <el-form :inline="true" :model="filterForm" label-width="0" class="demo-form-inline">
        <el-form-item>
          <el-date-picker type="date" placeholder="选择日期" v-model="filterForm.date"
                          style="width: 100%;" @change="changeDate"></el-date-picker>
        </el-form-item>
      </el-form>
      <i-table :columns="columns" :list="list" :options="options"></i-table>
    </div>
  </div>
</template>

<script>
import iTable from '../../../components/iTable/Index'
import BLL from './Index'

export default {
  components: { iTable },
  data () {
    return {
      block: 'block',
      columns: [
        {
          prop: 'date',
          label: '日期',
          align: 'center'
        },
        {
          prop: 'area_name',
          label: '路线',
          align: 'center',
          render: (row, column) => {
            return `禄口机场 - ${row.area_name}`
          }
        },
        {
          prop: 'nums',
          label: '客流人数(人)',
          align: 'center'
        }
      ], // 表格header
      list: [], // 表格数据
      filterForm: {
        date: '' // 日期
      },
      options: {
        stripe: true, // 是否为斑马纹 table
        highlightCurrentRow: true, // 是否支持当前行高亮显示
        mutiSelect: false // 是否支持列表项选中功能
      }, // 表格属性
      tableDate: '' // 数据日期
    }
  },
  created () {
    this.BLL = new BLL(this)
    // 在json中取模拟数据
    this.tableDate = this.$utils.Date.format(new Date(new Date().getTime() - 24 * 60 * 60 * 1000), 'yyyy-MM-dd')
    this.filterForm.date = this.$utils.Date.format(new Date(new Date().getTime() - 24 * 60 * 60 * 1000), 'yyyy-MM-dd')
  },
  mounted () {
    // 计算背景图片的高度
    this.$refs.bgImg.style.maxHeight = this.$refs.bgImg.offsetWidth / 100 * 88 + 'px'
    this.BLL.relationshipAnalysis()
  },
  computed: {},
  methods: {
    // 根据日期筛选
    changeDate (val) {
      this.filterForm.date = this.$utils.Date.format(new Date(val.getTime()), 'yyyy-MM-dd')
      this.BLL.relationshipAnalysis()
    }
  }
}
</script>

<style lang="scss">
.lu-kou-index-page {
  background-color: #fff;
  display: flex;
  justify-content: center;
  height: 100%;
  width: 100%;
  .left {
    flex: 1 1 58%;
    position: relative;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .bg-img {
      height: 100%;
      flex: 0 0 100%;
      width: 100%;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-image: url("../../../assets/images/bg.png");
      position: relative;
      img {
        position: absolute;
        width: 15%;
        &.img-start-port {
          top: 47%;
          left: 8%;
        }
        &.img-end-port-1 {
          top: 72%;
          left: 62%;
        }
        &.img-end-port-2 {
          top: 17%;
          left: 12%;
        }
        &.img-end-port-3 {
          top: 12%;
          left: 60%;
        }
      }
      .line {
        position: absolute;
        border: 2px #ccc dashed;
        width: 0;
        &.line-1 {
          top: 34%;
          left: 17%;
          height: 13%;
          transform: rotate(15deg);
        }
        &.line-2 {
          top: 14%;
          left: 41%;
          height: 51%;
          transform: rotate(58deg);
        }
        &.line-3 {
          top: 45%;
          left: 41%;
          height: 50%;
          transform: rotate(-68deg);
        }
      }
    }
  }
  .right {
    flex: 1 1 42%;
    padding-left: 12px;
    .demo-form-inline {
      padding-left: 10px;
    }
    .date-desc {
      text-align: right;
      padding: 30px 20px;
      font-size: 14px;
      span {
        padding: 6px 16px;
        background-color: #f1f1f1;
        border-radius: 20px;
      }
    }
  }
}
</style>
