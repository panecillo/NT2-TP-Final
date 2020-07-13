<template>

  <section class="src-components-profesor">
    <BarraSuperior/>
    <ProfesorNavbar/> 
    <router-view></router-view>

    

    <Footer/>

  </section>

</template>

<script lang="js">

  import ProfesorNavbar from "./ProfesorNavbar.vue";
  import BarraSuperior from "../Auxiliares/BarraSuperior.vue"
  import Footer from "../Auxiliares/Footer.vue"

  export default  {
    name: 'src-components-profesor',
    components: {
      ProfesorNavbar,
      BarraSuperior,
      Footer
    },
    props: [],
    beforeCreate() {
      this.$store.dispatch('recuperarEmpleadoLocalStorage')
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
  .src-components-profesor {

  }
</style>
