<template>

  <section class="src-components-profesor-cursos" v-if="$store.state.cursos">
    <Header texto="Mis Cursos"/>
    <table class="table">
      <tr class="thead-dark">
        <th>Id</th>
        <th>Nombre</th>
        <th>Detalles</th>
      </tr>
      <tr v-for="(curso, id) in this.$store.state.cursos" :key="id">
        <td> {{ curso.idcurso }} </td>
        <td> {{ curso.nombrecurso }} </td>
        <td> 
          <router-link :to="`/ProfesorCursosDetalle`">
            <span v-on:click="cargarCurso(curso)">Detalles</span>
          </router-link>
        </td>
      </tr>
    </table>
  </section>

</template>

<script lang="js">

  import Header from '../Auxiliares/Header.vue'
  
  export default  {
    name: 'src-components-profesor-cursos',
    props: [],
    components: {
      Header
    },
    mounted () {
    },
    data () {
      return {

      }
    },
    methods: {
      cargarCurso(curso) {
        this.$store.dispatch('cargarCurso', curso)
      }
    },
    computed: {

    }
}


</script>

<style scoped lang="css">
  .src-components-profesor-cursos {

  }
</style>