<template>

  <section class="src-components-form-consultas-para-coordinador">
    
    Si tenes alguna consulta que hacerle al Coordinador, podes escribirla en el campo de abajo.
    Te responderán a la brevedad.

    <br>
    <br>
   
        <vue-form :state="formState" @submit.prevent="enviar()">
        <validate tag="div" class="titulo">
          <label for="consulta" class="titulo"><b>Consulta:</b></label>
          <textarea
            type="text"
            id="consulta"
            class="form-control"
            autocomplete="off"
            name="consulta"
            placeholder="Ingrese la consulta"
            v-model.trim="formData.consulta"
            required
            :minlength="largoConsultaMin"
            :maxlength="largoConsultaMax"
          />
          <field-messages name="consulta" show="$dirty">
            <div slot="required" class="alert alert-info my-1">Escriba una consulta</div>
            <div
              slot="minlength"
              class="alert alert-danger my-1"
            >La consulta debe tener por lo menos {{ largoConsultaMin }} caracteres</div>

            <div
              v-if="formData.consulta.length == largoConsultaMax"
              class="alert alert-danger my-1"
            >No debe superar los {{ largoConsultaMax }} caracteres</div>
          </field-messages>
        </validate>


        <!-- <button class="btn btn-success my-4" :disabled="enviando" type="submit">Enviar</button> -->
        <button class="btn btn-success my-4" :disabled="formState.$invalid" type="submit">{{ this.etiquetaBoton }}</button>
      </vue-form>

      <hr>

      <div v-if="this.getUltimaFechaEnvio != '-'">
        <i>Mensaje enviado {{this.getUltimaFechaEnvio}}</i>
      </div>
      <div v-else>
        <i>Mensaje sin enviar</i>
      </div>

 
  
  
  </section>

</template>

<script lang="js">


  import moment from 'moment';

  export default  {
    name: 'src-components-form-consultas-para-coordinador',
    props: ['dni', 'legajo'],
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
          etiquetaBoton: "Enviar",
          largoConsultaMax: 255,
          largoConsultaMin: 2,
          fechaUltimoEnvio: '-',
      }
    },
    methods: {
      getInitialData() {
          
          return {
            nombre: '',
            apellido: '',
            consulta: '',
            legajo:  '',
            dni: '',
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
                    consulta:"",
                  }
                  
                  
              })
              .catch(console.log)
              
      },

      enviar() {
        this.enviando = true
        this.fechaUltimoEnvio = '-'
        this.etiquetaBoton = "Enviando..."

        setTimeout(() => {

        this.axios.post(this.$store.state.urlBackend + '/api/profesor/cargarconsultacoordinador/',{
            fecha:moment().format(),
            apellido:this.formData.apellido,
            nombre:this.formData.nombre,
            consulta:this.formData.consulta,
            legajo:this.formData.legajo,
            dni:this.formData.dni,
            leida:0
        })
        .then(this.fechaUltimoEnvio = this.formData.fecha)
        .catch(e => {
            console.log(e)
        })

          this.etiquetaBoton = "Enviar"
          this.enviando = false
          this.formData = this.getInitialData()
        },2000)
        
 
        
      },

   

    },
    computed: {
      getUltimaFechaEnvio() {
        return this.fechaUltimoEnvio
      }

    }
}


</script>

<style scoped lang="css">
  .src-components-form-consultas-para-coordinador {

  }
</style>
