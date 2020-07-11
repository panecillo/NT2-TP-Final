<template lang>

  <section class="src-components-opciones-profesor">
    
    <div class="jumbotron mt-3" :style="cssChequearEstadoButton()">
        
        <NavbarProfesor 
                  :dni="this.dni" 
                  :legajo="this.legajo"
                  @estadoButtonNav="mostrarCont($event)"
        />

        <img src="../../public/logoInstituto.png" width="300" height="100" />
        <img src="../../public/images1.jpg" width="200" height="100" align="right" />
        <hr />
        
        <ul class="nav nav-tabs" id="myTab" role="tablist">
          <li class="nav-item">
            <a
              class="nav-link active"
              id="home-tab"
              data-toggle="tab"
              href="#home"
              role="tab"
              aria-controls="home"
              aria-selected="true"
            >Mis Datos Personales</a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              id="profile-tab"
              data-toggle="tab"
              href="#profile"
              role="tab"
              aria-controls="profile"
              aria-selected="false"
            >Contactar al Coordinador</a>
          </li>
        </ul>


        <div class="tab-content" id="myTabContent">
          <div
            class="tab-pane fade show active"
            id="home"
            role="tabpanel"
            aria-labelledby="home-tab"
          >
                    <hr>
                    <h4> Mis Datos Personales</h4>
                    
                    <br>
                    <br>
                    <FormCambioDatosProfesor :dni="this.dni" :legajo="this.legajo"/>
     

          </div>

          <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">

                  <hr>
                  <h4> Contactar al Coordinador </h4>
                  

                  <br>
                  <br>
                  <FormConsultasParaCoordinador :dni="this.dni" :legajo="this.legajo"/>
                  <br>
                  <br>

          </div>
        
        
        </div>
  
        

        

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
  import FormConsultasParaCoordinador from "./FormConsultasParaCoordinador.vue"
  import FormCambioDatosProfesor from "./FormCambioDatosProfesor.vue"

  export default  {
    name: 'src-components-opciones-profesor',
    components: {
      NavbarProfesor,
      FormConsultasParaCoordinador,
      FormCambioDatosProfesor
    },
    props: ['dni', 'legajo'],
    mounted () {

    },
    data () {
      return {
        estadoButton : true
      }
    },
    methods: {
      mostrarCont(estado) {
          this.estadoButton = estado
        },
        
      cssChequearEstadoButton() {
          if (this.estadoButton)
            return "margin-left: 16.5%;"
          else
            return "transition-delay: 0.3s;"
        },

    },
    computed: {

    }
}


</script>

<style scoped lang="css">
  .src-components-opciones-profesor {

  }
</style>
