<template>
  <section class="src-components-login">
    <div class="jumbotron mt-3">
      <h2 style="color:rgb(139 13 135)">Login</h2>
      <br />

      <vue-form :state="formState" @submit.prevent="enviar()">
          <h6 style="color:red;"> {{ mensaje }} </h6>
        <!-- ------------------------------------------------ -->
        <br />
        <validate tag="div">
          <label for="user">User</label>
          <input
            type="number"
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
          <label for="password">Password</label>
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

  import { urlAlumnos }  from '../urls'
  import { urlProfesores }  from '../urls'
  import { urlCoordinadores }  from '../urls'

  export default  {
    name: 'src-components-login',
    components : {
    },
    props: [],
    
    mounted () {

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
                this.$router.push({
                    path: '/Alumno'
                })
              }
              else{
                this.axios.get(urlProfesores + '?dni=' + this.formData.user)
                .then( res => {
                  this.datos=res.data
                  if(this.datos[0] != undefined){
                    this.$router.push({
                        path: '/Profesor'
                    })
                  }
                  else{
                    this.axios.get(urlCoordinadores + '?dni=' + this.formData.user)
                    .then( res => {
                      this.datos=res.data
                      if(this.datos[0] != undefined){
                        this.$router.push({
                          path: '/Coordinador'
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
    },
    computed: {

    }
}


</script>

<style scoped lang="css">
.src-components-login {
}

.jumbotron {
  color: black;
}

hr {
  background-color: white;
}
</style>
