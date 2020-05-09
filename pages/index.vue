<template>
  <div class="apresentacao">
    <div class="textos">
      <h1>Teste</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eu
        placerat felis, quis lobortis nisi. Nunc ut interdum libero. Fusce
        posuere vel tortor sed maximus.
      </p>
    </div>
    <lottie-player
      src="https://assets10.lottiefiles.com/packages/lf20_ebikt2.json"
      background="transparent"
      speed="1"
      style="width: 500px; height: 500px;"
      loop
      autoplay
    />
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import '@lottiefiles/lottie-player'

export default {
  components: {
    Logo
  }
}
</script>
<style lang="scss" scoped>
.apresentacao {
  margin: 0 auto;
  min-height: 93.8vh;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  background-color: #2a7ae4;
  position: relative;

  .textos {
    width: 50%;
    position: relative;
    color: #fff;
    

    h1{
      font-size: 50px;
      margin-bottom: 1rem;
      color: #D4F5FF
    }

    p{
      text-align: justify;
      font-size: 30px;
      font-weight: 700;
      color: #D4F5FF
    }
  }

  .subtitle {
    font-weight: 300;
    font-size: 42px;
    color: #526488;
    word-spacing: 5px;
    padding-bottom: 15px;
  }

  .links {
    padding-top: 15px;
  }
}
</style>
