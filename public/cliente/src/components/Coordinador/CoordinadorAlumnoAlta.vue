<template>

  <section class="src-components-coordinador-alta-alumno">
    <Header texto="Alta de Alumno"/>

    <div class="jumbotron">
      <vue-form :state="formState" @submit.prevent="enviar()">

        <validate tag="div" class="titulo">
          <label for="dni" class="titulo">DNI</label>
          <input
            type="text"
            id="dni"
            class="form-control"
            name="dni"
            placeholder="Ingrese el DNI"
            v-model="formData.dni"
            :min="dniMin"
            :max="dniMax"
            :disabled="enviado"
          />
          <field-messages name="dni" show="$dirty">
            <div slot="required" class="alert alert-info my-1">Campo Obligatorio</div>
            <div slot="min" class="alert alert-danger my-1">El DNI debe tener como mínimo 6 números</div>
          </field-messages>
        </validate>

        <br/>

        <validate tag="div" class="titulo">
          <label for="apellido" class="titulo">Apellido</label>
          <input
            type="text"
            id="apellido"
            class="form-control"
            name="apellido"
            placeholder="Ingrese el apellido"
            v-model="formData.apellido"
            required
            :disabled="enviado"
          />
          <field-messages name="apellido" show="$dirty">
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
            placeholder="Ingrese el nombre"
            v-model="formData.nombre"
            required
            :disabled="enviado"
          />
          <field-messages name="nombre" show="$dirty">
            <div slot="required" class="alert alert-info my-1">
              Campo Obligatorio
            </div>
          </field-messages>
        </validate>

        <br/>

        <validate tag="div" class="titulo">
          <label for="direccion" class="titulo">Direccion</label>
          <input
            type="text"
            id="direccion"
            class="form-control"
            name="direccion"
            placeholder="Ingrese la dirección"
            v-model="formData.direccion"
            required
            :disabled="enviado"
          />
          <field-messages name="direccion" show="$dirty">
            <div slot="required" class="alert alert-info my-1">
              Campo Obligatorio
            </div>
          </field-messages>
        </validate>

        <br/>
                
        <validate tag="div" class="titulo">
          <label for="email" class="titulo">Email</label>
          <input
            type="text"
            id="email"
            class="form-control"
            name="email"
            placeholder="Ingrese el Email"
            v-model="formData.email"
            required
            :disabled="enviado"
          />
          <field-messages name="email" show="$dirty">
            <div slot="required" class="alert alert-info my-1">
              Campo Obligatorio
            </div>
            <div slot="email" class="alert alert-danger my-1">
              Email no válido
            </div>
          </field-messages>
        </validate>

        <br/>

        <validate tag="div">
          <label for="telefono">Telefono</label>
          <input 
            type="number"
            id="telefono"
            class="form-control"
            autocomplete="off"
            name="telefono"
            placeholder="Ingrese el número de teléfono"
            v-model.number="formData.telefono"
            required
            :min="telefonoMin"
            :max="telefonoMax"
            :disabled="enviado"
          >
          <field-messages name="telefono" show="$dirty">
            <div slot="required" class="alert alert-danger my-1">
              Campo Obligatorio
            </div>
            <div slot="min" class="alert alert-danger my-1">
              El telefono debe tener como mínimo 6 números
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
  import { urlAlumnos } from '../../Dependencias/urls'

  export default  {
    name: 'src-components-coordinador-alta-alumno',
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
        telefonoMin: 111111,
        telefonoMax: 999999999999,
        dniMin: 111111,
        dniMax: 99999999
      }
    },
    methods: {
      getInitialData() {  
        return {
          dni: '',
          apellido: '',
          nombre: '',
          email: '',
          direccion: '',
          telefono: ''
        }
      },
      enviar() {
        this.toggleEnviando()
        this.enviado = true
        this.etiquetaBoton = "Enviando..."

        setTimeout(() => {
          this.axios.post(urlAlumnos, this.formData,{
            'content-type' : 'application/json'
          })
          .then(res => {
            if(res.data.estado){
              this.errorEnvio = true
              this.estiloMensajeEnviado = "alert alert-danger my-1"
              this.mensajeEnvio = "Error crear el Alumno"
            }
            else {
              this.estiloMensajeEnviado = "alert alert-success my-1"
              this.mensajeEnvio = "Alumno creado satisfactoriamente"
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

    }
}


</script>

<style scoped lang="css">
  .src-components-coordinador-alta-alumno {

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
</style>