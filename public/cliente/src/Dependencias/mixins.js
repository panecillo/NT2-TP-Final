import Vue from "vue";

var miMixin = {
  methods: {
    getUrl() {
      return this.$store.state.url
    },

    postearAlumnoAAxios(post)
    {
      this.$store.dispatch('actionPostearAlumnoAxios', post)
    },

    recuperarEmpleadoLocalStorage() 
    {
      this.$store.dispatch('recuperarEmpleadoLocalStorage')
    },

    getDniEmpleado() 
    {
      return this.$store.state.usuario.dni
    },

    getLegajoEmpleado()
    {
      return this.$store.state.usuario.legajo
    }
    

  },
  computed: {

    getArrayProfesores() {
      return this.$store.state.ArrayProfesores
    },

    cargarArrayProfesores()
    {
      this.$store.dispatch('actionCargarArrayProfesores')
    }
  },
  created() {
    
  }

}

Vue.mixin(miMixin)
