<template>

  <section class="src-components-coordinador-consultas-detalle">

    <Header texto="Detalles de la Consulta"/>

    <div class="jumbotron">
      <p>Fecha: {{ consulta.fecha | formatearFecha }}</p>
      <p>Id: {{ consulta.idConsulta }}</p>
      <p>Dni: {{ consulta.dni }}</p>
      <p>Legajo: {{ consulta.legajo }}</p>
      <p>Nombre: {{ consulta.apellido }} {{ consulta.nombre }}</p>
      <p>Consulta: {{ consulta.consulta }}</p>
      <p>Leido: {{ consulta.leida | leida }}</p>
      <button class="btn btn-success my-4" v-on:click="toggleLeida()">{{ this.etiquetaBoton }}</button>
    </div>

  </section>

</template>

<script lang="js">

  import Header from '../Auxiliares/Header.vue'
  import { urlProfesores } from '../../Dependencias/urls'

  export default  {
    name: 'src-components-coordinador-consultas-detalle',
    props: [],
    components: {
      Header
    },
    mounted () {
      this.consulta = this.$store.state.consulta
      this.setEtiquetaBoton()
    },
    data () {
      return {
        consulta: "",
        etiquetaBoton: ""
      }
    },
    methods: {
      toggleLeida() {
        if(this.consulta.leida == 0) {
          this.consulta.leida = 1
        }
        else {
          this.consulta.leida = 0
        }
        this.setEtiquetaBoton()
        this.actualizarConsulta()
      },
      setEtiquetaBoton() {
        if(this.consulta.leida == 0) {
          this.etiquetaBoton = "Leido"
        }
        else {
          this.etiquetaBoton = "No Leido"
        }
      },
      actualizarConsulta() {
        this.axios.put(urlProfesores + 'modificarconsultacoordinador/', this.consulta)
      }
    },
    computed: {

    }
}

</script>

<style scoped lang="css">
  .src-components-coordinador-consultas-detalle {

  }
  .jumbotron {
    padding-top: 20px;
    padding-bottom: 15px;
    margin-bottom: 10px;
  }
  p {
    font-style: italic;
    font-weight: 600;
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