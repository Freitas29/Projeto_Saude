<template>
  <div>
    <div class="g-signin2" ref="googleSignin"></div>
    <!-- <Brazil /> -->
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
      auth2: {},
      userId: '',
    }
  },
  mounted() {
    this.$root.$on('stateClicked', this.handleStateClicked)
    this.initButtonGoogle()
  },
  methods: {
    handleConfirm() {
      dialogVisible = false
    },
    initButtonGoogle() {
      const vmo = this
      gapi.load('auth2', () => {
        vmo.auth2 = gapi.auth2.init({
          client_id:
            '963954958594-6pageg21t18elik8up5nr2k2f0h2a4u8.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin'
        })
        vmo.attachSignin(vmo.$refs.googleSignin)
      })
    },
    attachSignin(element) {
      const vmo = this

      this.auth2.attachClickHandler(
        element,
        {},
        function(googleUser) {
          vmo.userId = googleUser.getBasicProfile().getId()
        },
        function(error) {
          alert(JSON.stringify(error, undefined, 2))
        }
      )
    },
    handleStateClicked(state) {
      const { name } = state
      this.stateName = name
      this.dialogVisible = true
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
