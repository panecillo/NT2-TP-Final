<template>

  <section class="src-components-profesor-navbar">

    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="nav-item">
        <router-link to="/Profesor" tag="div"> 
          <a class="navbar-brand" href="#">Inicio</a>
        </router-link>
      </div>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/ProfesorCursos" tag="li"> 
              <a class="nav-link" href="#" @click="cargarCursos()">Mis Cursos</a>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/ProfesorHorarios" tag="li"> 
              <a class="nav-link" href="#" @click="getHorariosProfesor()">Mis Horarios</a>
            </router-link>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Opciones
            </a>
            <div class="dropdown-menu bg-dark" aria-labelledby="navbarDropdownMenuLink">
              <a>
                <router-link to="/ProfesorOpcionesDatos" tag="a"> 
                  <a class="nav-link" href="#">Datos Personales</a>
                </router-link>
              </a>
              <a>
                <router-link to="/ProfesorOpcionesContacto" tag="a"> 
                  <a class="nav-link" href="#">Contacto</a>
                </router-link>
              </a>
            </div>
          </li>
          <li class="nav-item">
            <router-link to="/" tag="li"> 
              <a class="nav-link" href="#" @click="toggleConectado()">Cerrar Sesion</a>
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
    
  </section>

</template>

<script lang="js">

  import { urlProfesores } from '../../Dependencias/urls'

  export default  {
    name: 'src-components-profesor-navbar',
    props: ['profesor-navbar'],
    mounted () {
    },
    data () {
      return {

      }
    },
    methods: {
      cargarCursos() {
        this.axios.get(urlProfesores + 'getcursospordni/' + localStorage.getItem('dni'))
        .then( res => {
          this.$store.dispatch('cargarCursos', res.data)
        })
        .catch(error => {
          console.log(`ERROR GET HTTP`, error)
        })
      },
      getHorariosProfesor() {
        this.axios.get(urlProfesores + 'gethorariosporlegajo/' + localStorage.getItem('legajo'))
        .then( res => {
          this.$store.dispatch('guardarHorariosProfesor', res.data)
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
  .src-components-profesor-navbar {

  }

</style>
