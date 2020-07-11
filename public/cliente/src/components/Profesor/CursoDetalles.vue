<template>

  <section class="src-components-curso-detalles">

    <div class="jumbotron mt-3" :style="cssChequearEstadoButton()">
        
        <NavbarProfesor 
              :dni="this.dniProfesor" 
              :legajo="this.legajo"
              @estadoButtonNav="mostrarCont($event)"
        />

      <img src="../../public/logoInstituto.png" width="300" height="100" />
      <img src="../../public/images1.jpg" width="200" height="100" align="right" />
      <hr />
      
        <h4>Detalles del curso:  {{nombreCurso}}</h4>
        <h4>Id del curso:  {{idCurso}}</h4>

        <hr>
        <br>
    

        <h4> Alumnos Inscriptos y Calificaciones </h4>
        
        <br>
        <div v-if="this.arrayAlumnos.length">
            <table class="table">
              <tr class="titulo">
                <th>DNI</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Email</th>
                <th>Nota 1</th>
                <th>Nota 2</th>
                <th>Nota Final</th>
               

              </tr>
              <tr v-for="(alumno,index) in this.arrayAlumnos" :key="index" :class="cssEvento(index)">
                <td>{{ alumno.dni }}</td>
                <td>{{ alumno.nombre }}</td>
                <td>{{ alumno.apellido }}</td>
                <td>{{ alumno.email }}</td>
                <td>
                  <router-link :to="`/CalificarAlumno/${dniProfesor}/${legajo}/${alumno.dni}/${alumno.nombre}/${alumno.apellido}`">
                    <a v-if="alumno.nota1" class="navbar-brand" href="#">{{ alumno.nota1 }}</a>
                    <a v-else class="navbar-brand" href="#">...</a>
                  </router-link>
                </td>
                <td>
                  <router-link :to="`/CalificarAlumno/${dniProfesor}/${legajo}/${alumno.dni}/${alumno.nombre}/${alumno.apellido}`">
                    <a v-if="alumno.nota2" class="navbar-brand" href="#">{{ alumno.nota2 }}</a>
                    <a v-else class="navbar-brand" href="#">...</a>
                  </router-link>
                </td>
                <td>
                  <router-link :to="`/CalificarAlumno/${dniProfesor}/${legajo}/${alumno.dni}/${alumno.nombre}/${alumno.apellido}`">
                    <a v-if="alumno.notafinal" class="navbar-brand" href="#">{{ alumno.notafinal }}</a>
                    <a v-else class="navbar-brand" href="#">...</a>
                  </router-link>
                </td>


                
               
              </tr>
            </table>
            

   
          </div>
          <div v-else class="alert alert-danger">
                El curso no tiene alumnos asignados
          </div>

        <br>
        <hr>
        <h4> Clases</h4>
        <br>

        <div v-if="this.arrayClases.length">
            <table class="table">
              <tr class="titulo">
                <th>Fecha</th>
                
              </tr>
              <tr v-for="(fecha,index) in this.arrayClases" :key="index" :class="cssEvento(index)">
                <td>{{ fecha.fechaclase | formatearFecha }}</td>
                               
              </tr>
            </table>
          </div>
          <div v-else class="alert alert-danger">
                El curso no tiene clases asignadas
          </div>
        
        <br>
        <hr>
        <h4> Temario </h4>
        <br>

        <div v-if="this.arrayTemas.length">
            <table class="table">
              <tr class="titulo">
                <th>Tema</th>
                
              </tr>
              <tr v-for="(tema,index) in this.arrayTemas" :key="index" :class="cssEvento(index)">
                <td>{{ tema.tema }}</td>
                               
              </tr>
            </table>
          </div>
          <div v-else class="alert alert-danger">
                El curso no tiene temas asignados
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

  export default  {
    name: 'src-components-curso-detalles',
    components: {
      NavbarProfesor
    },
    props: ['idCurso', 'nombreCurso', 'dniProfesor', 'legajo'],
    mounted () {
      
      // Voy a cargar un array con todos los alumnos del curso
      let stringConsulta = '/api/curso/' + this.idCurso
      this.axios(this.$store.state.urlBackend + stringConsulta)
        .then(rta => {
          this.arrayAlumnos = rta.data
        })
        .catch(console.log)

      // Voy a cargar un array con todos los horarios de clase del curso
      let stringConsultaClases = '/api/curso/' + this.idCurso + '/horarios'
      this.axios(this.$store.state.urlBackend + stringConsultaClases)
        .then(rta => {
          this.arrayClases = rta.data
        })
        .catch(console.log)

      // Voy a cargar un array con todos los temas de clase del curso
      let stringConsultaTemas = '/api/curso/' + this.idCurso + '/temario'
      this.axios(this.$store.state.urlBackend + stringConsultaTemas)
        .then(rta => {
          this.arrayTemas = rta.data
        })
        .catch(console.log)
    
    },
    data () {
      return {
          arrayAlumnos : [],
          arrayClases : [],
          arrayTemas : [],
          estadoButton : true
      }
    },
    methods: {
      cssEvento(index) {
          // Este return de un objeto es prque vue asi lo requiere, 
          // pero ponerlo acá queda mucho mas entendible en el codigo HTML.
          return {
              'fila-impar': (index % 2) == 0,
              'fila-par': (index % 2) != 0
          }
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

      // Necesito un método para cargar las notas de los alumnos
      getNotas(dni) {
        let notas = []
        let stringNotas = '/api/alumno/notas/' + dni
        
        this.axios(this.$store.state.urlBackend + stringNotas)
        .then(rta => {
          notas = rta.data
        })
        .catch(console.log)
        
        return notas
      }
    
    },
    computed: {

    }
}


</script>

<style scoped lang="css">
  .src-components-curso-detalles {

  }

  .fila-impar {
      color: darkslategrey;
      background-color:rgb(184, 184, 184);
  }

  .fila-par {
      color: darkslategrey;
      background-color:rgb(212, 211, 211);
  }

  .titulo {
    color: white;
    background-color: rgb(96, 97, 97);
  }
</style>
