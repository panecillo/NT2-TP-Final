<template v-if="this.$store.state.curso">

  <section class="src-components-alumno-opciones-solicitud">
    <Header texto="Solicitud de Cambio de Curso"/>

    <div class="jumbotron">
      <vue-form :state="formState" @submit.prevent="enviar()">

        <validate tag="div" class="titulo" v-if="this.$store.state.curso!=undefined">
          <label for="cursoActual" class="titulo">Curso Actual</label>
          <input
            type="text"
            id="cursoActual"
            class="form-control"
            name="cursoActual"
            v-model="this.$store.state.curso[0].nombrecurso"
            required
            disabled
          />
        </validate>
        
        <br/>

        <label for="curso" class="titulo">Curso Nuevo</label>
        <div class="envoltorio">
          <select v-model="formData.nuevoCurso">
            <option v-for="(curso, idcurso) in cursos" :key="idcurso" :disabled="enviado">
              {{ curso.nombrecurso }}
            </option>
          </select>
          <span class="curso-elegido"></span>
        </div>
        <field-messages name="nombre" show="$dirty">
          <div slot="required" class="alert alert-info my-1">Campo Obligatorio</div>
        </field-messages>

        <br/>

        <div class="col-1">
          <button class="btn btn-success my-4" :disabled="formState.$invalid || mismoCurso || enviado " type="submit">{{ this.etiquetaBoton }}</button>
        </div>
        <div :class="estiloMensajeEnviado" v-if="enviado">
          {{ mensajeEnvio }}
        </div>

      </vue-form>  
    </div>

  </section>

</template>

<script lang="js">

  import Header from '../Auxiliares/Header.vue'
  import moment from 'moment'
  import { urlCursos } from '../../Dependencias/urls'
  import { urlAlumnos } from '../../Dependencias/urls'

  export default  {
    name: 'src-components-alumno-opciones-solicitud',
    props: [],
    components: {
      Header
    },
    mounted () {
      this.getCursos()
      this.recargarFormulario()
    },
    data () {
      return {
        cursos: [],
        formState : {},
        formData : this.getInitialData(),
        enviando: false,
        enviado: false,
        etiquetaBoton: 'Enviar',
        errorEnvio: false,
        mensajeEnvio: "",
        estiloMensajeEnviado: "",
        solicitud: {
          dni: '',
          idcurso: '',
          fechasolicitud: ''
        }
      }
    },
    methods: {
      getInitialData() {  
        return {
          cursoActual: '',
          cursoNuevo: '',
          fechasolicitud: ''
        }
      },
      recargarFormulario() {
        /* if(this.$store.state.curso != undefined){
        this.formData.cursoActual = this.$store.state.curso[0].nombrecurso
        } */
      },
      getCursos() {
        this.axios.get(urlCursos + 'cursos')
        .then( res => {
          this.cursos = res.data
        })
        .catch(error => {
          console.log('ERROR GET HTTP', error)
        })
      },
      enviar() {
        this.toggleEnviando()
        this.enviado = true
        this.etiquetaBoton = "Enviando..."
        this.solicitud.dni = this.$store.state.usuario.dni
        this.solicitud.fechasolicitud = moment().format()
        let i = 0
        while(i < this.cursos.length && this.solicitud.idcurso == '') {
          if(this.formData.nuevoCurso == this.cursos[i].nombrecurso) {
            this.solicitud.idcurso = this.cursos[i].idcurso
          }
          i++
        } 
        setTimeout(() => {
          this.axios.post(urlAlumnos + 'agregarsolicitud/', this.solicitud,{
            'content-type' : 'application/json'
          })
          .then(res => {
            if(res.data.estado){
              this.errorEnvio = true
              this.estiloMensajeEnviado = "alert alert-danger my-1"
              this.mensajeEnvio = "Error enviar la solicitud"
            }
            else {
              this.estiloMensajeEnviado = "alert alert-success my-1"
              this.mensajeEnvio = "Se envió la solicitud al coordinador"
            }
          })
          .catch(error => {
            console.log('ERROR GET HTTP', error)
          })
          this.etiquetaBoton = "Enviar"
          this.toggleEnviando()
        },1000)
      } 
    },
    computed: {
      mismoCurso() {
        return (this.formData.cursoActual == this.formData.nuevoCurso)
      }
    }
}


</script>

<style scoped lang="css">
  .src-components-alumno-opciones-solicitud {

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
  select {
    height: 2.3rem;
    width: 100%
  }
</style>
