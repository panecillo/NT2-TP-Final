<template>

  <section class="src-components-login">
    <div class="jumbotron mt-3">
      <h2 style ="color:rgb(139 13 135)">Login</h2>
      <br>

      <vue-form :state="formState" @submit.prevent="enviar()">

        <!-- ------------------------------------------------ -->
        <br>
        <validate tag ="div">
          <label for ="usuario">Usuario</label>
          <input 
            type="number" 
            id="usuario" 
            name="usuario"
            class="form-control" 
            autocomplete="off"
            v-model.trim="formData.usuario"
            required            
          >
          <field-messages name="usuario" show="$dirty">
            <div slot="required" class="alert alert-danger my-1">Campo Usuario requerido</div>
          </field-messages>
        </validate>
        <!-- ------------------------------------------------ -->
        <br>
        <validate tag ="div">
          <label for ="password">Password</label>
          <input 
            type="text" 
            id="password" 
            name="password"
            class="form-control" 
            autocomplete="off"
            v-model.trim="formData.password"
            required 
          >

          <field-messages name="password" show="$dirty">
            <div slot="required" class="alert alert-danger my-1">Campo Password requerido</div>
          </field-messages>
        </validate>

        <br>

        <button class="btn btn-success my-4" :disabled="formState.$invalid" type="submit">Login</button>

      </vue-form>

    </div>
  </section>

</template>

<script lang="js">

  import { urlAlumnos }  from '../urls'

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
 
      }
    },
    methods: {

        getInitialData() {
        return{
          usuario: '',
          password: '',
        }
        },
        enviar(){
          //el login aca funciona solo para alumnos, falta incluir al resto
          this.axios.get(urlAlumnos + this.formData.usuario)
          .then( res => {
              this.datos=res.data
              if(this.datos.length){
                this.$router.push({
                    path: '/Alumno'
                })
            }
            else{
                this.formState._reset()
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
