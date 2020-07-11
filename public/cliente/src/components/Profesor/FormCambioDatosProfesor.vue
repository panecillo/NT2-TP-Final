<template>

  <section class="src-components-form-cambio-datos-profesor">
    
    Si necesitas actualizar tus datos personales, completá el siguiente formulario y envia el pedido
    para que sea procesado por Coordinación.  Podes cambiar todos tus datos personales con la excepción 
    de tu DNI ({{this.dni}}) y tu número de legajo ({{this.legajo}})

    <br>
    <br>


    <vue-form :state="formState" @submit.prevent="enviar()">

      <div class="container">
            <div class="row">
                <div class="class col-md-6">

                    <validate tag="div" class="titulo">
                      <label for="nombre" class="titulo"><b>Nombre:</b></label>
                      <input
                        type="text"
                        id="nombre"
                        class="form-control"
                        autocomplete="off"
                        name="nombre"
                        placeholder="Ingrese el Nombre"
                        v-model.trim="formData.nombre"
                        required
                        :minlength="largoMin"
                        :maxlength="largoMax"
                      />
                      <field-messages name="nombre" show="$dirty">
                        <div slot="required" class="alert alert-info my-1">Ingrese Nombre</div>
                        <div
                          slot="minlength"
                          class="alert alert-danger my-1"
                        >El nombre debe tener por lo menos {{ largoMin }} caracteres</div>

                        <div
                          v-if="formData.nombre.length == largoMax"
                          class="alert alert-danger my-1"
                        >No debe superar los {{ largoMax }} caracteres</div>
                      </field-messages>
                    </validate>
                    <br />


                    <validate tag="div" class="titulo">
                      <label for="apellido" class="titulo"><b>Apellido:</b></label>
                      <input
                        type="text"
                        id="apellido"
                        class="form-control"
                        autocomplete="off"
                        name="apellido"
                        placeholder="Ingrese el Apellido"
                        v-model.trim="formData.apellido"
                        required
                        :minlength="largoMin"
                        :maxlength="largoMax"
                      />
                      <field-messages name="apellido" show="$dirty">
                        <div slot="required" class="alert alert-info my-1">Ingrese Apellido</div>
                        <div
                          slot="minlength"
                          class="alert alert-danger my-1"
                        >El Apellido debe tener por lo menos {{ largoMin }} caracteres</div>

                        <div
                          v-if="formData.apellido.length == largoMax"
                          class="alert alert-danger my-1"
                        >No debe superar los {{ largoMax }} caracteres</div>
                      </field-messages>
                    </validate>
                    <br />


                    <validate tag="div" class="titulo">
                      <label for="direccion" class="titulo"><b>Direccion:</b></label>
                      <input
                        type="text"
                        id="direccion"
                        class="form-control"
                        autocomplete="off"
                        name="direccion"
                        placeholder="Ingrese la Dirección"
                        v-model.trim="formData.direccion"
                        required
                        :minlength="largoMin"
                        :maxlength="largoMax"
                      />
                      <field-messages name="direccion" show="$dirty">
                        <div slot="required" class="alert alert-info my-1">Ingrese Direccion</div>
                        <div
                          slot="minlength"
                          class="alert alert-danger my-1"
                        >La dirección debe tener por lo menos {{ largoMin }} caracteres</div>

                        <div
                          v-if="formData.direccion.length == largoMax"
                          class="alert alert-danger my-1"
                        >No debe superar los {{ largoMax }} caracteres</div>
                      </field-messages>
                    </validate>
                    <br />


                    <validate tag="div" class="titulo">
                      <label for="email" class="titulo"><b>Email:</b></label>
                      <input
                        type="text"
                        id="email"
                        class="form-control"
                        autocomplete="off"
                        name="email"
                        placeholder="Ingrese Email"
                        v-model.trim="formData.email"
                        required
                        :minlength="largoMin"
                        :maxlength="largoMax"
                      />
                      <field-messages name="email" show="$dirty">
                        <div slot="required" class="alert alert-info my-1">Ingrese Email</div>
                        <div
                          slot="minlength"
                          class="alert alert-danger my-1"
                        >El mail debe tener por lo menos {{ largoMin }} caracteres</div>

                        <div
                          v-if="formData.email.length == largoMax"
                          class="alert alert-danger my-1"
                        >No debe superar los {{ largoMax }} caracteres</div>
                      </field-messages>
                    </validate>
                    <br />

                    <validate tag="div" class="titulo">
                      <label for="telefono" class="titulo"><b>Telefono:</b></label>
                      <input
                        type="number"
                        id="telefono"
                        class="form-control"
                        autocomplete="off"
                        name="telefono"
                        placeholder="Ingrese Telefono"
                        v-model.trim="formData.telefono"
                        required
                      />
                      <field-messages name="telefono" show="$dirty">
                        <div slot="required" class="alert alert-info my-1">Ingrese Telefono</div>
                      </field-messages>
                    </validate>
                    <br />

                    <br />
                </div>

                <div class="class col-md-6">

                
                    <br>
                    <b> {{ this.formData.nombre }}</b>, actualiza tus datos personales y cuando hayas
                    terminado hace click en "Enviar"
                    <br>
                    <br>
                    <br>
                    <button class="btn btn-success btn-block" :disabled="formState.$invalid" type="submit">{{ this.etiquetaBoton }}</button>
                    <br>
                    
                    <div v-if="this.getUltimaFechaEnvio != '-'">
                        <i> Solicitud Enviada {{this.getUltimaFechaEnvio}} </i>
                    </div>
                    <div v-else>
                        <i> Solicitud Sin Enviar </i>
                    </div>

                </div>
            </div>
      </div>
        
        
    </vue-form>
     

  </section>

</template>

<script lang="js">

  import moment from 'moment';

  export default  {
    name: 'src-components-form-cambio-datos-profesor',
    props: ['dni','legajo'],
    mounted () {
      // Cargo en segundo plano los datos que voy a necesitar
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
          fechaUltimoEnvio: '-',
      }
    },
    methods: {
      getInitialData() {
          
          return {
            nombre: '',
            apellido: '',
            legajo:  '',
            dni: '',
            direccion: '',
            telefono: '',
            email: '',
            fechasolicitud: ''
          }
      },

      recargarFormulario() {
          // Cargo los datos del profesor necesarios
          let stringConsulta = '/api/profesor/?dni=' + this.dni
          this.axios(this.$store.state.urlBackend + stringConsulta)
              .then(rta => {
                  this.formData = 
                  {
                    dni:this.dni,
                    legajo:this.legajo,
                    nombre:rta.data[0].nombre,
                    apellido:rta.data[0].apellido,
                    direccion:rta.data[0].direccion,
                    telefono:rta.data[0].telefono,
                    email:rta.data[0].email,
                  }
                  
                  
              })
              .catch(console.log)
      },

      enviar() {
        this.enviando = true
        
        setTimeout(() => {

        this.axios.post(this.$store.state.urlBackend + '/api/profesor/cargarsolicitudactualizaciondatos/',{
            
            nombre:this.formData.nombre,
            apellido:this.formData.apellido,
            direccion:this.formData.direccion,
            legajo:this.formData.legajo,
            dni:this.formData.dni,
            telefono:this.formData.telefono,
            email:this.formData.email,
            fechasolicitud:moment().format()
        })
        .then(this.fechaUltimoEnvio = this.formData.fecha)
        .catch(e => {
            console.log(e)
            this.etiquetaBoton = 'Error de envío, reintentar'
        })

          
          this.enviando = false
          this.recargarFormulario()
        },2000)
      }

    },
    computed: {
      getUltimaFechaEnvio() {
        return this.fechaUltimoEnvio
      }

    }
}


</script>

<style scoped lang="css">
  .src-components-form-cambio-datos-profesor {

  }
</style>
