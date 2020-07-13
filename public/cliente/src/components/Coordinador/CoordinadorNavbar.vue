<template>

  <section class="src-components-coordinador-navbar">

    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="nav-item">
        <router-link to="/Coordinador" tag="div"> 
          <a class="navbar-brand" href="#">Inicio</a>
        </router-link>
      </div>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Cursos
            </a>
            <div class="dropdown-menu bg-dark" aria-labelledby="navbarDropdownMenuLink">
              <a>
                <router-link to="/CoordinadorCursoListar" tag="a"> 
                  <a class="nav-link" href="#">Listar Cursos</a>
                </router-link>
              </a>
              <a>
                <router-link to="/CoordinadorCursoAlta" tag="a"> 
                  <a class="nav-link" href="#">Alta de Curso</a>
                </router-link>
              </a>
            </div>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Alumnos
            </a>
            <div class="dropdown-menu bg-dark" aria-labelledby="navbarDropdownMenuLink">
              <a>
                <router-link to="/CoordinadorAlumnoListar" tag="a"> 
                  <a class="nav-link" href="#">Listar Alumnos</a>
                </router-link>
              </a>
              <a>
                <router-link to="/CoordinadorAlumnoAlta" tag="a"> 
                  <a class="nav-link" href="#">Alta de Alumno</a>
                </router-link>
              </a>
              <a>
                <router-link to="/CoordinadorAlumnoSolicitudes" tag="a"> 
                  <a class="nav-link" href="#" @click="cargarSolicitudes()">Solicitudes</a>
                </router-link>
              </a>
            </div>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Profesores
            </a>
            <div class="dropdown-menu bg-dark" aria-labelledby="navbarDropdownMenuLink">
              <a>
                <router-link to="/CoordinadorProfesorListar" tag="a"> 
                  <a class="nav-link" href="#">Listar Profesores</a>
                </router-link>
              </a>
              <a>
                <router-link to="/CoordinadorProfesorAlta" tag="a"> 
                  <a class="nav-link" href="#">Alta de Profesor</a>
                </router-link>
              </a>
              <a>
                <router-link to="/CoordinadorProfesorConsultas" tag="a"> 
                  <a class="nav-link" href="#">Consultas</a>
                </router-link>
              </a>
            </div>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Opciones
            </a>
            <div class="dropdown-menu bg-dark" aria-labelledby="navbarDropdownMenuLink">
              <a>
                <router-link to="/CoordinadorOpcionesDatos" tag="a"> 
                  <a class="nav-link" href="#">Datos Personales</a>
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

  import { urlAlumnos } from '../../Dependencias/urls'
  import { urlCursos } from '../../Dependencias/urls'

  export default  {
    name: 'src-components-coordinador-navbar',
    props: ['coordinador-navbar'],
    mounted () {
    },
    data () {
      return {

      }
    },
    methods: {
      cargarSolicitudes() {
        this.axios.get(urlCursos + 'cursos')
        .then( res2 => {
          this.$store.dispatch('cargarCursos', res2.data)
        })
        .catch(error => {
          console.log('ERROR GET HTTP', error)
        })
        this.axios.get(urlAlumnos + 'solicitudescambiocurso/')
        .then( res => {
          this.$store.dispatch('cargaSolicitudes', res.data)
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
  .src-components-coordinador-navbar {

  }
  .collapse navbar-collapse {

  }
</style>