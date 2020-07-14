<template>

  <section class="src-components-alumno-profesor">
    <Header texto="Mi Profesor"/>

    <div v-if="$store.state.tengoCurso">

      <div class="jumbotron">
        <p>Nombre: {{ profesor[0].apellido }} {{ profesor[0].nombre }}</p>
        <p>Telefono: {{ profesor[0].telefono }}</p>
        <p>Email: {{ profesor[0].email }}</p>
      </div>

    </div>

    <div v-else class="alert alert-danger">
      No tienes ningún profesor
    </div>

  </section>

</template>

<script lang="js">

  import Header from '../Auxiliares/Header.vue'
  import { urlCoordinadores } from '../../Dependencias/urls'

  export default  {
    name: 'src-components-alumno-profesor',
    props: [],
    components: {
      Header
    },
    mounted () {
      if(this.$store.state.tengoCurso) {
        this.getProfesor()
      }
    },
    data () {
      return {
        profesor: ''
      }
    },
    methods: {
      getProfesor() {
        this.axios.get(urlCoordinadores + 'getprofesorporcurso/' + this.$store.state.usuario.idcurso)
        .then( res => {
          this.profesor = res.data
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
  .src-components-alumno-profesor {

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
