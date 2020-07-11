<template>
  <section class="src-components-login">
    <BarraSuperior/>
    <div class="jumbotron">
      <h4 style="black">Ingresar</h4>

      <vue-form :state="formState" @submit.prevent="enviar()">
          <h6 style="color:red;"> {{ mensaje }} </h6>
        <!-- ------------------------------------------------ -->
        <br />
        <validate tag="div">
          <label for="user">Usuario</label>
          <input
            type="text"
            id="user"
            name="user"
            class="form-control"
            autocomplete="off"
            v-model.trim="formData.user"
            required
          />
          <field-messages name="user" show="$dirty">
            <div slot="required" class="alert alert-danger my-1">Campo User requerido</div>
          </field-messages>
        </validate>
        <!-- ------------------------------------------------ -->
        <br />
        <validate tag="div">
          <label for="password">Contraseña</label>
          <input
            type="text"
            id="password"
            name="password"
            class="form-control"
            autocomplete="off"
            v-model.trim="formData.password"
            required
          />

          <field-messages name="password" show="$dirty">
            <div slot="required" class="alert alert-danger my-1">Campo Password requerido</div>
          </field-messages>
        </validate>

        <br />

        <button class="btn btn-success my-4" :disabled="formState.$invalid" type="submit">Login</button>
      </vue-form>
    </div>
  </section>
</template>

<script lang="js">

  import { urlAlumnos }  from '../Dependencias/urls'
  import { urlProfesores }  from '../Dependencias/urls'
  import { urlCoordinadores }  from '../Dependencias/urls'
  import BarraSuperior from './Auxiliares/BarraSuperior.vue'

  export default  {
    name: 'src-components-login',
    components : {
      BarraSuperior
    },
    props: [],
    
    mounted () {
      this.logout()
    },
    data () {
      return {
        formState : {},
        formData : this.getInitialData(),
        mensaje : "",
 
      }
    },
    methods: {

        getInitialData() {
          return{
            user: '',
            password: '',
          }
        },
        
        enviar(){
          this.axios.get(urlAlumnos + this.formData.user)
          .then( res => {
              this.datos=res.data
              if(this.datos[0] != undefined){
                this.$store.dispatch('login',this.datos[0])
                this.$store.dispatch('guardarAlumnoLocalStorage')
                this.$store.dispatch('toggleConectado')
                this.$router.push({
                    path: '/Alumno',
                })
              }
              else{
                this.axios.get(urlProfesores + '?dni=' + this.formData.user)
                .then( res => {
                  this.datos=res.data
                  if(this.datos[0] != undefined){
                    this.$store.dispatch('login',this.datos[0])
                    this.$store.dispatch('guardarEmpleadoLocalStorage')
                    this.$store.dispatch('toggleConectado')
                    this.$router.push({
                        path: '/Profesor/' + this.formData.user,
                    })
                  }
                  else{
                    this.axios.get(urlCoordinadores + '?dni=' + this.formData.user)
                    .then( res => {
                      this.datos=res.data
                      if(this.datos[0] != undefined){
                        this.$store.dispatch('login',this.datos[0])
                        this.$store.dispatch('guardarEmpleadoLocalStorage')
                        this.$store.dispatch('toggleConectado')
                        this.$router.push({
                          path: '/Coordinador',
                        })
                      }
                      else{
                        this.formData = this.getInitialData()
                        this.formState._reset()
                        this.mensaje = "El usuario no ha sido encontrado"
                      }
                    })
                  }
                })
              }
          })  
        },
        logout() {
          localStorage.removeItem('dni')
          localStorage.removeItem('apellido')
          localStorage.removeItem('nombre')
          localStorage.removeItem('direccion')
          localStorage.removeItem('email')
          localStorage.removeItem('telefono')
          localStorage.removeItem('tipoempleado')
          localStorage.removeItem('legajo')
        }
    },
    computed: {

    }
}


</script>

<style scoped lang="css">
.src-components-login {
  background-color: #345b9e;
}

.jumbotron {
  color: black;
  padding-top: 10px;
  padding-bottom: 10px;
}

hr {
  background-color: white;
}
h4 {
  text-align: center;
}
</style>
