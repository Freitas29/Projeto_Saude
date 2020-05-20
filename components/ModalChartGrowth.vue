<template>
  <el-dialog
    title="Análise de beneficiários ano/mês"
    :visible.sync="modalVisible"
    width="90%"
    top="1vh"
    center
  >
    <canvas ref="canvas"></canvas>
  </el-dialog>
</template>

<script>
import { Line } from 'vue-chartjs'
import { sleep, objectIsEmpty } from '../shared/utils'

export default {
  extends: Line,
  props: {
    dataChart: {}
  },
  data() {
    return {
      modalVisible: false
    }
  },
  created() {
    this.unsubscribe = this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'changeChartGrowthData') {
        this.handleGrowth(state.chartGrowthData)
      }
    })
  },
  beforeDestroy() {
    this.unsubscribe()
  },
  methods: {
    handleGrowth(data) {
      this.modalVisible = data.length > 0 ? true : false
    }
  },
  watch: {
    async dataChart(value) {
      if (objectIsEmpty(value)) {
        this.renderChart({
          labels: [],
          datasets: []
        },
        { responsive: true, maintainAspectRatio: false })

         return
      }
     
      this.modalVisible = true

      await sleep(1000)

      this.renderChart(
        {
          labels: value.labels,
          datasets: [...value.data]
        },
        { responsive: true, maintainAspectRatio: false }
      )
    },
    modalVisible(value) {
      this.$store.dispatch('changeModalGrowthClose', value)
    }
  }
}
</script>
<style>
canvas {
    min-height: 80vh;
    max-height: 110vh;
}
</style>
