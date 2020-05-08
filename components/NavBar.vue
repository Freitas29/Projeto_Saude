<template>
  <el-row class="nav">
    <el-col :span="4" class="navbar__logo-box">
      <NuxtLink to="/">
        <img src="~/assets/ea.jpg" alt="" class="navbar__logo" />
      </NuxtLink>
    </el-col>
    <el-col :span="20" class="navbar__menu-box">
      <ul class="el-menu el-menu--horizontal navbar__menu">
        <li class="el-menu-item">O que somos</li>
        
        <li class="el-menu-item"><NuxtLink to="/chart">Nosso produto</NuxtLink></li>
        <li class="el-menu-item">Diferencial</li>
      </ul>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<style lang="scss">
$primary: #1D3557;

.nav{
  background-color: $primary;
}

li{
  color: #ffffff !important;
  font-size: 18px !important;
}

li:hover{
  background-color: #2A5FE4 !important;
}

a{
  text-decoration: none !important;
}

img{
  width: 40px;
  height: auto;
}
.navbar__logo-box{
  background-color: $primary;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.navbar__menu-box{
    background-color: $primary;
    height: 60px;
}
.el-menu {
    background-color: $primary;
    display: flex;
    align-items: center;
    justify-content: flex-end;
}
</style>
