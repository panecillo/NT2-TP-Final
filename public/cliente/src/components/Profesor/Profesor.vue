<template>

  <section class="src-components-profesor">
    <BarraSuperior/>
    <ProfesorNavbar/> 
    <router-view></router-view>
  </section>

</template>

<script lang="js">

  import ProfesorNavbar from "./ProfesorNavbar.vue";
  import BarraSuperior from "../Auxiliares/BarraSuperior.vue"

  export default  {
    name: 'src-components-profesor',
    components: {
      ProfesorNavbar,
      BarraSuperior
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
