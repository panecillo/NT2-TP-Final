<template>

  <section class="src-components-profesor-curso-detalle" v-if="$store.state.curso && $store.state.alumnos">

    <Header texto="Datos del Curso"/>

    <div class="jumbotron">
      <p>Id: {{ this.$store.state.curso.idcurso }}</p>
      <p>Nombre: {{ this.$store.state.curso.nombrecurso }}</p>
      <p>Nivel: {{ this.$store.state.curso.dificultad }}</p>
      <p>Profesor: {{ this.$store.state.curso.apellido }} {{ this.$store.state.curso.nombre }}</p>
    </div>

    <Header texto="Alumnos Inscriptos"/>

    <div v-if="alumnos != undefined && this.$store.state.alumnos.length">
      <table class="table">
        <tr class="thead-dark">
          <th>Dni</th>
          <th>Nombre</th>
          <th>Email</th>
          <th>Nota 1</th>
          <th>Nota 2</th>
          <th>Nota Final</th>
          <th>Modificar Notas</th>
        </tr>
        <tr v-for="(alumno, dni) in this.$store.state.alumnos" :key="dni">
          <td> {{ alumno.dni }} </td>
          <td> {{ alumno.apellido }} {{ alumno.nombre }}</td>
          <td> {{ alumno.email }} </td>
          <td> {{ alumno.nota1 }} </td>
          <td> {{ alumno.nota2 }} </td>
          <td> {{ alumno.notafinal }} </td>
          <td> 
          <router-link :to="`/ProfesorNotas`">
            <span v-on:click="cargarAlumno(alumno)">Modificar</span>
          </router-link>
        </td>
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
    name: 'src-components-profesor-curso-detalle',
    props: [],
    components: {
      Header
    },
    mounted () {
      this.curso = this.$store.state.curso
      this.getAlumnosCurso()
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
          this.$store.dispatch('cargaAlumnos', res.data)
        })
        .catch(error => {
          console.log('ERROR GET HTTP', error)
        })
      },
      getHorariosCurso() {
        this.axios.get(urlCursos + this.curso.idcurso + '/horarios')
        .then( res => {
          this.horarios = res.data
          this.$store.dispatch('guardarCursoHorarios',this.horarios)
        })
        .catch(error => {
          console.log('ERROR GET HTTP', error)
        })
      },
      getTemarioCurso() {
        this.axios.get(urlCursos + this.curso.idcurso + '/temario')
        .then( res => {
          this.temario = res.data
        })
        .catch(error => {
          console.log('ERROR GET HTTP', error)
        })
      },
      cargarAlumno(alumno) {
        this.$store.dispatch('cargaAlumno', alumno)
      }
    },
    computed: {
 
    }
}

</script>

<style scoped lang="css">
  .src-components-profesor-curso-detalle {

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