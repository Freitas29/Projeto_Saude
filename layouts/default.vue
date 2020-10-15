<template>
  <div>
    <NavBar />
    <nuxt />
    <Chatbot />
    <DarkMode class="theme-mode" />
  </div>
</template>

<script>
import NavBar from '../components/NavBar'
import DarkMode from '../components/DarkMode'
import Chatbot from '../components/Chatbot/Chatbot'
import { mapState } from 'vuex'

export default {
  components: {
    NavBar,
    DarkMode,
    Chatbot
  },
  mounted() {
    this.unsubscribe = this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'changeIsDarkMode') {
        this.handleIsDarkMode(state.isDarkMode)
      }
    })
  },
  beforeDestroy() {
    this.unsubscribe()
  },
  transition: {
    name: 'page',
    mode: 'out-in'
  },
  data() {
    return {
      light: {
        mainColor: '#3F3D56',
        primaryColor: '#6C63FF',
        secondColor: '#02c39a',
        defaultColor: '#E6E6E6',
        textColor: '#E6E6E6',
        darkTextColor: '#3F3D56',
        grayTextColor: '#d4f5ff',
        navBarColor: '#3F3D56'
      },
      dark: {
        mainColor: '#3F3D56 ',
        primaryColor: '#000',
        secondColor: '#0b0a14',
        defaultColor: 'red',
        textColor: '#fff',
        darkTextColor: '#eee',
        grayTextColor: '#ccc',
        navBarColor: '#000'
      }
    }
  },
  transition: {
    name: 'page',
    mode: 'out-in'
  },
  created() {
    const color = localStorage.getItem('color')
    if (color === null) {
      this.changeTheme(this.light)
      this.$store.commit('changeIsDarkMode', false)
    } else if (color === 'dark') {
      this.changeTheme(this.dark)
      this.$store.commit('changeIsDarkMode', true)
    } else {
      this.changeTheme(this.light)
      this.$store.commit('changeIsDarkMode', false)
    }
  },
  methods: {
    changeTheme(theme) {
      const el = document.documentElement

      Object.entries(theme).map(item => {
        el.style.setProperty(
          `--${item[0]
            .split(/(?=[A-Z])/)
            .join('-')
            .toLowerCase()}`,
          item[1]
        )
      })
    },
    handleIsDarkMode(value) {
      if (value) {
        this.changeTheme(this.dark)
        localStorage.setItem('color', 'dark')
      } else {
        this.changeTheme(this.light)
        localStorage.setItem('color', 'light')
      }
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');

html {
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  width: 100%;
}

.theme-mode {
  position: fixed;
  bottom: 10px;
  left: 10px;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
.page-enter-active {
  animation: acrossIn 0.8s ease-out both;
}
.page-leave-active {
  animation: acrossOut 0.4s ease-in both;
}
@keyframes acrossIn {
  0% {
    transform: translate3d(-100%, 0, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}
@keyframes acrossOut {
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(100%, 0, 0);
  }
}
</style>
