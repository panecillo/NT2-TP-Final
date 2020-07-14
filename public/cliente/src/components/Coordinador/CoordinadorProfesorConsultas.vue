<template>

  <section class="src-components-coordinador-consultas">
    <Header texto="Consultas de Profesores"/>

    <input type="checkbox" id="checkbox" v-model="verPendientes" style="display:none" v-on:click="aplicarFiltro()">
    <label for="checkbox" class="btn btn-primary active" v-bind:style="colorFiltro()">{{ verBotonFiltro }}</label>

    <br>
    
    <table class="table">
      <tr class="thead-dark">
        <th>Leida</th>
        <th>Id</th>
        <th>Fecha</th>
        <th>Nombre</th>
        <th>Detalles</th>
      </tr>
      <tr v-bind:style="colorEstado(consulta.leida)" v-for="(consulta, id) in consultas" :key="id">
        <td> {{ consulta.leida | leida }} </td>
        <td> {{ consulta.idConsulta }} </td>
        <td> {{ consulta.fecha  | formatearFecha }} </td>
        <td> {{ consulta.apellido }} {{ consulta.nombre}} </td>
        <td> 
          <router-link :to="`/CoordinadorProfesorConsultasDetalles`">
            <span v-on:click="cargaConsulta(consulta)">Detalles</span>
          </router-link>
        </td>
      </tr>
    </table>
  </section>

</template>

<script lang="js">

  import Header from '../Auxiliares/Header.vue'
  import { urlCoordinadores } from '../../Dependencias/urls'

  export default  {
    name: 'src-components-coordinador-consultas',
    props: [],
    components: {
      Header
    },
    mounted () {
      this.consultas = this.getConsultas()
    },
    data () {
      return {
        consultas: [],
        verPendientes: false,
        botonFiltro: "Mostrar No Leidas"
      }
    },
    methods: {
      cargaConsulta(consulta) {
        this.$store.dispatch('cargaConsulta', consulta)
      },
      getConsultas() {
        this.axios.get(urlCoordinadores + 'getconsultasprofesores/')
        .then( res => {
          this.consultas = res.data
        })
        .catch(error => {
          console.log('ERROR GET HTTP', error)
        })
      },
      colorEstado(estado) {
        let colorEstado = {
          color: '',
          backgroundColor: '',
          display: ''
        }
        switch(estado) {
        case 1: 
          colorEstado.color = "white";
          colorEstado.backgroundColor = "lightgreen";
          break;
        default:
          colorEstado.color = "black";
          colorEstado.backgroundColor = "";
        }
        if(this.verPendientes && estado == 1) {
          colorEstado.display = "none"
        }
        return colorEstado
      },
      aplicarFiltro() {
        this.verPendientes = !this.verPendientes
        if(!this.verPendientes) {
          this.botonFiltro = "Mostrar No Leidas"
        }
        else {
          this.botonFiltro = "Mostrar Todas"
        }
      },
      colorFiltro() {
        let colorFiltro = {
          color: '',
          backgroundColor: '',
          display: ''
        }
        if(this.verPendientes) {
          colorFiltro.background = "green"
          colorFiltro.color = "white"
        }
        return colorFiltro
      }
    },
    computed: {
      verBotonFiltro() {
        return this.botonFiltro
      }
    }
}


</script>

<style scoped lang="css">
  .src-components-coordinador-consultas {

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
  .btn {
    margin-left: 1rem;
    margin-bottom: 1rem;
    height: 2.5rem;
    width: 15rem;
  }
</style>