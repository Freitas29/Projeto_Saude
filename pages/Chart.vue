<template>
  <div>
    <Brazil v-if="!loading" />

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
    <el-dialog title="Filtro" :visible.sync="dialogVisible" width="30%">
      <span
        >Deseja pesquisar pelo estado de <b>{{ stateName }}</b
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

export default {
  name: 'Chart',
    transition: {
      name: 'page',
      mode: 'out-in'
    },
  data() {
    return {
      dialogVisible: false,
      stateName: '',
      loading: false
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

            const response = await vmo.$axios.get(
              'https://bigquery.googleapis.com/bigquery/v2/projects/projeto-facul-275319/datasets/raw_beneficiarios/tables/ANS_BENEFICIARIOS/data?maxResults=1000&key=AIzaSyC4C_GzfiNOGhmmhMoobEhOLqpX3bqa8TQ',
              {
                headers: {
                  Authorization: `Bearer ${access_token}`,
                  Accept: 'application/json'
                }
              }
            )

            const {
              data: { rows }
            } = response

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
      const { name } = state
      this.stateName = name
      this.dialogVisible = true
    },
    clearString(estado) {
      const normalize = estado
        .normalize('NFD')
        .replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, '')
      return normalize.replace(/[^\w\s]/gi, '')
    }
  },
  components: {
    Brazil
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

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
