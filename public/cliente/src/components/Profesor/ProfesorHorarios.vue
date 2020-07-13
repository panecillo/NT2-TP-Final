<template>

  <section class="src-components-profesor-horarios">
    <Header texto="Mis Horarios"/>

    <div v-if="this.$store.state.horariosProfesor != undefined && this.$store.state.horariosProfesor.length">
      <table class="table">
        <tr class="thead-dark">
          <th>Numero</th>
          <th>Curso</th>
          <th>Fecha y Hora</th>
        </tr>
        <tr v-for="(horario, id) in this.$store.state.horariosProfesor" :key="id">
          <td> {{ id + 1 }} </td>
          <td> {{ horario.nombrecurso }} </td>
          <td> {{ horario.fechaclase | formatearFecha }} </td>
        </tr>
      </table>
    </div>
    <div v-else class="alert alert-danger">
      El profesor no tiene clases programadas
    </div>

  </section>

</template>

<script lang="js">

  import Header from '../Auxiliares/Header.vue'

  export default  {
    name: 'src-components-profesor-horarios',
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
      
    },
    computed: {

    }
}


</script>

<style scoped lang="css">
  .src-components-profesor-horarios {

  }
  .jumbotron {
    padding-top: 20px;
    padding-bottom: 15px;
    margin-bottom: 10px;

  }
  p {
    font-style: italic;
    font-weight: 600;
  }
</style>