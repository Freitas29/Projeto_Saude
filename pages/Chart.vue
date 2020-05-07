<template>
  <div>
    <Brazil />
    <el-dialog
      title="Filtro"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <span>Deseja pesquisar pelo estado de <b>{{ stateName }}</b>?</span>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Fechar</el-button>
        <el-button
        type="primary" 
        @click="handleConfirm"

          >Pesquisar</el-button
        >
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
      stateName: ''
    }
  },
  mounted() {
    this.$root.$on('stateClicked', this.handleStateClicked)
  },
  methods: {
    handleConfirm(){
        dialogVisible = false
        debugger
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
