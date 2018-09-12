<template>
  <div :id="chartsId" style="display: inline-block;position:relative;bottom:0;height:100%;width: 100%;">
    <template v-for="(item,i) in xAxis && xAxis.slice(0, 10).length">
      <div class="EditorMod-bottom" :key="i">
        <div class="EditorMod-bottom-bar"
             :style="{height:8*(yAxis[i]/yAxis[0])+'rem',
               marginTop:3+8*(1-yAxis[i]/yAxis[0])+'rem'}">
          <p>{{yAxis[i]}}</p>
          <span></span>
          <p>{{xAxis[i]}}</p>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
export default {
  props: {
    chartsId: 'ch123',
    xAxis: {
      type: Array,
      default: () => {
        return null
      }
    },
    yAxis: {
      type: Array,
      default: () => {
        return null
      }
    }
  },
  mounted () {
    console.log(this.xAxis)
    console.log(this.yAxis)
  }
}
</script>
<style>
.EditorMod-bottom {
  float: left;
  margin-left: 4%;
  margin-top: 10%;
  background: #eaeff4;
  width: 5.5%;
}

.EditorMod-bottom-bar {
  width: 100%;
  float: left;
  text-align: center;
  position: relative;
  display: inline-block;
}

.EditorMod-bottom-bar:nth-child(1) {
  margin-left: 0rem;
}

.EditorMod-bottom-bar p:nth-child(1) {
  margin-top: -2rem;
}

.EditorMod-bottom-bar p:nth-child(3) {
  position: absolute;
  bottom: -1rem;
  font-size: 12px;
  height: 1rem;
}

.EditorMod-bottom-bar:nth-child(2n-1) {
  background: url(../../../../assets/images/c_icon2.jpg);
  background-position: bottom;
}

.EditorMod-bottom-bar:nth-child(2n) {
  background: url(../../../../assets/images/c_icon2.jpg);
  background-position: bottom;
}

.EditorMod-bottom-bar:nth-child(2n-1) span {
  width: 2.9rem;
  height: 2.9rem;
  margin-left: -0.2rem;
  display: inline-block;
  /*background: url("../tourists_img/syellow.png")center no-repeat;*/
}

.EditorMod-bottom-bar:nth-child(2n) span {
  width: 2.9rem;
  height: 2.9rem;
  margin-left: -0.2rem;
  display: inline-block;
  /*background: url("../tourists_img/greentime.png")center no-repeat;*/
}
</style>
