<template>
  <div>
    <Brazil />
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

export default {
  name: 'Chart',
  data() {
    return {
      dialogVisible: false,
      stateName: '',
    }
  },
  async mounted() {
    this.$root.$on('stateClicked', this.handleStateClicked)

    gapi.load('client:auth2', async function() {
      gapi.auth2.init({
        client_id: '963954958594-6pageg21t18elik8up5nr2k2f0h2a4u8.apps.googleusercontent.com',
        scope: "https://www.googleapis.com/auth/bigquery.readonly"
      })
    })

  },
  methods: {
    async authenticate() {

      const { access_token } =  await gapi.auth2.getAuthInstance().signIn({scope: 'email profile openid'})


      const url = 'https://bigquery.googleapis.com/bigquery/v2/projects/projeto-facul-275319/datasets/raw_beneficiarios/tables/ANS_BENEFICIARIOS/data?maxResults=1000&key=AIzaSyC4C_GzfiNOGhmmhMoobEhOLqpX3bqa8TQ'

      const configHeaders = {
        headers: {
          Authorization: `Bearer ${access_token}`,
          Accept: 'application/json'
        }
      }

      try {
          const { rows } =  this.$axios.get(url,{ ...configHeaders })
      } catch (error) {
      }

    },
    handleConfirm() {
      dialogVisible = false
    },
    handleStateClicked(state) {
      const { name } = state
      this.stateName = name
      this.dialogVisible = true
    },
  },
  watch: {
    stateName(value){
      console.log("value", value)
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
</style>
