<template>

  <section class="src-components-coordinador-listar-cursos">

    <Header texto="Detalle de Solicitud de Cambio de Curso"/>

    <div class="jumbotron" v-if="this.$store.state.alumno && this.$store.state.solicitud && this.$store.state.curso">
      <p>Fecha: {{ this.$store.state.solicitud.fechasolicitud | formatearFecha }}</p>
      <hr>
      <h5>Datos del alumno</h5>
      <p class="sub">Nombre: {{ this.$store.state.alumno.apellido }} {{ this.$store.state.alumno.nombre }}</p>
      <p class="sub">Dni: {{ this.$store.state.solicitud.dni }}</p>
      <hr>
      <h5>Datos del Nuevo Curso</h5>
      <p class="sub">Curso: {{ this.$store.state.curso[0].nombrecurso }}</p>
      <p class="sub">Nivel: {{ this.$store.state.curso[0].dificultad }}</p>
      <hr>
      <h5>Estado: {{ solicitud.estado}}</h5>
      <div class="col-2">
        <button class="btn btn-success my-4" :disabled="enviando" v-on:click="procesar()">{{ this.etiquetaBotonProcesar }}</button>
      </div>
      <div class="col-2">
        <button class="btn btn-danger my-4" :disabled="enviando" v-on:click="rechazar()">{{ this.etiquetaBotonRechazar }}</button>
      </div>
      <div :class="estiloMensajeEnviado" v-if="enviado">
          {{ mensajeEnvio }}
      </div>
    </div>

  </section>

</template>

<script lang="js">

  import Header from '../Auxiliares/Header.vue'
  import { urlCoordinadores } from '../../Dependencias/urls'

  export default  {
    name: 'src-components-coordinador-listar-cursos',
    props: [],
    components: {
      Header
    },
    mounted () {
      
    },
    data () {
      return {
        alumno: "",
        curso: "",
        solicitud: "",
        etiquetaBotonProcesar: "Procesar",
        etiquetaBotonRechazar: "Rechazar",
        mensajeEnvio: "",
        estiloMensajeEnviado: "",
        enviado: false,
      }
    },
    methods: {
      procesar() {
        this.etiquetaBotonProcesar = "Procesando"
        this.$store.state.solicitud.estado = "Procesado"
        setTimeout(() => {
          let paraEnviar = {
            curso: this.$store.state.curso[0].idcurso,
            dni: this.$store.state.alumno.dni,
            solicitud : this.$store.state.solicitud
          }
          this.axios.put(urlCoordinadores + 'cursoalumnocomocoordinador/', paraEnviar)
          .then(res => {
            if(res.data.estado){
              this.errorEnvio = true
              this.estiloMensajeEnviado = "alert alert-danger my-1"
              this.mensajeEnvio = "Error al procesar la modificacion"
            }
            else {
              this.estiloMensajeEnviado = "alert alert-success my-1"
              this.mensajeEnvio = "Modificación procesada satisfactoriamente"
              this.enviado = true
            }
          })
          .catch(error => {
            console.log('ERROR GET HTTP', error)
          })
          this.etiquetaBotonProcesar = "Procesado"
        },1000)
      },
      rechazar() {
        this.etiquetaBotonRechazar = "Rechazando"
        this.$store.state.solicitud.estado = "Procesado"
        setTimeout(() => {
          let paraEnviar = {
            curso: this.$store.state.curso[0].idcurso,
            dni: this.$store.state.alumno.dni,
            solicitud : this.$store.state.solicitud
          }
          this.axios.put(urlCoordinadores + 'cursoalumnocomocoordinador/', paraEnviar)
          .then(res => {
            if(res.data.estado){
              this.errorEnvio = true
              this.estiloMensajeEnviado = "alert alert-danger my-1"
              this.mensajeEnvio = "Error al rechazar la solicitud"
            }
            else {
              this.estiloMensajeEnviado = "alert alert-success my-1"
              this.mensajeEnvio = "Solicitud rechazada satisfactoriamente"
              this.enviado = true
            }
          })
          .catch(error => {
            console.log('ERROR GET HTTP', error)
          })
          this.etiquetaBotonRechazar = "Rechazado"
        },1000)
      }
    },
    computed: {
      enviando() {
        return (!(this.etiquetaBotonProcesar == "Procesar" && this.etiquetaBotonRechazar == "Rechazar") || this.$store.state.solicitud.estado == "Procesado")
      }
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
  h5 {
    margin-bottom: 1rem;
  }
  .sub {
    margin-left: 2rem;
  }
  .col-2 {
    display: inline-block;
  }
  button {
    width: 8rem;
  }


</style>