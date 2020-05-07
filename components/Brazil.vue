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
  data() {
    return {
      stateSelect: ''
    }
  },
  name: 'Brazil-Chart',
  mounted() {
    let vmo = this
    am4core.useTheme(am4themes_animated)

    let chart = am4core.create(this.$refs.chartdiv, am4maps.MapChart)

    chart.geodata = am4geodata_worldLow

    chart.projection = new am4maps.projections.Miller()

    let polygonSeries = chart.series.push(new am4maps.MapPolygonSeries())

    polygonSeries.useGeodata = true

    let polygonTemplate = polygonSeries.mapPolygons.template
    polygonTemplate.applyOnClones = true
    polygonTemplate.togglable = true
    polygonTemplate.tooltipText = '{name}'
    polygonTemplate.nonScalingStroke = true
    polygonTemplate.strokeOpacity = 0.5
    polygonTemplate.fill = '#1D3557'
    let lastSelected

    chart.zoomControl = new am4maps.ZoomControl()

    chart.zoomControl.slider.height = 1

    vmo.handleClickState(polygonTemplate, lastSelected)

    /* Create selected and hover states and set alternative fill color */
    let ss = polygonTemplate.states.create('active')
    ss.properties.fill = chart.colors.getIndex(2)

    let hs = polygonTemplate.states.create('hover')
    hs.properties.fill = chart.colors.getIndex(4)

    this.chart = chart
  },

  methods: {
    handleClickState(map, lastStateSelected) {
      const vmo = this
      map.events.on('hit', function(ev) {
        vmo.stateSelect = ev.target.dataItem._dataContext
        if (lastStateSelected) {
          lastStateSelected.isActive = false
        }
        if (lastStateSelected !== ev.target) {
          lastStateSelected = ev.target
        }
      })
    }
  },

  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose()
    }
  },
  watch: {
    stateSelect(value) {
      this.$root.$emit('stateClicked', value)
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
