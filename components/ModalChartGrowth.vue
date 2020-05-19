<template>
  <el-dialog title="Análise de beneficiários ano/mês" :visible.sync="modalVisible" width="90%" center>
    <canvas ref="canvas" width="900" height="400"></canvas>
    <span slot="footer" class="dialog-footer">
      <el-button @click="centerDialogVisible = false">Cancel</el-button>
      <el-button type="primary" @click="centerDialogVisible = false"
        >Confirm</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import { Line } from 'vue-chartjs'
import { sleep } from '../shared/utils'

export default {
  extends: Line,
  props: {
    dataChart: {}
  },
  data(){
    return{
      modalVisible: false,
    }
  },
  created(){
    this.unsubscribe = this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'changeChartGrowthData') {
        this.handleGrowth(state.chartGrowthData)
      }
    })
  },
  methods: {
    handleGrowth(data){
      this.modalVisible = data.length > 0 ? true : false
    } 
  },
  watch: {
    async dataChart(value) {
      this.modalVisible = true;

      await sleep(1000)

      this.renderChart(
        {
          labels: value.labels,
          datasets: [...value.data]
        },
        { responsive: true, maintainAspectRatio: false }
      )
    }
  }
}
</script>
<style>
canvas{
  min-height: 100vh;
}
</style>
