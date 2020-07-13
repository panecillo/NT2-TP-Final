<template>

  <section class="src-components-alumno-curso"  v-if="this.$store.state.curso">
    <Header texto="Mi Curso"/>

    <div class="jumbotron" v-if="this.$store.state.curso">
      <p>Id: {{ this.$store.state.curso[0].idcurso }}</p>
      <p>Nombre: {{ this.$store.state.curso[0].nombrecurso }}</p>
      <p>Nivel: {{ this.$store.state.curso[0].dificultad }}</p>
      <p>Profesor: {{ this.$store.state.curso[0].apellido }} {{ this.$store.state.curso[0].nombre }}</p>
    </div>

    <Header texto="Notas"/>

    <div v-if="notas && !(notas.nota1 == '' && notas.nota2 == '' && notas.notaFinal == '')">
      <table class="table">
        <tr class="thead-dark">
          <th>Nota 1</th>
          <th>Nota 2</th>
          <th>Nota Final</th>
        </tr>
        <tr class="t">
          <td> {{ notas.nota1 }} </td>
          <td> {{ notas.nota2 }} </td>
          <td> {{ notas.notafinal }} </td>
        </tr>
      </table>
    </div>

    <div v-else class="alert alert-danger">
      El alumno no tiene notas cargadas
    </div>

    <Header texto="Cronograma de Clases"/>

    <div v-if="horarios != undefined && horarios.length">
      <table class="table">
        <tr class="thead-dark">
          <th>Clase</th>
          <th>Fecha y Hora</th>
        </tr>
        <tr v-for="(horario, id) in horarios" :key="id">
          <td> {{ id + 1 }} </td>
          <td> {{ horario.fechaclase | formatearFecha }} </td>
        </tr>
      </table>
    </div>

    <div v-else class="alert alert-danger">
      El curso no tiene clases programadas
    </div>

    <Header texto="Temario"/>

    <div v-if="temario != undefined && temario.length">
      <table class="table">
        <tr class="thead-dark">
          <th>Tema</th>
          <th>Descripción</th>
        </tr>
        <tr v-for="(temario, id) in temario" :key="id">
          <td> {{ id + 1 }} </td>
          <td> {{ temario.tema }} </td>
        </tr>
      </table>
    </div>

    <div v-else class="alert alert-danger">
      El curso no tiene temas asignados
    </div>

  </section>

</template>

<script lang="js">

  import Header from '../Auxiliares/Header.vue'
  import { urlCursos } from '../../Dependencias/urls'
  import { urlAlumnos } from '../../Dependencias/urls'

  export default  {
    name: 'src-components-alumno-curso',
    props: [],
    components: {
      Header
    },
    mounted () {
      this.curso = this.$store.state.curso
      this.getNotas()
      this.getHorariosCurso()
      this.getTemarioCurso() 
    },
    data () {
      return {
        curso: '',
        notas: undefined,
        horarios: [],
        temario: []
      }
    },
    methods: {
      getNotas() {
        this.axios.get(urlAlumnos + 'notas/' + this.$store.state.usuario.dni)
        .then( res => {
          this.notas = res.data[0]
        })
        .catch(error => {
          console.log('ERROR GET HTTP', error)
        })
      },
      getHorariosCurso() {
        this.axios.get(urlCursos + this.$store.state.usuario.idcurso + '/horarios')
        .then( res => {
          this.horarios = res.data
          this.$store.dispatch('guardarCursoHorarios',this.horarios)
        })
        .catch(error => {
          console.log('ERROR GET HTTP', error)
        })
      },
      getTemarioCurso() {
        this.axios.get(urlCursos + this.$store.state.usuario.idcurso + '/temario')
        .then( res => {
          this.temario = res.data
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
  .src-components-alumno-curso {

  }
  .jumbotron {
    padding-top: 20px;
    padding-bottom: 15px;
    margin-bottom: 10px;

  }
  td {
    font-style: italic;
    font-weight: 600;
  }
  p {
    font-style: italic;
    font-weight: 600;
  }
</style>