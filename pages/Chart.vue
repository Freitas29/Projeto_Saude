<template>
  <div class="chart-page">
    <transition name="fade">
      <Brazil v-if="!loading" />
    </transition>

    <transition name="fade" class="max-chart">
      <Table :tableData="rows" v-if="!loading && hasResult" />
    </transition>

    <transition name="fade">
      <div class="animation-loading" v-if="loading">
        <lottie-player
          src="https://assets1.lottiefiles.com/packages/lf20_x62chJ.json"
          background="transparent"
          speed="1"
          style="width: 500px; height: 500px;"
          loop
          autoplay
        />
      </div>
    </transition>

    <Modal :modalVisible="chartGrowthData.length > 0" :dataChart="prospChart" />

    <el-dialog
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
  </div>
</template>

<script>
import Brazil from '~/components/Brazil'
import '@lottiefiles/lottie-player'
import Table from '~/components/Table'
import Modal from '~/components/ModalChartGrowth'
import { groupBy } from '../shared/utils'
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
      chartGrowthData: [],
      prospChart: []
    }
  },
  computed: mapState(['insuranceCompanySelected', 'loading']),
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
      if (mutation.type === 'changeinsuranceCompanySelected') {
        debugger
        this.handleInsuranceCompany(state.insuranceCompanySelected)
      }
    })
  },
  methods: {
    async handleInsuranceCompany(companies) {
      this.$store.commit('changeLoading', true)

      const nameInsuraceCompanies = companies.map(insurace => insurace.f[0].v)

      const { data } = await this.$axios.get('http://localhost:3001/chart', {
        params: {
          seguradoras: nameInsuraceCompanies,
          uf: this.stateSelected.initials,
          municipio: companies[0].f[1].v
        }
      })

      this.chartGrowthData = data
      this.renderChartGrowth()

      this.$store.commit('changeLoading', false)
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
        backgroundColor: '#f87979',
        data: data[1].map(valor => valor.f0_)
      }))

      this.prospChart = {
        labels: dates.filter(distict),
        data: datasetChart
      }
    },
    authenticate() {
      const vmo = this

      this.$store.commit('changeLoading', true)
      return gapi.auth2
        .getAuthInstance()
        .signIn({
          scope: 'email profile openid'
        })
        .then(
          async function(resp) {
            const { access_token } = resp.getAuthResponse()

            // const perPage = 400

            const url = `https://bigquery.googleapis.com/bigquery/v2/projects/projeto-facul-275319/datasets/raw_beneficiarios/tables/BENEFICIARIOS_${vmo.stateSelected.initials}/data?&key=AIzaSyC4C_GzfiNOGhmmhMoobEhOLqpX3bqa8TQ`

            const response = await vmo.$axios.get(url, {
              headers: {
                Authorization: `Bearer ${access_token}`,
                Accept: 'application/json'
              }
            })

            const {
              data: { rows, pageToken }
            } = response

            vmo.rows = groupBy(rows, item => item.f[1].v)
            vmo.$store.commit('changeLoading', false)
          },
          function(err) {
            vmo.$store.commit('changeLoading', false)
          }
        )
    },
    handleConfirm() {
      this.dialogVisible = false
      this.authenticate()
    },
    handleStateClicked(state) {
      const { name, id } = state

      const initials = id.split('-')[1]

      this.stateSelected = {
        name,
        initials
      }

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
      if (Object.keys(value).length > 0) {
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
