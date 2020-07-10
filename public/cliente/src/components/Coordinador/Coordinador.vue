<template>

  <section class="src-components-coordinador">
    <BarraSuperior/>
    <CoordinadorNavbar/> 
    <router-view></router-view>
  </section>

</template>

<script lang="js">

  import CoordinadorNavbar from "./CoordinadorNavbar.vue";
  import BarraSuperior from "../Auxiliares/BarraSuperior.vue"

  export default  {
    name: 'src-components-coordinador',
    components: {
      CoordinadorNavbar,
      BarraSuperior
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
  .src-components-coordinador {

  }

</style>
