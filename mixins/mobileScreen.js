export default {
  data() {
    return {
      isMobile: false
    }
  },
  methods: {
    handleScreen() {
      if (window.innerWidth <= 600) {
        this.isMobile = true
        return
      }

      this.isMobile = false
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleScreen)
    this.handleScreen()
  }
}
