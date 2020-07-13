<template>

  <section class="src-components-profesor-notas">
    <Header texto="Modificar Notas"/>

    <div class="jumbotron">
      <vue-form :state="formState" @submit.prevent="enviar()">

        <validate tag="div">
          <label for="nota1">Nota 1</label>
          <input 
            type="number"
            id="nota1"
            class="form-control"
            autocomplete="off"
            name="nota1"
            v-model.number="formData.nota1"
            :disabled="enviado"
            rango
          >
          <field-messages name="nota1" show="$dirty">
            <div slot="rango" class="alert alert-danger my-1">
              La nota debe estar entre 1 y 10 (0 para eliminar nota)
            </div>
          </field-messages>
        </validate>

        <br/>

        <validate tag="div">
          <label for="nota2">Nota 2</label>
          <input 
            type="number"
            id="nota2"
            class="form-control"
            autocomplete="off"
            name="nota2"
            v-model.number="formData.nota2"
            :disabled="enviado"
            rango
          >
          <field-messages name="nota2" show="$dirty">
            <div slot="rango" class="alert alert-danger my-1">
              La nota debe estar entre 1 y 10 (0 para eliminar nota)
            </div>
          </field-messages>
        </validate>

        <br/>

        <validate tag="div">
          <label for="notafinal">Nota Final</label>
          <input 
            type="number"
            id="notafinal"
            class="form-control"
            autocomplete="off"
            name="notafinal"
            v-model.number="formData.notafinal"
            :disabled="enviado"
            rango
          >
          <field-messages name="notafinal" show="$dirty">
            <div slot="rango" class="alert alert-danger my-1">
              La nota debe estar entre 1 y 10 (0 para eliminar nota)
            </div>
          </field-messages>
        </validate>

        <br/>

        <div class="col-2">
          <button class="btn btn-success my-4" :disabled="formState.$invalid || formState.$submitted" type="submit">{{ this.etiquetaBoton }}</button>
        </div>
        <div class="col-2">
          <button class="btn btn-info my-4" :disabled="formState.$submitted" type ="button" @click="recargarFormulario()">{{ this.etiquetaBoton2 }}</button>
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
  import { urlAlumnos } from '../../Dependencias/urls'

  export default  {
    name: 'src-components-profesor-notas',
    props: [],
    components: {
      Header
    },
    mounted () {
      this.recargarFormulario()
    },
    data () {
      return {
        formState : {},
        formData : this.getInitialData(),
        enviando: false,
        enviado: false,
        etiquetaBoton: 'Enviar',
        etiquetaBoton2: 'Reestablecer',
        errorEnvio: false,
        mensajeEnvio: "",
        estiloMensajeEnviado: "",
      }
    },
    methods: {
      getInitialData() {  
        return {
          dni: '',
          nota1: '',
          nota2: '',
          notafinal: '',
        }
      },
      recargarFormulario() {
        this.formData.dni = this.$store.state.alumno.dni
        this.formData.nota1 = this.$store.state.alumno.nota1
        this.formData.nota2 = this.$store.state.alumno.nota2
        this.formData.notafinal = this.$store.state.alumno.notafinal  
      },
      enviar() {
        this.toggleEnviando()
        this.enviado = true
        this.etiquetaBoton = "Enviando..."

        if(this.formData.nota1 == 0){
          this.formData.nota1 = null
        }
        if(this.formData.nota2 == 0){
          this.formData.nota2 = null
        }
        if(this.formData.notafinal == 0){
          this.formData.notafinal = null
        }
        const solicitud = {
          dni: this.$store.state.alumno.dni,
          nota1: this.formData.nota1,
          nota2: this.formData.nota2,
          notafinal: this.formData.notafinal,
        }
        setTimeout(() => {
          this.axios.put(urlAlumnos + 'modificarnotas/' + this.$store.state.alumno.dni, solicitud, {
            'content-type' : 'application/json'
          })
          .then(res => {
            if(res.data.estado){
              console.log(res.data)
              this.errorEnvio = true
              this.estiloMensajeEnviado = "alert alert-danger my-1"
              this.mensajeEnvio = "Error al modificar las notas"
            }
            else {
              this.estiloMensajeEnviado = "alert alert-success my-1"
              this.mensajeEnvio = "Se han modificado las notas"
            }
          })
          .catch(error => {
            console.log('ERROR PUT HTTP', error)
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
  .src-components-profesor-notas {

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
    width: 8rem;
  }
  .col-2 {
    display: inline-block;
  }
</style>