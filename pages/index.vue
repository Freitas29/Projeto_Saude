<template>
  <div>
    <div class="apresentacao estilo" id="oQueSomos">
      <el-row>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <div class="textos" v-scroll-reveal.reset="{ delay: 100 }">
            <h1>Health Planning</h1>
            <p>
              Buscamos os melhores planos de saúde por cada região do Brasil,
              visando os melhores preços e serviços prestados.
            </p>
          </div>
        </el-col>

        <el-col
          :xs="24"
          :sm="24"
          :md="12"
          :lg="12"
          :xl="12"
          v-scroll-reveal.reset="{ delay: 300 }"
        >
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

    <div class="mapa estilo" id="nossoProduto">
      <el-row type="flex">
        <el-col
          :xs="24"
          :sm="24"
          :md="12"
          :lg="12"
          :xl="12"
          style="display: flex; alignalign-items: center;
          justify-content: center; display: flex;"
        >
          <lottie-player
            v-scroll-reveal.reset="{ delay: 150 }"
            src="https://assets5.lottiefiles.com/packages/lf20_3GdFaM.json"
            background="transparent"
            speed="1"
            style="width: 100%; height: 40vh;"
            loop
            autoplay
          />
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <div class="textos" v-scroll-reveal.reset="{ delay: 300 }">
            <h1>Diferencial</h1>
            <p>
              Comparações entre planos de saúde, verificamos dados regionais
              para dar mais confiança na sua contratação. <br />
            </p>
            <nuxt-link to="Chart">
              <button class="botao">
                Pesquisar
              </button>
            </nuxt-link>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="apresentacao estilo" id="diferencial">
      <el-row>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <lottie-player
            v-scroll-reveal.reset="{ delay: 150 }"
            src="https://assets9.lottiefiles.com/packages/lf20_tnrzlN.json"
            background="transparent"
            speed="1"
            style="width: 100%; height: 40vh;"
            loop
            autoplay
          />

          <div class="textos">
            <h1 v-scroll-reveal.reset="{ delay: 200 }">Objetivo</h1>
            <p v-scroll-reveal.reset="{ delay: 250 }">
              Oferecer informações e recomendações sobre os planos de saúde vigentes
              na região do usuário.
            </p>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <div class="textos">
            <lottie-player
              v-scroll-reveal.reset="{ delay: 150 }"
              src="https://assets6.lottiefiles.com/packages/lf20_pXBLg7.json"
              background="transparent"
              speed="1"
              style="width: 100%; height: 40vh;"
              loop
              autoplay
            />

            <h1 v-scroll-reveal.reset="{ delay: 200 }">Missão</h1>
            <p v-scroll-reveal.reset="{ delay: 250 }">
              Trazer o melhor plano para o cliente com uma unidade mais próxima
              da sua residência.
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
  },
  head() {
    return {
      title: 'Health Planning',
      meta: [
        { hid: 'description', name: 'description', content: 'Buscamos os melhores planos de saúde por cada região do Brasil' },
        { property: 'og:image', content: "@/assets/pingo.png" || '' }
      ]
    }
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

  #oQueSomos {
    background-color: var(--primary-color);
  }

  #nossoProduto {
    background-color: var(--default-color);
  }
}

a {
  cursor: pointer;
}
.mapa {
  background-color: var(--text-color);

  border-radius: 50px;
  top: -69px;
  .textos {
    padding: 10px;
    width: 100%;
    position: relative;
    color: #1d3557;
    padding-right: 3rem;

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

    .botao {
      margin-top: 5rem;
      -moz-box-shadow: 0px 0px 0px 2px #2a5fe4;
      -webkit-box-shadow: 0px 0px 0px 2px #2a5fe4;
      box-shadow: 0px 0px 0px 2px #2a5fe4;
      cursor: pointer;
      transition: all .3s;
      background: -webkit-gradient(
        linear,
        left top,
        left bottom,
        color-stop(0.05, #2a5fe4),
        color-stop(1, #2a7ae4)
      );
      background: -moz-linear-gradient(center top, #2a5fe4 5%, #2a7ae4 100%);
      filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#7892c2', endColorstr='#476e9e');
      background-color: #2a7ae4;
      -webkit-border-top-left-radius: 10px;
      -moz-border-radius-topleft: 10px;
      border-top-left-radius: 10px;
      -webkit-border-top-right-radius: 10px;
      -moz-border-radius-topright: 10px;
      border-top-right-radius: 10px;
      -webkit-border-bottom-right-radius: 10px;
      -moz-border-radius-bottomright: 10px;
      border-bottom-right-radius: 10px;
      -webkit-border-bottom-left-radius: 10px;
      -moz-border-radius-bottomleft: 10px;
      border-bottom-left-radius: 10px;
      text-indent: 0;
      border: 1px solid #2a5fe4;
      display: inline-block;

      font-family: arial;
      font-size: 15px;
      font-weight: bold;
      font-style: normal;
      height: 50px;
      line-height: 50px;
      width: 140px;
      text-decoration: none;
      text-align: center;
      text-shadow: 0px 1px 0px #2a7ae4;
      color: #fff;
    }
    .botao:hover {
      opacity: 0.7;
    }
    .botao:active {
      position: relative;
      top: 1px;
    }
  }
}

.apresentacao {
  background-color: var(--primary-color);

  .textos {
    padding: 10px;
    width: 100%;
    position: relative;
    color: var(--text-color);
    padding-left: 3rem;

    h1 {
      font-size: 50px;
      margin-bottom: 1rem;
      color: var(--gray-text-color);
    }

    p {
      text-align: justify;
      font-size: 30px;
      font-weight: 400;
      color: var(--gray-text-color);
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

#diferencial {
  background-color: var(--main-color);

  h1 {
    color: var(--gray-text-color);
  }

  .textos {
    padding-right: 3rem;
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
