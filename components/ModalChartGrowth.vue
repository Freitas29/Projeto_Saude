<template>
  <el-dialog
    title="Warning"
    :visible.sync="modalVisible"
    width="90%"
    center
  >
    <span
      >It should be noted that the content will not be aligned in center by
      default</span
    >
    <span slot="footer" class="dialog-footer">
      <el-button @click="centerDialogVisible = false">Cancel</el-button>
      <el-button type="primary" @click="centerDialogVisible = false"
        >Confirm</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
 export default {
    props: {
        modalVisible: false
    },
  };
</script>

<style></style>
