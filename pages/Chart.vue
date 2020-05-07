<template>
  <div class="chart" ref="chartdiv" />
</template>

<script>
import * as am4core from '@amcharts/amcharts4/core'
import * as am4maps from '@amcharts/amcharts4/maps'
import am4themes_animated from '@amcharts/amcharts4/themes/animated'
import am4geodata_worldLow from '@amcharts/amcharts4-geodata/brazilLow'

am4core.useTheme(am4themes_animated)
export default {
  name: 'HelloWorld',
  mounted() {
    am4core.useTheme(am4themes_animated)

    let chart = am4core.create(this.$refs.chartdiv, am4maps.MapChart)

    chart.geodata = am4geodata_worldLow

    chart.projection = new am4maps.projections.Miller()

    var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries())

    polygonSeries.useGeodata = true

    var polygonTemplate = polygonSeries.mapPolygons.template
    polygonTemplate.applyOnClones = true
    polygonTemplate.togglable = true
    polygonTemplate.tooltipText = '{name}'
    polygonTemplate.nonScalingStroke = true
    polygonTemplate.strokeOpacity = 0.5
    polygonTemplate.fill = chart.colors.getIndex(0)
    var lastSelected

    polygonTemplate.events.on('hit', function(ev) {
      if (lastSelected) {
        let stateName = ev.target.dataItem._dataContext

        lastSelected.isActive = false
      }
      if (lastSelected !== ev.target) {
        lastSelected = ev.target
      }
    })

    /* Create selected and hover states and set alternative fill color */
    var ss = polygonTemplate.states.create('active')
    ss.properties.fill = chart.colors.getIndex(2)

    var hs = polygonTemplate.states.create('hover')
    hs.properties.fill = chart.colors.getIndex(4)

    this.chart = chart
  },

  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose()
    }
  }
}
</script>

<style>
.chart {
  width: 100%;
  height: 500px;
}
</style>
