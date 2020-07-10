<template>

  <section class="src-components-coordinador-listar-cursos">
    <Header texto="Lista de Cursos"/>
    <table class="table">
      <tr class="thead-dark">
        <th>Id</th>
        <th>Nombre</th>
        <th>Dificultad</th>
        <th>Profesor</th>
        <th>Detalles</th>
      </tr>
      <tr v-for="(curso, idcurso) in cursos" :key="idcurso">
        <td> {{ curso.idcurso }} </td>
        <td> {{ curso.nombrecurso }} </td>
        <td> {{ curso.dificultad }} </td>
        <td> {{ curso.apellido }} {{ curso.nombre }}</td>
        <td> 
          <router-link :to="`/CoordinadorDetallesCurso`">
            <span v-on:click="cargarCurso(curso)">Detalles</span>
          </router-link>
        </td>
      </tr>
    </table>
  </section>

</template>

<script lang="js">

  import Header from '../Auxiliares/Header.vue'
  import { urlCursos } from '../../Dependencias/urls'

  export default  {
    name: 'src-components-coordinador-listar-cursos',
    props: [],
    components: {
      Header
    },
    mounted () {
      this.cursos = this.getCursos()
    },
    data () {
      return {
        cursos: []
      }
    },
    methods: {
      getCursos() {
        this.axios.get(urlCursos + 'cursos')
        .then( res => {
          console.log(res.data)
          this.cursos = res.data
        })
        .catch(error => {
          console.log('ERROR GET HTTP', error)
        })
      },
      cargarCurso(curso) {
        this.$store.dispatch('cargarCurso', curso)
      }
    },
    computed: {

    }
}


</script>

<style scoped lang="css">
  .src-components-coordinador-listar-cursos {

  }

</style>