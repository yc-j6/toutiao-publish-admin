<template>
    <div class="fans-container">粉丝管理
       <echarts1></echarts1>
       <MapDemo></MapDemo>
    </div>
</template>

<script>
import echarts1 from './components/echarts1'
import MapDemo from './components/Map'
export default {
  name: 'FansIndex',
  components: {
    echarts1,
    MapDemo
  }
}
</script>

<style scoped lang='less'></style>
