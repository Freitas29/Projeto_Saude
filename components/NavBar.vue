<template>
  
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
  >
    <el-menu-item index ="0" > <img src= "ea.jpg" style="width:40px height:40px" > </el-menu-item>
    
    <el-menu-item index="1"
    style="color:#FFF; font-family: 'Oswald', sans-serif; ">
    O que fazemos </el-menu-item>

      <el-menu-item index="2"
        style="color:#FFF; font-family: 'Oswald', sans-serif; ">
        Nosso Produto</el-menu-item>
        
        <el-menu-item index="3"
          style="color:#FFF; font-family: 'Oswald', sans-serif;">
            <a style=" text-decoration: none;" href="https://www.ele.me" target="_blank">Orders</a>
              </el-menu-item>
   
  </el-menu>
</template>

<script>
export default {
     name: "NavBar_P"

}

</script>

<style>

@import url('https://fonts.googleapis.com/css2?family=Oswald&display=swap');

.el-menu-demo{
background:#2A7AE4;
}


</style>