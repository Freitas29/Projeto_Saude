<template>
  <el-menu
  
    class="el-menu"
    mode="horizontal"
    background-color="#2a7ae4"
    text-color="#D4F5FF"
    active-text-color="#ffd04b"
    
  >
    <el-menu-item index="0">
      <img src="~/assets/ea.jpg" style="width:40px; height:40px" />
    </el-menu-item>

    <el-menu-item index="1">O que fazemos</el-menu-item>
    <el-menu-item index="2">Nosso Produto</el-menu-item>
    <el-menu-item index="3">
    <a  style=" text-decoration: none;"
        href="https://www.ele.me"
        target="_blank"> Diferencial</a>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'NavBar_P'
}
</script>

<style>
/* @import url('https://fonts.googleapis.com/css2?family=Acme&display=swap'); */
@import url('https://fonts.googleapis.com/css2?family=Concert+One&display=swap');
.el-menu {
  border: none !important;
  /* font-family: 'Acme', sans-serif; */
  font-family: 'Concert One', cursive;

}
</style>
