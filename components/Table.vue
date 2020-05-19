<template>
  <transition-group
    id="table"
    name="fade"
    tag="div"
    mode="out-in"
    class="max-chart"
  >
    <el-table
      :data="tableInsuranceCompany"
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
          <span style="margin-left: 10px">{{ scope.row.NM_MUNICIPIO }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Beneficiários" :width="150">
        <template slot-scope="scope">
          <i class="el-icon-user"></i>
          <span style="margin-left: 10px">{{ scope.row.BENEFICIARIOS }}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-table
      class="max-chart"
      :data="county.filter(data => !searchCounty || data.toLowerCase().includes(searchCounty.toLowerCase()))"
      style="width: 100%"
      stripe
      @current-change="handleRowClick"
      v-else
      :key="2"
    >
      <el-table-column label="Município">
        <template slot-scope="scope">
          <i class="el-icon-location-information"></i>
          <span style="margin-left: 10px">{{ scope.row }}</span>
        </template>
      </el-table-column>
      <el-table-column align="right">
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="searchCounty"
              size="mini"
              placeholder="Type to search"
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
      v-if="isInsuranceCompany && multipleSelection.length > 0"
      icon="el-icon-data-line"
      >Predição</el-button
    >
  </transition-group>
</template>

<script>
import mobileScreen from '../mixins/mobileScreen'
import { scroller } from 'vue-scrollto/src/scrollTo'
import { sleep } from '~/shared/utils'

export default {
  name: 'TableSeguradora',
  props: {
    tableData: {
      type: Object,
      required: true
    }
  },
  mixins: [mobileScreen],
  data() {
    return {
      county: [],
      isInsuranceCompany: false,
      tableInsuranceCompany: [],
      multipleSelection: [],
      searchInsuranceCompany: '',
      searchCounty: '',
    }
  },
  methods: {
    showCount() {
      this.county = Object.keys(this.tableData).map(row => {
        return row
      })
    },
    handleRowClick(value) {
      this.isInsuranceCompany = true
      this.tableInsuranceCompany = Object.entries(this.tableData)
        .filter(county => county[0] === value)
        .flat()[1]
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    search() {
      this.$store.commit(
        'changeInsuranceCompanySelected',
        this.multipleSelection
      )
    },
    backToCounty() {
      this.isInsuranceCompany = false
      const firstScrollTo = scroller()

      firstScrollTo('#table')
    }
  },
  mounted() {
    this.showCount()
  },
  watch: {
    async county() {
      const firstScrollTo = scroller()

      await sleep(250)

      firstScrollTo('#table')
    },
    async isInsuranceCompany() {
      const firstScrollTo = scroller()

      await sleep(250)

      firstScrollTo('#table')
    }
  }
}
</script>
<style scoped>
.float {
  position: fixed;
  bottom: 25px;
  right: 15px;
}

.float-chart {
  position: fixed;
  right: 15px;
  bottom: 12%;
}
.max-chart {
  width: 100%;
}
</style>
