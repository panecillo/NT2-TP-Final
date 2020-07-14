<template>

  <section class="src-components-coordinador-solicitudes" v-if="$store.state.solicitudes">
    <Header texto="Solicitudes de Cambio de Curso"/>

      <input type="checkbox" id="checkbox" v-model="verPendientes" style="display:none" v-on:click="aplicarFiltro()">
      <label for="checkbox" class="btn btn-primary active" v-bind:style="colorFiltro()">{{ verBotonFiltro }}</label>

    <br>

    <table class="table">
      <tr class="thead-dark">
        <th>Estado</th>
        <th>Fecha</th>
        <th>DNI</th>
        <th>Curso</th>
        <th>Detalles</th>
      </tr>
      <tr class="fila" v-bind:style="colorEstado(solicitud.estado)" v-for="(solicitud, id) in this.$store.state.solicitudes" :key="id">
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
        verPendientes: false,
        botonFiltro: "Mostrar Solo Pendientes"
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
        if(idcurso) {
          this.axios.get(urlCursos + 'cursos/' + idcurso)
          .then( res => {
            this.$store.dispatch('cargarCurso', res.data)
          })
          .catch(error => {
            console.log('ERROR GET HTTP', error)
          })
        }
        else {
          this.getCursos()
          this.$store.dispatch('cargarCurso', null)
        }
        
      },
      getSolicitud(solicitud) {
        this.solicitud = this.$store.dispatch('cargaSolicitud', solicitud)
      },
      colorEstado(estado) {
        let colorEstado = {
          color: '',
          backgroundColor: '',
          display: ''
        }
        switch(estado) {
        case "Procesado": 
          colorEstado.color = "white";
          colorEstado.backgroundColor = "lightgreen";
          break;
        case "Rechazado":
          colorEstado.color = "white";
          colorEstado.backgroundColor = "lightcoral";
          break;
        default:
          colorEstado.color = "black";
          colorEstado.backgroundColor = "";
        }
        if(this.verPendientes && estado != "Pendiente") {
          colorEstado.display = "none"
        }
        return colorEstado
      },
      aplicarFiltro() {
        this.verPendientes = !this.verPendientes
        if(!this.verPendientes) {
          this.botonFiltro = "Mostrar Solo Pendientes"
        }
        else {
          this.botonFiltro = "Mostrar Todos"
        }
      },
      colorFiltro() {
        let colorFiltro = {
          color: '',
          backgroundColor: '',
          display: ''
        }
        if(this.verPendientes) {
          colorFiltro.background = "green"
          colorFiltro.color = "white"
        }
        return colorFiltro
      },
      getCursos() {
        this.axios.get(urlCursos + 'cursos')
        .then( res => {
          let i = 0
          let cursosConProfesores = []
          while(res.data != null && i < res.data.length)
          {
            if(res.data[i].legajo != null) {
              cursosConProfesores.push(res.data[i])
              this.$store.dispatch('cargarCursos', cursosConProfesores)
            }
            i++
          }
          this.cursosConProfesores = cursosConProfesores
        })
        .catch(error => {
          console.log('ERROR GET HTTP', error)
        })
      }
    },
    computed: {
        verBotonFiltro() {
          return this.botonFiltro
        }
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
  .btn {
    margin-left: 1rem;
    margin-bottom: 1rem;
    height: 2.5rem;
    width: 15rem;
  }
</style>