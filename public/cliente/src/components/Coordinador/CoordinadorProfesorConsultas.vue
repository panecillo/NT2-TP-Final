<template>

  <section class="src-components-coordinador-consultas">
    <Header texto="Consultas de Profesores"/>
    
    <table class="table">
      <tr class="thead-dark">
        <th>Leida</th>
        <th>Id</th>
        <th>Fecha</th>
        <th>Nombre</th>
        <th>Detalles</th>
      </tr>
      <tr v-for="(consulta, id) in consultas" :key="id">
        <td> {{ consulta.leida | leida }} </td>
        <td> {{ consulta.idConsulta }} </td>
        <td> {{ consulta.fecha  | formatearFecha }} </td>
        <td> {{ consulta.apellido }} {{ consulta.nombre}} </td>
        <td> 
          <router-link :to="`/CoordinadorProfesorConsultasDetalles`">
            <span v-on:click="cargaConsulta(consulta)">Detalles</span>
          </router-link>
        </td>
      </tr>
    </table>
  </section>

</template>

<script lang="js">

  import Header from '../Auxiliares/Header.vue'
  import { urlCoordinadores } from '../../Dependencias/urls'

  export default  {
    name: 'src-components-coordinador-consultas',
    props: [],
    components: {
      Header
    },
    mounted () {
      this.consultas = this.getConsultas()
    },
    data () {
      return {
        consultas: []
      }
    },
    methods: {
      cargaConsulta(consulta) {
        this.$store.dispatch('cargaConsulta', consulta)
      },
      getConsultas() {
        this.axios.get(urlCoordinadores + 'getconsultasprofesores/')
        .then( res => {
          this.consultas = res.data
        })
        .catch(error => {
          console.log('ERROR GET HTTP', error)
        })
      }
    },
    computed: {

    }
}


</script>

<style scoped lang="css">
  .src-components-coordinador-consultas {

  }
</style>