<template>

  <section class="src-components-profesor-opciones-datos">
    <Header texto="Mis Datos Personales"/>

    <div class="jumbotron">
      <vue-form :state="formState" @submit.prevent="enviar()">

        <validate tag="div" class="titulo">
          <label for="dni" class="titulo">DNI</label>
          <input
            type="text"
            id="dni"
            class="form-control"
            disabled
            name="dni"
            v-model="formData.dni"
          />
        </validate>

        <br/>

        <validate tag="div" class="titulo">
          <label for="legajo" class="titulo">Legajo</label>
          <input
            type="text"
            id="legajo"
            class="form-control"
            disabled
            name="dni"
            v-model="formData.legajo"
          />
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
            :minlength="largoMin"
            :maxlength="largoMax"
            :disabled="enviado"
          />
          <field-messages name="apellido" show="$dirty">
            <div slot="required" class="alert alert-info my-1">
              Campo Obligatorio
            </div>
            <div slot="minlength" class="alert alert-danger my-1">
              El apellido debe tener por lo menos {{ largoMin }} caracteres
            </div>
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
            :minlength="largoMin"
            :maxlength="largoMax"
            :disabled="enviado"
          />
          <field-messages name="nombre" show="$dirty">
            <div slot="required" class="alert alert-info my-1">
              Campo Obligatorio
            </div>
            <div slot="minlength" class="alert alert-danger my-1">
              El nombre debe tener por lo menos {{ largoMin }} caracteres
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
            :minlength="largoMin"
            :maxlength="largoMax"
            :disabled="enviado"
          />
          <field-messages name="direccion" show="$dirty">
            <div slot="required" class="alert alert-info my-1">
              Campo Obligatorio
            </div>
            <div slot="minlength" class="alert alert-danger my-1">
              La dirección debe tener por lo menos {{ largoMin }} caracteres
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
            placeholder="Ingrese el Nivel del Curso"
            v-model="formData.email"
            required
            :minlength="largoMin"
            :maxlength="largoMax"
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
  import { urlProfesores } from '../../Dependencias/urls'
  import moment from 'moment'

  export default  {
    name: 'src-components-profesor-opciones-datos',
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
        largoMax: 50,
        largoMin: 2,
        errorEnvio: false,
        mensajeEnvio: "",
        estiloMensajeEnviado: "",
        telefonoMin: 111111,
        telefonoMax: 999999999999
      }
    },
    methods: {
      getInitialData() {  
        return {
          dni: '',
          legajo: '',
          apellido: '',
          nombre: '',
          email: '',
          direccion: '',
          telefono: ''
        }
      },
      recargarFormulario() {
        this.formData.dni = this.$store.state.usuario.dni
        this.formData.legajo = this.$store.state.usuario.legajo
        this.formData.apellido = this.$store.state.usuario.apellido
        this.formData.nombre = this.$store.state.usuario.nombre
        this.formData.email = this.$store.state.usuario.email
        this.formData.direccion = this.$store.state.usuario.direccion
        this.formData.telefono = this.$store.state.usuario.telefono      
      },
      enviar() {
        this.toggleEnviando()
        this.enviado = true
        this.etiquetaBoton = "Enviando..."
        const solicitud = {
          dni: this.formData.dni,
          legajo: this.formData.legajo,
          apellido: this.formData.apellido,
          nombre: this.formData.nombre,
          email: this.formData.email,
          direccion: this.formData.direccion,
          telefono: this.formData.telefono,
          fechasolicitud: moment().format() 
        }
        setTimeout(() => {
          this.axios.post(urlProfesores + 'cargarsolicitudactualizaciondatos/', solicitud, {
            'content-type' : 'application/json'
          })
          .then(res => {
            if(res.data.estado){
              this.errorEnvio = true
              this.estiloMensajeEnviado = "alert alert-danger my-1"
              this.mensajeEnvio = "Error al enviar la solicitud"
            }
            else {
              this.estiloMensajeEnviado = "alert alert-success my-1"
              this.mensajeEnvio = "Se ha enviado la solicitud al coordinador"
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
  .src-components-profesor-opciones-datos {

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