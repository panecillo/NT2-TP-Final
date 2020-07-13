<template>

  <section class="src-components-alumno">
    <BarraSuperior/>
    <AlumnoNavbar/> 
    <router-view></router-view>
    <Footer/>

  </section>

</template>

<script lang="js">

  import AlumnoNavbar from "./AlumnoNavbar.vue";
  import BarraSuperior from "../Auxiliares/BarraSuperior.vue"
  import Footer from "../Auxiliares/Footer.vue"

  export default  {
    name: 'src-components-alumno',
    components: {
      AlumnoNavbar,
      BarraSuperior,
      Footer
    },
    props: [],
    beforeCreate() {
      this.$store.dispatch('recuperarAlumnoLocalStorage')
    },
    mounted () {

    },
    data () {
      return {

      }
    },
    methods: {

    },
    computed: {
      
    }
}


</script>

<style scoped lang="css">
  .src-components-alumno {

  }
</style>
