<template>
  <el-table :data="tableData" style="width: 100%" stripe>
    <el-table-column label="Seguradora" >
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
</template>

<script>
export default {
  name: 'TableSeguradora',
  props: {
    tableData: {
      type: Array,
      required: true
    }
  }
}
</script>
