<template>

  <section class="src-components-coordinador-alta-profesor">

    <Header texto="Datos del Profesor"/>

    <div class="jumbotron">
      <p>Dni: {{ profesor.dni }}</p>
      <p>Legajo: {{ profesor.legajo }}</p>
      <p>Nombre: {{ profesor.apellido }} {{ profesor.nombre }}</p>
      <p>Email: {{ profesor.email }}</p>
      <p>Dirección: {{ profesor.direccion }}</p>
      <p>Telefono: {{ profesor.telefono }}</p>
    </div>

    <Header texto="Cursos"/>

    <div v-if="cursos != undefined && cursos.length">
      <table class="table">
        <tr class="thead-dark">
          <th>Id</th>
          <th>Nombre</th>
          <th>Detalles</th>
        </tr>
        <tr v-for="(curso, idCurso) in cursos" :key="idCurso">
          <td> {{ curso.idcurso }} </td>
          <td> {{ curso.nombrecurso}} </td>
          <td> 
            <router-link :to="`/CoordinadorCursoDetalles`">
              <span v-on:click="cargarCurso(curso)">Detalles</span>
            </router-link>
          </td>
        </tr>
      </table>
    </div>
    <div v-else class="alert alert-danger">
      El profesor no tiene cursos asignados
    </div>

    <Header texto="Cronograma de Clases"/>

    <div v-if="horarios != undefined && horarios.length">
      <table class="table">
        <tr class="thead-dark">
          <th>Numero</th>
          <th>Curso</th>
          <th>Fecha y Hora</th>
        </tr>
        <tr v-for="(horario, id) in horarios" :key="id">
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
  import { urlProfesores } from '../../Dependencias/urls'

  export default  {
    name: 'src-components-coordinador-alta-profesor',
    props: [],
    components: {
      Header
    },
    mounted () {
      this.profesor = this.$store.state.profesor
      this.cursos = this.getCursosProfesor()
      this.horarios = this.getHorariosProfesor()
    },
    data () {
      return {
        cursos: [],
        horarios: [],
        profesor: ""
      }
    },
    methods: {
      getCursosProfesor() {
        this.axios.get(urlProfesores + 'getcursosporlegajo/' + this.profesor.legajo)
        .then( res => {
          this.cursos = res.data
        })
        .catch(error => {
          console.log('ERROR GET HTTP', error)
        })
      },
      cargarCurso(curso) {
        let cursoCompleto = {
          idcurso: curso.idcurso,
          nombrecurso: curso.nombrecurso,
          apellido: this.profesor.apellido,
          nombre: this.profesor.nombre
        }
        this.$store.dispatch('cargarCurso', cursoCompleto)
      },
      getHorariosProfesor() {
        this.axios.get(urlProfesores + 'gethorariosporlegajo/' + this.profesor.legajo)
        .then( res => {
          this.horarios = res.data
          this.$store.state.horarios = res.data
          this.$store.dispatch('guardarHorariosProfesor',this.horarios)
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
  .src-components-coordinador-alta-profesor {

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