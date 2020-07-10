<template>

  <section class="src-components-barra-superior">
    <div class="back">
      <img src="../../../public/backArrow.png" width="54" heigth="54" alt="Atras" @click="irAtras()">
    </div>
    <div class="forward">
      <img src="../../../public/forwardArrow.png" width="54" heigth="54" alt="Adelante" @click="irAdelante()">
    </div>
    <div class="logo">
      <img src="../../../public/logoInstituto.png" width="150" height="54" alt="Instituto ORTBRIDGE">
    </div>
    <div class="cabecera">
      <p>{{tipoUsuario}}: {{apellido}} {{nombre}}</p>
    </div>
  </section>

</template>

<script lang="js">

  export default  {
    name: 'src-components-barra-superior',
    props: ['texto'],
    mounted () {
    },
    data () {
      return {

      }
    },
    methods: {
      irAtras() {
        this.$router.go(-1)
      },
      irAdelante() {
        this.$router.go(+1)
      }
    },
    computed: {
      nombre() {
        return localStorage.getItem('nombre')
      },
      apellido() {
        return localStorage.getItem('apellido')
      },
      tipoUsuario() {
        let tipoUsuario
        tipoUsuario = this.$store.state.usuario.tipoempleado
        if(!tipoUsuario) {
          tipoUsuario = "Alumno"
        }
        return tipoUsuario
      }
    }
}


</script>

<style scoped lang="css">
  .src-components-barra-superior {
    background-color: #345b9e;
  }
  .cabecera {
    text-align: right;
    padding-top: 0.8rem;
    padding-bottom: 0.1rem;
    color: white;
    font-weight: 400;
    padding-right: 0.5rem;
    display: inline-block;
    background-color: #345b9e;
    position:relative;
    font-style: italic;
  }
  .logo {
    display: inline-block;
  }
  .back {
    display: inline-block;
    background-color: #263e7e;
  }
  .forward {
    display: inline-block;
    background-color: #263e7e;
  }

</style>
