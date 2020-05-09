<template>
  <div>
    <transition name="fade">
      <Brazil v-if="!loading || !hasResult" />
    </transition>

    <transition name="fade">
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

export default {
  name: 'Chart',
  transition: {
    name: 'page',
    mode: 'out-in'
  },
  components: {
    Brazil,
    Table
  },
  data() {
    return {
      dialogVisible: false,
      stateSelected: {},
      loading: false,
      rows: [],
      hasResult: false,
      pageToken: '',
    }
  },
  mounted() {
    this.$root.$on('stateClicked', this.handleStateClicked)

    gapi.load('client:auth2', function() {
      gapi.auth2.init({
        client_id:
          '963954958594-6pageg21t18elik8up5nr2k2f0h2a4u8.apps.googleusercontent.com',
        scope: 'https://www.googleapis.com/auth/bigquery.readonly'
      })
    })
  },
  methods: {
    authenticate() {
      const vmo = this

      this.loading = true
      return gapi.auth2
        .getAuthInstance()
        .signIn({
          scope: 'email profile openid'
        })
        .then(
          async function(resp) {
            const { access_token } = resp.getAuthResponse()

            const perPage = 50


            const url = `https://bigquery.googleapis.com/bigquery/v2/projects/projeto-facul-275319/datasets/raw_beneficiarios/tables/BENEFICIARIOS_${vmo.stateSelected.initials}/data?maxResults=${perPage}&pageToken=${vmo.pageToken}&key=AIzaSyC4C_GzfiNOGhmmhMoobEhOLqpX3bqa8TQ`

            const response = await vmo.$axios.get(url, {
              headers: {
                Authorization: `Bearer ${access_token}`,
                Accept: 'application/json'
              }
            })

            const {
              data: { rows, pageToken }
            } = response

            vmo.rows = rows
            vmo.pageToken = pageToken
            vmo.loading = false
          },
          function(err) {
            vmo.loading = false
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
  height: 500px;
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
