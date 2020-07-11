<template>

  <section class="src-components-coordinador-listar-alumnos">
    <Header texto="Lista de Alumnos"/>
    <table class="table">
      <tr class="thead-dark">
        <th>DNI</th>
        <th>Nombre</th>
        <th>Email</th>
        <th>Detalles</th>
        <th>Modificar</th>
      </tr>
      <tr v-for="(alumno, id) in alumnos" :key="id">
        <td> {{ alumno.dni }} </td>
        <td> {{ alumno.apellido }} {{ alumno.nombre}} </td>
        <td> {{ alumno.email }} </td>
        <td> 
          <router-link :to="`/CoordinadorAlumnoDetalles`">
            <span v-on:click="cargaAlumno(alumno)">Detalles</span>
          </router-link>
        </td>
        <td> 
          <router-link :to="`/CoordinadorAlumnoModificacion`">
            <span v-on:click="cargaAlumno(alumno)">Modificar</span>
          </router-link>
        </td>
      </tr>
    </table>
  </section>

</template>

<script lang="js">

  import Header from '../Auxiliares/Header.vue'
  import { urlAlumnos } from '../../Dependencias/urls'

  export default  {
    name: 'src-components-coordinador-listar-alumnos',
    props: [],
    components: {
      Header
    },
    mounted () {
      this.alumnos = this.getAlumnos()
    },
    data () {
      return {
        alumnos: []
      }
    },
    methods: {
      cargaAlumno(alumno) {
        this.$store.dispatch('cargaAlumno', alumno)
      },
      getAlumnos() {
        this.axios.get(urlAlumnos)
        .then( res => {
          console.log(res.data)
          this.alumnos = res.data
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
  .src-components-coordinador-listar-alumnos {

  }
</style>