<template>
    <transition-group class="chart-page" name="fade">

      <Brazil v-if="!loading" :key="1"/>
    

    <div name="fade" class="max-chart" :key="2">
      <Table :tableData="rows" v-if="!loading && hasResult" />
    </div>

    
      <div class="animation-loading" v-if="loading" :key="3">
        <lottie-player
          src="https://assets5.lottiefiles.com/packages/lf20_W5Sk67.json"
          background="transparent"
          speed="1"
          style="width: 500px; height: 500px;"
          loop
          autoplay
        />
      </div>

    <Modal :dataChart="prospChart" :key="4"/>

    <el-dialog
    :key="5"
      title="Filtro"
      :visible.sync="dialogVisible"
      custom-class="dialog-modal"
    >
      <span
        >Deseja pesquisar pelo estado de <b>{{ stateSelected.name }}</b
        >?</span
      >

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Fechar</el-button>
        <el-button type="primary" @click="handleConfirm">Pesquisar</el-button>
      </span>
    </el-dialog>
    </transition-group>
</template>

<script>
import Brazil from '~/components/Brazil'
import '@lottiefiles/lottie-player'
import Table from '~/components/Table'
import Modal from '~/components/ModalChartGrowth'
import { groupBy, sleep, getRandomColor } from '../shared/utils'
import { mapState } from 'vuex'

export default {
  name: 'Chart',
  transition: {
    name: 'page',
    mode: 'out-in'
  },
  components: {
    Brazil,
    Table,
    Modal
  },
  data() {
    return {
      dialogVisible: false,
      stateSelected: {},
      rows: [],
      hasResult: false,
      pageToken: '',
      prospChart: []
    }
  },
  computed: mapState([
    'insuranceCompanySelected',
    'loading',
    'chartGrowthData',
    'county'
  ]),
  mounted() {
    this.$root.$on('stateClicked', this.handleStateClicked)
    this.$root.$on('insuranceCompanySelected', this.handleInsuranceCompany)

    gapi.load('client:auth2', function() {
      gapi.auth2.init({
        client_id:
          '963954958594-6pageg21t18elik8up5nr2k2f0h2a4u8.apps.googleusercontent.com',
        scope: 'https://www.googleapis.com/auth/bigquery.readonly'
      })
    })
  },
  created() {
    this.unsubscribe = this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'changeInsuranceCompanySelected') {
        this.handleInsuranceCompany(state.insuranceCompanySelected)
      }

      if (mutation.type === 'changeModalGrowthClose') {
        debugger
        this.prospChart ={}
      }
    })
  },
  beforeDestroy() {
    this.unsubscribe();
  },
  methods: {
    async handleInsuranceCompany(companies) {
      this.$store.dispatch('changeLoading', true)

      const nameInsuraceCompanies = companies.map(
        insurace => insurace.NM_RAZAO_SOCIAL
      )

      const { data } = await this.$axios.get('/chart', {
        params: {
          seguradoras: nameInsuraceCompanies,
          uf: this.stateSelected.initials,
          municipio: this.$store.state.county
        }
      })

      this.$store.dispatch('changeChartGrowthData', data)
      
      

      this.renderChartGrowth()
    },
    renderChartGrowth() {
      const dates = this.chartGrowthData.map(t => t.DT_REFERENCIA.value)

      var distict = function(value, index, self) {
        return self.indexOf(value) === index
      }

      const datasets = groupBy(
        this.chartGrowthData,
        data => data.NM_RAZAO_SOCIAL
      )

      const datasetChart = Object.entries(datasets).map(data => ({
        label: data[0],
        backgroundColor: getRandomColor(),
        data: data[1].map(valor => valor.f0_)
      }))

      this.prospChart = {
        labels: dates.filter(distict),
        data: datasetChart
      }

       this.$store.dispatch('changeLoading', false)
    },
    async authenticate() {
      const vmo = this

      this.$store.dispatch('changeLoading', true)
      const { data } = await this.$axios.get(
        '/municipios',
        {
          params: {
            uf: this.stateSelected.initials
          }
        }
      )

      this.rows = data

      await sleep(500)

      this.$store.dispatch('changeLoading', false)
    },
    handleConfirm() {
      this.dialogVisible = false
      this.$store.dispatch("changeIsInsuranceCompany", false)
      this.authenticate()
    },
    handleStateClicked(state) {
      const { name, id } = state

      const initials = id.split('-')[1]

      this.stateSelected = {
        name,
        initials
      }

      this.$store.dispatch('changeMapSelected', this.stateSelected)

      this.dialogVisible = true
    },
    clearString(estado) {
      const normalize = estado
        .normalize('NFD')
        .replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, '')
      return normalize.replace(/[^\w\s]/gi, '')
    }
  },
  watch: {
    rows(value) {
      if (value.length > 0) {
        this.hasResult = true
      } else {
        this.hasResult = false
      }
    }
  }
}
</script>

<style>
.chart {
  width: 100%;
  height: 90vh;
  position: relative;
  margin-top: 10vh;
}

.max-chart {
  width: 100%;
}

.chart-page {
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: var(--primary-color);
}

.animation-loading {
  width: 100%;
  height: 100vh;
  background-color: rgba(29, 53, 87, 0.363);
  display: flex;
  align-items: center;
  justify-content: center;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.dialog-modal {
  width: 30%;
}

@media only screen and (max-width: 600px) {
  .dialog-modal {
    width: 95%;
  }
}
</style>
