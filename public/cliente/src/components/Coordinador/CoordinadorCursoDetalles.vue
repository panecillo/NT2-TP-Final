<template>

  <section class="src-components-coordinador-listar-cursos">

    <Header texto="Datos del Curso"/>

    <div class="jumbotron">
      <p>Id: {{ curso.idcurso }}</p>
      <p>Nombre: {{ curso.nombrecurso }}</p>
      <p>Nivel: {{ curso.dificultad }}</p>
      <p>Profesor: {{ curso.apellido }} {{ curso.nombre }}</p>
    </div>

    <Header texto="Alumnos Inscriptos"/>

    <div v-if="alumnos != undefined && alumnos.length">
      <table class="table">
        <tr class="thead-dark">
          <th>Dni</th>
          <th>Nombre</th>
          <th>Email</th>
          <th>Nota 1</th>
          <th>Nota 2</th>
          <th>Nota Final</th>
        </tr>
        <tr v-for="(alumno, dni) in alumnos" :key="dni">
          <td> {{ alumno.dni }} </td>
          <td> {{ alumno.apellido }} {{ alumno.nombre }}</td>
          <td> {{ alumno.email }} </td>
          <td> {{ alumno.nota1 }} </td>
          <td> {{ alumno.nota2 }} </td>
          <td> {{ alumno.notafinal }} </td>
        </tr>
      </table>
    </div>

    <div v-else class="alert alert-danger">
      El curso no tiene alumnos inscriptos
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

  export default  {
    name: 'src-components-coordinador-listar-cursos',
    props: [],
    components: {
      Header
    },
    mounted () {
      this.curso = this.$store.state.curso
      this.alumnos = this.getAlumnosCurso()
      this.horarios = this.getHorariosCurso()
      this.temario = this.getTemarioCurso()   
    },
    data () {
      return {
        curso: "",
        alumnos: [],
        horarios: [],
        temario: []
      }
    },
    methods: {
      getAlumnosCurso() {
        this.axios.get(urlCursos + this.curso.idcurso)
        .then( res => {
          console.log(res.data)
          this.alumnos = res.data
        })
        .catch(error => {
          console.log('ERROR GET HTTP', error)
        })
      },
      getHorariosCurso() {
        this.axios.get(urlCursos + this.curso.idcurso + '/horarios')
        .then( res => {
          console.log(res.data)
          this.horarios = res.data
          this.$store.state.horarios = res.data
          this.$store.dispatch('guardarCursoHorarios',this.horarios)
        })
        .catch(error => {
          console.log('ERROR GET HTTP', error)
        })
      },
      getTemarioCurso() {
        this.axios.get(urlCursos + this.curso.idcurso + '/temario')
        .then( res => {
          console.log(res.data)
          this.temario = res.data
        })
        .catch(error => {
          console.log('ERROR GET HTTP', error)
        })
      },
    },
    computed: {
 
    }
}

</script>

<style scoped lang="css">
  .src-components-coordinador-listar-cursos {

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