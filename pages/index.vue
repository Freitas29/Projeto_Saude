<template>
  <div>
    <div class="apresentacao estilo">
      <el-row>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <div class="textos">
            <h1>Teste</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse eu placerat felis, quis lobortis nisi. Nunc ut
              interdum libero. Fusce posuere vel tortor sed maximus.
            </p>
          </div>
        </el-col>

        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <lottie-player
            src="https://assets10.lottiefiles.com/packages/lf20_ebikt2.json"
            background="transparent"
            speed="1"
            style="width: 100%; height: 40vh;"
            loop
            autoplay
          />
        </el-col>
      </el-row>
    </div>

    <div class="mapa estilo">
      <el-row>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <lottie-player
            src="https://assets5.lottiefiles.com/packages/lf20_3GdFaM.json"
            background="transparent"
            speed="1"
            style="width: 100%; height: 40vh;"
            loop
            autoplay
          />
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <div class="textos">
            <h1>Teste</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse eu placerat felis, quis lobortis nisi. Nunc ut
              interdum libero. Fusce posuere vel tortor sed maximus.
            </p>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="apresentacao estilo">
      <el-row>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <lottie-player
            src="https://assets9.lottiefiles.com/packages/lf20_tnrzlN.json"
            background="transparent"
            speed="1"
            style="width: 100%; height: 40vh;"
            loop
            autoplay
          />

          <div class="textos">
            <h1>Teste</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse eu placerat felis, quis lobortis nisi. Nunc ut
              interdum libero. Fusce posuere vel tortor sed maximus.
            </p>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <div class="textos">
            <lottie-player
              src="https://assets6.lottiefiles.com/packages/lf20_pXBLg7.json"
              background="transparent"
              speed="1"
              style="width: 100%; height: 40vh;"
              loop
              autoplay
            />

            <h1>Teste</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse eu placerat felis, quis lobortis nisi. Nunc ut
              interdum libero. Fusce posuere vel tortor sed maximus.
            </p>
          </div>
        </el-col>
      </el-row>
    </div>
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
.estilo {
  margin: 0 auto;
  min-height: 111vh;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  position: relative;
}
.mapa {
  background-color: #fff;

  border-radius: 50px;
  top: -69px;
  .textos {
    padding: 10px;
    width: 100%;
    position: relative;
    color: #1d3557;

    h1 {
      font-size: 50px;
      margin-bottom: 1rem;
      color: #1d3557;
    }

    p {
      text-align: justify;
      font-size: 30px;
      font-weight: 400;
      color: #1d3557;
    }
  }
}

.apresentacao {
  background-color: #2a7ae4;

  .textos {
    padding: 10px;
    width: 100%;
    position: relative;
    color: #fff;

    h1 {
      font-size: 50px;
      margin-bottom: 1rem;
      color: #d4f5ff;
    }

    p {
      text-align: justify;
      font-size: 30px;
      font-weight: 400;
      color: #d4f5ff;
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

@media only screen and (max-width: 600px) {
  .textos {
    padding: 10px;

    h1 {
      font-size: 30px !important;
    }

    p {
      font-size: 18px !important;
    }
  }
}
</style>
