<template>

  <section class="src-components-profesor-navbar">

    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="nav-item">
        <router-link :to="`/Profesor`">
          <a class="navbar-brand" href="#">Inicio</a>
        </router-link>
      </div>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link :to="`/CursosProfesor/${dni}/${legajo}`">
              <a class="nav-link" href="#">Mis Cursos</a>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="`/HorariosProfesor/${dni}/${legajo}`">
              <a class="nav-link" href="#">Mis Horarios</a>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="`/OpcionesProfesor/${dni}/${legajo}`">
              <a class="nav-link" href="#">Opciones</a>
            </router-link>
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

  export default  {
    name: 'src-components-profesor-navbar',
    props: ['dni','legajo'],
    mounted () {
    },
    data () {
      return {

      }
    },
    methods: {
      toggleConectado(){
        this.$store.dispatch('toggleConectado')
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
