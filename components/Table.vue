<template>
  <transition-group
    id="table"
    name="fade"
    tag="div"
    mode="out-in"
    class="max-chart"
  >
    <el-table
      :data="sortInsuranceCompanies"
      style="width: 100%"
      stripe
      v-if="isInsuranceCompany"
      :key="1"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column label="Seguradora" :width="isMobile ? 650 : 'auto'">
        <template slot-scope="scope">
          <i class="el-icon-office-building"></i>
          <span style="margin-left: 10px">{{ scope.row.NM_RAZAO_SOCIAL }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Municipio" :width="300">
        <template slot-scope="scope">
          <i class="el-icon-map-location"></i>
          <span style="margin-left: 10px">{{ mapSelected.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Beneficiários" :width="150">
        <template slot-scope="scope">
          <i class="el-icon-user"></i>
          <span style="margin-left: 10px">{{ scope.row.f0_ }}</span>
        </template>
      </el-table-column>
    </el-table>

    <el-table
      class="max-chart"
      :data="
        tableData.filter(
          data =>
            !searchCounty ||
            data.NM_MUNICIPIO.toLowerCase().includes(searchCounty.toLowerCase())
        )
      "
      style="width: 100%"
      stripe
      @current-change="handleRowClick"
      v-else
      :key="2"
    >
      <el-table-column label="Município">
        <template slot-scope="scope">
          <i class="el-icon-location-information"></i>
          <span style="margin-left: 10px">{{ scope.row.NM_MUNICIPIO }}</span>
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="searchCounty"
            size="mini"
            placeholder="Digite para filtrar por município"
          />
        </template>
      </el-table-column>
    </el-table>
    <el-button
      class="float"
      :key="4"
      @click="backToCounty"
      v-if="isInsuranceCompany"
      icon="el-icon-arrow-left"
      >Voltar para municipios</el-button
    >
    <el-button
      type="primary"
      class="float-chart"
      :key="3"
      @click="search"
      v-if="insuranceCompaniesSelected"
      icon="el-icon-data-line"
      >Predição</el-button
    >
    <el-button
      type="info"
      class="float-info"
      :key="6"
      @click="searchInfo"
      v-if="this.isInsuranceCompany && this.multipleSelection.length === 1"
      icon="el-icon-s-comment"
    >
      Consultar preço
    </el-button>
  </transition-group>
</template>

<script>
import mobileScreen from '../mixins/mobileScreen'
import { scroller } from 'vue-scrollto/src/scrollTo'
import { sleep } from '~/shared/utils'
import { mapState } from 'vuex'

export default {
  name: 'TableSeguradora',
  props: {
    tableData: {
      type: Array,
      required: true
    }
  },
  mixins: [mobileScreen],
  data() {
    return {
      tableInsuranceCompany: [],
      multipleSelection: [],
      searchInsuranceCompany: '',
      searchCounty: ''
    }
  },
  computed: {
    ...mapState(['isInsuranceCompany', 'insuranceCompanies', 'mapSelected']),
    sortInsuranceCompanies() {
      const clone = JSON.parse(JSON.stringify(this.insuranceCompanies))
      return clone.sort((insuranceCompanieFirst, insuranceCompanieSeccond) =>  insuranceCompanieSeccond.f0_ - insuranceCompanieFirst.f0_)
    },
    insuranceCompaniesSelected() {
      return this.isInsuranceCompany && this.multipleSelection.length > 0
    },
    tableLength(value) {
      const firstScrollTo = scroller()

      if (!this.isInsuranceCompany) {
        sleep(250).then(() => {
          firstScrollTo('#table')
        })
        return
      }

      if (this.tableData.length > 0) {
        sleep(750).then(() => {
          firstScrollTo('#table')
        })
      }
    }
  },
  methods: {
    searchInfo() {
      const [ company ] = this.multipleSelection
      this.$root.$emit("searchPrice", company.NM_RAZAO_SOCIAL)
    },
    handleRowClick(value) {
      this.$store.dispatch('changeIsInsuranceCompany', true)
      this.$store.dispatch('changeCounty', value.NM_MUNICIPIO)

      this.fetchInsuranceCompany(value.NM_MUNICIPIO)
    },
    async fetchInsuranceCompany(municipio) {
      const vmo = this

      this.$store.dispatch('changeLoading', true)

      const { data } = await this.$axios.get(
        '/seguradoras',
        {
          params: {
            uf: vmo.$store.state.mapSelected.initials,
            municipio
          }
        }
      )

      vmo.$store.dispatch('changeLoading', false)

      await sleep(250)

      vmo.$store.dispatch('changeInsuraceCompanies', data)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    search() {
      this.$store.dispatch(
        'changeInsuranceCompanySelected',
        this.multipleSelection
      )
    },
    backToCounty() {
      this.$store.dispatch('changeIsInsuranceCompany', false)
      const firstScrollTo = scroller()

      firstScrollTo('#table')
    }
  },
  watch: {
    tableLength(value) {}
  },
  async insuranceCompanies(value) {
    console.log(this)
    if (this.multipleSelection.length !== 0) return
    const firstScrollTo = scroller()

    await sleep(250)

    firstScrollTo('#table')
  }
}
</script>
<style scoped>
.float {
  position: fixed;
  bottom: 80px;
  right: 15px;
}

.float-chart {
  position: fixed;
  right: 15px;
  bottom: 19%;
}

.float-info{
  position: fixed;
  right: 15px;
  bottom: 26%;

}
.max-chart {
  width: 100%;
}
</style>
