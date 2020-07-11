<template>

  <section class="src-components-coordinador-listar-cursos">

    <Header texto="Datos del Alumno"/>

    <div class="jumbotron">
      <p>Dni: {{ alumno.dni }}</p>
      <p>Nombre: {{ alumno.apellido }} {{ alumno.nombre }}</p>
      <p>Email: {{ alumno.email }}</p>
      <p>Dirección: {{ alumno.direccion }}</p>
      <p>Telefono: {{ alumno.telefono }}</p>
    </div>

    <Header texto="Curso"/>

    <div class="jumbotron">
      <p>Id: {{ curso.idcurso }}</p>
      <p>Nombre: {{ curso.nombrecurso }}</p>
      <p>Nivel: {{ curso.dificultad }}</p>
      <p>Profesor: {{ curso.apellido }} {{ curso.nombre }}</p>
    </div>

    <Header texto="Notas"/>

    <div class="jumbotron">
      <p>Nota 1: {{ nota1 }}</p>
      <p>Nota 2: {{ nota2 }}</p>
      <p>Nota Final: {{ notaFinal }}</p>
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
      this.alumno = this.$store.state.alumno
      this.getCurso()
      this.getNotas()  
    },
    data () {
      return {
        alumno: "",
        curso: "",
        nota1: "",
        nota2: "",
        notaFinal: "",
      }
    },
    methods: {
      getCurso() {
        this.axios.get(urlCursos + 'cursos/')
        .then( res => {
          res.data.forEach(curso => {
            if(curso.idcurso == this.alumno.idcurso) {
              this.curso = curso
              console.log(curso)
            }
          })
        })
        .catch(error => {
          console.log('ERROR GET HTTP', error)
        })
      },
      getNotas() {
        this.axios.get(urlCursos + this.alumno.idcurso)
        .then( res => {
          res.data.forEach(alumno => {
            if(alumno.dni == this.alumno.dni) {
              this.nota1 = alumno.nota1
              this.nota2 = alumno.nota2
              this.notaFinal = alumno.notaFinal
            }
          })
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
  p {
    font-style: italic;
    font-weight: 600;
  }

</style>