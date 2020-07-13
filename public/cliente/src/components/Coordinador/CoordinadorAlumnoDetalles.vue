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

    <div class="jumbotron" v-if="curso != ''">
      <p>Id: {{ curso.idcurso }}</p>
      <p>Nombre: {{ curso.nombrecurso }}</p>
      <p>Nivel: {{ curso.dificultad }}</p>
      <p>Profesor: {{ curso.apellido }} {{ curso.nombre }}</p>
    </div>
    <div v-else class="alert alert-danger">
      El alumno no está inscripto en ningún curso
    </div>

    <Header texto="Notas"/>

    <div class="jumbotron" v-if="!((nota1 == null && nota2 == null && notaFinal == null) || (nota1 == '' && nota2 == '' && notaFinal == ''))">
      <p>Nota 1: {{ nota1 }}</p>
      <p>Nota 2: {{ nota2 }}</p>
      <p>Nota Final: {{ notaFinal }}</p>
    </div>
    <div v-else class="alert alert-danger">
      El alumno no tienen ninguna califiacción
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
            }
          })
        })
        .catch(error => {
          console.log('ERROR GET HTTP', error)
        })
      },
      getNotas() {
        let i = 0
        this.axios.get(urlCursos + this.alumno.idcurso)
        .then( res => {
          while(i < res.data.length) {
            if(res.data[i].dni == this.alumno.dni) {
              this.nota1 = res.data[i].nota1
              this.nota2 = res.data[i].nota2
              this.notaFinal = res.data[i].notaFinal
            }
            i++
          }
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