<template>

  <section class="src-components-alumno-navbar">

    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="nav-item">
        <router-link to="/Alumno" tag="div"> 
          <a class="navbar-brand" href="#">Inicio</a>
        </router-link>
      </div>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/AlumnoCurso" tag="li"> 
              <a class="nav-link" href="#" v-on:click="getCurso()">Mi Curso</a>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/AlumnoProfesor" tag="li"> 
              <a class="nav-link" href="#">Mi Profesor</a>
            </router-link>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Opciones
            </a>
            <div class="dropdown-menu bg-dark" aria-labelledby="navbarDropdownMenuLink">
              <a>
                <router-link to="/AlumnoOpcionesDatos" tag="a"> 
                  <a class="nav-link" href="#">Datos Personales</a>
                </router-link>
              </a>
              <a>
                <router-link to="/AlumnoOpcionesSolicitud" tag="a"> 
                  <a class="nav-link" href="#" v-on:click="getCurso()">Cambio de Curso</a>
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

  import { urlCursos } from '../../Dependencias/urls'

  export default  {
    name: 'src-components-alumno-navbar',
    props: ['alumno-navbar'],
    mounted () {
    },
    data () {
      return {

      }
    },
    methods: {
      
      getCurso() {
        this.$store.dispatch('tengoCurso')
        console.log(this.$store.state.tengoCurso)
        if(this.$store.state.tengoCurso) {
          this.axios.get(urlCursos + 'cursos/' + this.$store.state.usuario.idcurso)
          .then( res => {
            this.$store.dispatch('cargarCurso',res.data)
          })
          .catch(error => {
            console.log('ERROR GET HTTP', error)
          })
        }
      },

    },
    computed: {

    }
}


</script>

<style scoped lang="css">
  .src-components-alumno-navbar {

  }
</style>
