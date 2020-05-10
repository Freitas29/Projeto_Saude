<template>
  <transition-group name="fade" tag="div" mode="out-in">
    <el-table
      :data="tableInsuranceCompany"
      style="width: 100%"
      stripe
      v-if="isInsuranceCompany"
      :key="1"
      @selection-change="handleSelectionChange"
    >
      >
      <el-table-column type="selection" width="55" />
      <el-table-column label="Seguradora">
        <template slot-scope="scope">
          <i class="el-icon-office-building"></i>
          <span style="margin-left: 10px">{{ scope.row.f[0].v }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Municipio" :width="300">
        <template slot-scope="scope">
          <i class="el-icon-map-location"></i>
          <span style="margin-left: 10px">{{ scope.row.f[1].v }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Beneficiários" :width="150">
        <template slot-scope="scope">
          <i class="el-icon-user"></i>
          <span style="margin-left: 10px">{{ scope.row.f[2].v }}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-table
      :data="county"
      style="width: 100%"
      stripe
      @current-change="handleRowClick"
      v-else
      v-bind:key="2"
    >
      <el-table-column label="Município">
        <template slot-scope="scope">
          <i class="el-icon-office-building"></i>
          <span style="margin-left: 10px">{{ scope.row }}</span>
        </template>
      </el-table-column>
    </el-table>
  </transition-group>
</template>

<script>
export default {
  name: 'TableSeguradora',
  props: {
    tableData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      county: [],
      isInsuranceCompany: false,
      tableInsuranceCompany: [],
      multipleSelection: []
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
      debugger
      this.tableInsuranceCompany = Object.entries(this.tableData)
        .filter(county => county[0] === value)
        .flat()[1]
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  },
  mounted() {
    this.showCount()
  }
}
</script>
