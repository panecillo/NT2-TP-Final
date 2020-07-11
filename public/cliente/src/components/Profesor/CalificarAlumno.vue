<template lang>

  <section class="src-components-calificar-alumno">
    
    <div class="jumbotron mt-3" :style="cssChequearEstadoButton()">
        
        <NavbarProfesor 
          :dni="this.dniProfesor" 
          :legajo="this.legajo"
          @estadoButtonNav="mostrarCont($event)"
        />

        <img src="../../public/logoInstituto.png" width="300" height="100" />
        <img src="../../public/images1.jpg" width="200" height="100" align="right" />
        <hr />

        <h4> Calificar Alumno: {{ apellidoAlumno }}, {{ nombreAlumno }} </h4>
        <h4> DNI: {{ dniAlumno }}</h4>
        <hr>

        <br>
        <br>
         
        <vue-form :state="formState" @submit.prevent="enviar()">

          <div class="container">
            <div class="row">
                <div class="class col-md-6">

                    <validate tag="div" class="titulo">
                        <label for="nota1"><b>Nota Parcial 1</b></label>
                        <input 
                          type="number"
                          id="nota1"
                          class="form-control"
                          autocomplete="off"
                          name="nota1"
                          placeholder="Ingrese nota 1 del alumno"
                          v-model.number="formData.nota1"
                          :min=1
                          :max=10
                        >
                        <field-messages name="nota1" show="$dirty">
                          <div slot="required" class="alert alert-danger my-1">Campo requerido</div>
                          <div slot="min" class="alert alert-danger my-1">Nota mínima 1</div>
                          <div slot="max" class="alert alert-danger my-1">Nota máxima 10</div>
                          <div
                          v-if="formData.nota1==''"
                          class="alert alert-danger my-1"
                        >El campo no tiene nota cargada.  Es correcto?</div>
                        </field-messages>

                    </validate>    

                    <br>

                    <validate tag="div" class="titulo">
                      <label for="nota1"><b>Nota Parcial 2</b></label>
                      <input 
                        type="number"
                        id="nota2"
                        class="form-control"
                        autocomplete="off"
                        name="nota2"
                        placeholder="Ingrese nota 2 del alumno"
                        v-model.number="formData.nota2"
                        :min=1
                        :max=10
                      >
                      <field-messages name="nota2" show="$dirty">
                        <div slot="required" class="alert alert-danger my-1">Campo requerido</div>
                        <div slot="min" class="alert alert-danger my-1">Nota mínima 1</div>
                        <div slot="max" class="alert alert-danger my-1">Nota máxima 10</div>
                        <div
                          v-if="formData.nota2==''"
                          class="alert alert-danger my-1"
                        >El campo no tiene nota cargada.  Es correcto?</div>
                      </field-messages>

                    </validate>   

                    <br>

                    <validate tag="div" class="titulo">
                      <label for="notafinal"><b>Nota Final</b></label>
                      <input 
                        type="number"
                        id="notafinal"
                        class="form-control"
                        autocomplete="off"
                        name="notafinal"
                        placeholder="Ingrese nota final del alumno"
                        v-model.number="formData.notafinal"
                        :min=1
                        :max=10
                      >
                      <field-messages name="notafinal" show="$dirty">
                        <div slot="required" class="alert alert-danger my-1">Campo requerido</div>
                        <div slot="min" class="alert alert-danger my-1">Nota mínima 1</div>
                        <div slot="max" class="alert alert-danger my-1">Nota máxima 10</div>
                        <div
                          v-if="formData.notafinal==''"
                          class="alert alert-danger my-1"
                        >El campo no tiene nota cargada.  Es correcto?</div>
                      </field-messages>

                    </validate>    
              
 


                </div>

             
                <div class="class col-md-6">

                    <br>
                    Actualiza la nota de <b>{{ nombreAlumno }}</b> y luego hace 
                    click en "Actualizar calificaciones", si queres resetear
                    los campos antes de hacer el envío, presiona "Restablecer calificaciones"
                    <br>
                    <br>
                    <button class="btn btn-success btn-block" :disabled="formState.$invalid" type="submit">Actualizar calificaciones</button>

                    <br>
                    <button class="btn btn-primary btn-block" type="button" @click="recargarFormulario()" >Restablecer calificaciones</button>
                </div>
            </div>
        </div>
         
        </vue-form>   

       
    

        <hr>
        <footer id="sticky-footer" class="py-4 bg-dark text-white-50">
            <div class="container text-center">
              <a class="btn btn-block btn-social btn-twitter">
                <img src="../../public/Twitter.png" width="40" height="40" border="2" hspace="4" />
                <img src="../../public/Gmail.png" width="40" height="40" border="2" hspace="4" />
                <img src="../../public/Facebook.png" width="40" height="40" border="2" hspace="4" />
              </a>
              <small>Copyright &copy; Your Website</small>
            </div>
        </footer>

    </div>

  </section>

</template>

<script lang="js">

  import NavbarProfesor from "./NavbarProfesor.vue"

  export default  {
    name: 'src-components-calificar-alumno',
    components: {
      NavbarProfesor
    },
    props: ['dniProfesor','legajo','dniAlumno','nombreAlumno','apellidoAlumno'],
    mounted () {

      // Cargo las notas del alumno en el formulario
      this.recargarFormulario()
     
    },
    data () {
      return {
        formState : {},
        formData : this.getInitialData(),
        enviando: false,
        estadoButton : true
      }
    },
    methods: {
      getInitialData() {
        return {
          nota1: -1,
          nota2: -1,
          notafinal: -1,
        }
      },
      
      recargarFormulario() {
          // Cargo las notas del alumno en el formulario
          let stringConsulta = '/api/alumno/notas/' + this.dniAlumno
          this.axios(this.$store.state.urlBackend + stringConsulta)
              .then(rta => {
                  this.formData = 
                  {
                    dni:this.dniAlumno,
                    nota1:rta.data[0].nota1,
                    nota2:rta.data[0].nota2,
                    notafinal:rta.data[0].notafinal,
                  }
                  
              })
              .catch(console.log)
      },

      enviar() {
        this.enviando = true
      
        this.axios.post(this.$store.state.urlBackend + '/api/alumno/actualizarnotas/',{dni:this.formData.dni, nota1:this.formData.nota1, nota2:this.formData.nota2, notafinal:this.formData.notafinal})
        .then(response => {console.log(response)})
        .catch(e => {
            console.log(e)
        })
        
        // Timeout
        setTimeout(() => {
          this.enviando = false
        },2000)

        // Reseteo
        this.recargarFormulario()
        this.formState._reset()


      },

      cssChequearEstadoButton() {
          if (this.estadoButton)
            return "margin-left: 16.5%;"
          else
            return "transition-delay: 0.3s;"
      },

      mostrarCont(estado) {
          this.estadoButton = estado
      },

    },
    computed: {

    }
}


</script>

<style scoped lang="css">
  .src-components-calificar-alumno {

  }

  .titulo {
    text-align: left;
  }
</style>
