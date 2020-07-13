<template>

  <section class="src-components-profesor-opciones-contacto">
    <Header texto="Contactar al Coordinador"/>
    
    <div class="jumbotron">
      <vue-form :state="formState" @submit.prevent="enviar()">

        <validate tag="div" class="titulo">
          <label for="consulta" class="titulo">Consulta</label>
          <textarea
            type="text"
            id="consulta"
            class="form-control"
            name="consulta"
            placeholder="Ingrese la consulta"
            v-model="formData.consulta"
            required
            :disabled="enviado"
          />
          <field-messages name="consulta" show="$dirty">
            <div slot="required" class="alert alert-info my-1">
              Campo Obligatorio
            </div>
          </field-messages>
        </validate>

        <br/>

        <div class="col-1">
          <button class="btn btn-success my-4" :disabled="formState.$invalid || formState.$submitted" type="submit">{{ this.etiquetaBoton }}</button>
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
  import { urlProfesores } from '../../Dependencias/urls'
  import moment from 'moment'

  export default  {
    name: 'src-components-profesor-opciones-contacto',
    props: [],
    components: {
      Header
    },
    mounted () {
    },
    data () {
      return {
        formState : {},
        formData : this.getInitialData(),
        enviando: false,
        enviado: false,
        etiquetaBoton: 'Enviar',
        errorEnvio: false,
        mensajeEnvio: "",
        estiloMensajeEnviado: "",
      }
    },
    methods: {
      getInitialData() {
        return {
          consulta: ''
        }
      },
      enviar() {
        this.toggleEnviando()
        this.enviado = true
        this.etiquetaBoton = "Enviando..."
        const consulta = {
          dni: localStorage.getItem('dni'),
          legajo: localStorage.getItem('legajo'),
          apellido: localStorage.getItem('apellido'),
          nombre: localStorage.getItem('nombre'),
          consulta: this.formData.consulta,
          leida: 0,
          fecha: moment().format() 
        }
        setTimeout(() => {
          this.axios.post(urlProfesores + 'cargarconsultacoordinador/', consulta, {
            'content-type' : 'application/json'
          })
          .then(res => {
            if(res.data.estado){
              this.errorEnvio = true
              this.estiloMensajeEnviado = "alert alert-danger my-1"
              this.mensajeEnvio = "Error al enviar la consulta"
            }
            else {
              this.estiloMensajeEnviado = "alert alert-success my-1"
              this.mensajeEnvio = "Se ha enviado la consulta al coordinador"
            }
          })
          .catch(error => {
            console.log('ERROR POST HTTP', error)
          })
          this.etiquetaBoton = "Enviar"
          this.toggleEnviando()
          
        },1000)
      }
    },
    computed: {

    }
}


</script>

<style scoped lang="css">
  .src-components-profesor-opciones-contacto {

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
  textarea {
    padding-bottom: 80px;
    word-wrap: break-word;
  }
</style>