<template>

  <section class="src-components-coordinador-listar-cursos">

    <Header texto="Detalle de Solicitud de Cambio de Curso"/>

    <div class="jumbotron" v-if="this.$store.state.alumno && this.$store.state.solicitud">
      <p>Fecha: {{ this.$store.state.solicitud.fechasolicitud | formatearFecha }}</p>
      <hr>
      <h5>Datos del alumno</h5>
      <p class="sub">Nombre: {{ this.$store.state.alumno.apellido }} {{ this.$store.state.alumno.nombre }}</p>
      <p class="sub">Dni: {{ this.$store.state.solicitud.dni }}</p>
      <hr>
      <h5>Datos del Nuevo Curso</h5>
      <div v-if="$store.state.curso">
        <p class="sub" v-if="$store.state.curso">Curso: {{ this.$store.state.curso[0].nombrecurso }}</p>
        <p class="sub">Nivel: {{ this.$store.state.curso[0].dificultad }}</p>
      </div>
      <div v-else>
        <select v-model="cursoElegido">
          <option v-for="(curso, idcurso) in $store.state.cursos" :key="idcurso" :disabled="enviado">
            {{ curso.nombrecurso }}
          </option>
        </select>
      </div>
      <hr>
      <h5>Estado: {{ this.$store.state.solicitud.estado}}</h5>
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
        alumno: {},
        cursoElegido: {},
        solicitud: {},
        etiquetaBotonProcesar: "Procesar",
        etiquetaBotonRechazar: "Rechazar",
        mensajeEnvio: "",
        estiloMensajeEnviado: "",
        enviado: false,
        totalCursosConProfesores: 0
      }
    },
    methods: {
      procesar() {
        this.etiquetaBotonProcesar = "Procesando"
        this.$store.state.solicitud.estado = "Procesado"
        let paraEnviar
        setTimeout(() => {
          if(this.cursoElegido) {
            let id = this.getIdCurso(this.cursoElegido)
            paraEnviar = {
              curso: id,
              dni: this.$store.state.alumno.dni,
              solicitud : this.$store.state.solicitud
            }
            paraEnviar.solicitud.idcurso = id
          }
          else {
            paraEnviar = {
              curso: this.$store.state.curso[0].idcurso,
              dni: this.$store.state.alumno.dni,
              solicitud : this.$store.state.solicitud
            }
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
        this.$store.state.solicitud.estado = "Rechazado"
        let paraEnviar
        setTimeout(() => {
          if(!this.$store.state.curso) {
            paraEnviar = {
              curso: 0,
              dni: this.$store.state.alumno.dni,
              solicitud : this.$store.state.solicitud
            }
          }
          else {
            paraEnviar = {
              curso: this.$store.state.curso[0].idcurso,
              dni: this.$store.state.alumno.dni,
              solicitud : this.$store.state.solicitud
            }
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
      },
      getIdCurso(nombreCurso) {
        let i = 0
        let id = ''
        while(i < this.$store.state.cursos.length && id == '') {
          if(this.$store.state.cursos[i].nombrecurso == nombreCurso) {
            id = this.$store.state.cursos[i].idcurso
          }
          i++
        }
        return id
      }
    },
    computed: {
      enviando() {
        return (!(this.etiquetaBotonProcesar == "Procesar" && this.etiquetaBotonRechazar == "Rechazar") || this.$store.state.solicitud.estado == "Procesado" || this.$store.state.solicitud.estado == "Rechazado")
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