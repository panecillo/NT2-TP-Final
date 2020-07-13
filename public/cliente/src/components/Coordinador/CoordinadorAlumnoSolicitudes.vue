<template>

  <section class="src-components-coordinador-solicitudes" v-if="$store.state.solicitudes">
    <Header texto="Solicitudes de Cambio de Curso"/>

    <table class="table">
      <tr class="thead-dark">
        <th>Estado</th>
        <th>Fecha</th>
        <th>DNI</th>
        <th>Curso</th>
        <th>Detalles</th>
      </tr>
      <tr v-for="(solicitud, id) in this.$store.state.solicitudes" :key="id">
        <td> {{ solicitud.estado}} </td>
        <td> {{ solicitud.fechasolicitud  | formatearFecha }} </td>
        <td> {{ solicitud.dni }} </td>
        <td v-if="$store.state.cursos"> {{ getNombreCurso(solicitud.idcurso) }} </td>
        <td> 
          <router-link :to="`/CoordinadorAlumnoSolicitudesDetalles`">
            <span v-on:click="cargaConsulta(solicitud)">Detalles</span>
          </router-link>
        </td>
      </tr>
    </table>
    
  </section>

</template>

<script lang="js">

  import Header from '../Auxiliares/Header.vue'
  import { urlCursos } from '../../Dependencias/urls'
  import { urlAlumnos } from '../../Dependencias/urls'

  export default  {
    name: 'src-components-coordinador-solicitudes',
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
      getInitialData() {  
        return {
          dni: '',
          apellido: '',
          nombre: '',
          email: '',
          direccion: '',
          telefono: ''
        }
      },
      cargaConsulta(solicitud) {
        this.getAlumno(solicitud.dni)
        this.getCurso(solicitud.idcurso)
        this.getSolicitud(solicitud)
      },
      getNombreCurso(idcurso) {
        let i = 0
        let nombreCurso = ''
        while(i < this.$store.state.cursos.length && nombreCurso == '') {
          if(this.$store.state.cursos[i].idcurso == idcurso) {
            nombreCurso = this.$store.state.cursos[i].nombrecurso
          }
          i++
        }
        return nombreCurso
      },
      getAlumno(dni) {
        this.axios.get(urlAlumnos + dni)
        .then( res => {
          this.$store.dispatch('cargaAlumno', res.data[0])
        })
        .catch(error => {
          console.log('ERROR GET HTTP', error)
        })
      },
      getCurso(idcurso) {
        this.axios.get(urlCursos + 'cursos/' + idcurso)
        .then( res => {
          this.$store.dispatch('cargarCurso', res.data)
        })
        .catch(error => {
          console.log('ERROR GET HTTP', error)
        })
      },
      getSolicitud(solicitud) {
        this.solicitud = this.$store.dispatch('cargaSolicitud', solicitud)
      }


    },
    computed: {
      
    }
}


</script>

<style scoped lang="css">
  .src-components-coordinador-solicitudes {

  }
  .jumbotron {
    padding-top: 20px;
    padding-bottom: 5px;
    margin-bottom: 10px;
    background-blend-mode:difference;
    background-color: rgba(190, 211, 238, 0.952);
  }
  .col-1 {
    display: inline-block;
  }
  .alert {
    margin-left: 60px;
    display: inline-block;
  }
  button {
    width: 6rem;
  }
</style>