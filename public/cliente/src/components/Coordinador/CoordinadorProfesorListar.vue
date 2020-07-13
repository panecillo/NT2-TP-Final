<template>

  <section class="src-components-coordinador-listar-profesores">
    <Header texto="Lista de Profesores"/>
    <table class="table">
      <tr class="thead-dark">
        <th>DNI</th>
        <th>Legajo</th>
        <th>Nombre</th>
        <th>Email</th>
        <th>Detalles</th>
        <th>Modificar</th>
      </tr>
      <tr v-for="(profesor, id) in profesores" :key="id">
        <td> {{ profesor.dni }} </td>
        <td> {{ profesor.legajo }} </td>
        <td> {{ profesor.apellido }} {{ profesor.nombre}} </td>
        <td> {{ profesor.email }} </td>
        <td> 
          <router-link :to="`/CoordinadorProfesorDetalles`">
            <span v-on:click="cargaProfesor(profesor)">Detalles</span>
          </router-link>
        </td>
        <td> 
          <router-link :to="`/CoordinadorProfesorModificacion`">
            <span v-on:click="cargaProfesor(profesor)">Modificar</span>
          </router-link>
        </td>
      </tr>
    </table>
  </section>

</template>

<script lang="js">

  import Header from '../Auxiliares/Header.vue'
  import { urlProfesores } from '../../Dependencias/urls'

  export default  {
    name: 'src-components-coordinador-listar-profesores',
    props: [],
    components: {
      Header
    },
    mounted () {
      this.profesores = this.getProfesores()
    },
    data () {
      return {
        profesores: []
      }
    },
    methods: {
      cargaProfesor(profesor) {
        this.$store.dispatch('cargaProfesor', profesor)
      },
      getProfesores() {
        this.axios.get(urlProfesores)
        .then( res => {
          this.profesores = res.data
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
  .src-components-coordinador-listar-profesores {

  }
</style>