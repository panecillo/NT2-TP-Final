<template>

  <section class="src-components-coordinador-alta-curso">
    <Header texto="Alta de Curso"/>
    
    <div class="jumbotron">
      <vue-form :state="formState" @submit.prevent="enviar()">

        <validate tag="div" class="titulo">
          <label for="id" class="titulo">Id</label>
          <input
            type="text"
            id="id"
            class="form-control"
            name="id"
            placeholder="Ingrese el Id"
            v-model="formData.idcurso"
            required
            :disabled="enviado"
          />
          <field-messages name="id" show="$dirty">
            <div slot="required" class="alert alert-info my-1">Campo Obligatorio</div>
          </field-messages>
        </validate>

        <br/>
        <validate tag="div" class="titulo">
          <label for="nombre" class="titulo">Nombre</label>
          <input
            type="text"
            id="nombre"
            class="form-control"
            name="nombre"
            placeholder="Ingrese el Nombre del Curso"
            v-model="formData.nombrecurso"
            required
            :minlength="largoMin"
            :maxlength="largoMax"
            :disabled="enviado"
          />
          <field-messages name="nombre" show="$dirty">
            <div slot="required" class="alert alert-info my-1">Campo Obligatorio</div>
            <div
              slot="minlength"
              class="alert alert-danger my-1"
            >El nombre debe tener por lo menos {{ largoMin }} caracteres</div>
          </field-messages>
        </validate>
        <br/>
        <validate tag="div" class="titulo">
          <label for="dificultad" class="titulo">Nivel</label>
          <input
            type="text"
            id="dificultad"
            class="form-control"
            name="dificultad"
            placeholder="Ingrese el Nivel del Curso"
            v-model="formData.dificultad"
            required
            :minlength="largoMin"
            :maxlength="largoMax"
            :disabled="enviado"
          />
          <field-messages name="dificultad" show="$dirty">
            <div slot="required" class="alert alert-info my-1">Campo Obligatorio</div>
            <div
              slot="minlength"
              class="alert alert-danger my-1"
            >El nivel debe tener por lo menos {{ largoMin }} caracteres</div>
          </field-messages>
        </validate>
        <br/>
        <validate>
          <label for="primeraClase" class="titulo">Primera Clase</label>
          <div class="container">
            <div class="row">
              <div class="col">
                <date-picker v-model="date" :config="options" name="fechaClase" :disabled="enviado" placeholder="Ingrese Fecha y Hora de la Primera Clase"></date-picker>
              </div>
            </div>
          </div>
        </validate>

        <div class="col-1">
          <button class="btn btn-success my-4" :disabled="formState.$invalid" type="submit">{{ this.etiquetaBoton }}</button>
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
  import datePicker from 'vue-bootstrap-datetimepicker'
  import { urlCoordinadores } from '../../Dependencias/urls'
  

  export default  {
    name: 'src-components-coordinador-alta-curso',
    props: [],
    components: {
      Header,
      datePicker
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
        largoMax: 50,
        largoMin: 2,
        errorEnvio: false,
        date: '',
        options: {
          format: 'DD/MM/YYYY hh:mm:ss',
          useCurrent: false,
        },
        mensajeEnvio: "",
        estiloMensajeEnviado: ""
      }
    },
    methods: {
      getInitialData() {  
        return {
          idcurso: '',
          nombrecurso: '',
          dificultad:  '',
          fechaClase: ''
        }
      },
      toggleEnviando() {
        this.enviando = !this.enviando
      },
      enviar() {
        this.toggleEnviando()
        this.enviado = true
        this.etiquetaBoton = "Enviando..."

        setTimeout(() => {
          this.axios.post(urlCoordinadores + 'cursonuevo/', this.formData)
          .then(res => {
            if(res.data.error){
              this.errorEnvio = true
              this.estiloMensajeEnviado = "alert alert-danger my-1"
              this.mensajeEnvio = "Error al crear el Curso"
            }
            else {
              this.estiloMensajeEnviado = "alert alert-success my-1"
              this.mensajeEnvio = "Curso creado satisfactoriamente"
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
      error() {
        return this.errorEnvio
      },
    }
}


</script>

<style scoped lang="css">
  .src-components-coordinador-alta-curso {

  }
  .jumbotron {
    padding-top: 20px;
    padding-bottom: 5px;
    margin-bottom: 10px;
    background-blend-mode:difference;
    background-color: rgba(190, 211, 238, 0.952);
  }
  .container {
    padding: 0px;
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
</style>