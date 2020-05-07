<template>
  <el-menu
    class="el-menu"
    mode="horizontal"
    background-color="#2a7ae4"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <el-menu-item index="0">
      <img src="~/assets/ea.jpg" style="width:40px; height:40px" />
    </el-menu-item>

    <el-menu-item
      index="1"
    >
      O que fazemos
    </el-menu-item>

    <el-menu-item
      index="2"
    >
      Nosso Produto</el-menu-item
    >

    <el-menu-item
      index="3"
    >
      <a
        style=" text-decoration: none;"
        href="https://www.ele.me"
        target="_blank"
        >Orders</a
      >
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'NavBar_P'
}
</script>

<style>
.el-menu {
  border: none !important;
}
</style>
