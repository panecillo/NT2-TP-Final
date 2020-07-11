<template lang>
  <section class="src-components-navbar-profesor">
    <div class="pos-f-t">
      <div class="collapse show" id="navbarToggleExternalContent">
        <div class="bg-secondary col-sm-3 col-md-2 sidebar">
          <div class="d-inline-block mr-3" id="navbarNav">
            <nav class="navbar navbar-secondary">
              <div class="list-group">
                <ul class="navbar-nav">
                  <li class="nav-item">
                    <router-link :to="`/Profesor/${dni}`">
                    <!--
                      <button type="button" class="btn btn-dark btn-lg btn-block">
                        <a class="text-light" href="#">Inicio</a>
                      </button>
                      <a href="#" class="square_btn">Inicio</a>
                    -->
                      <a href="#" class="myButton">Inicio</a>
                      
                    </router-link>
                  </li>
                  
                  <li class="nav-item mt-1">
                    <router-link :to="`/CursosProfesor/${dni}/${legajo}`">
                      <!--
                      <button type="button" class="btn btn-dark btn-lg btn-block">
                        <a class="text-light" href="#">Cursos</a>
                      </button>
                      -->
                      <a href="#" class="myButton">Cursos</a>
                    </router-link>
                  </li>

                  <li class="nav-item mt-1">
                    <router-link :to="`/HorariosProfesor/${dni}/${legajo}`">
                      <!--
                      <button type="button" class="btn btn-dark btn-lg btn-block">
                        <a class="text-light" href="#">Horarios</a>
                      </button>
                      -->
                      <a href="#" class="myButton">Horarios</a>
                    </router-link>
                  </li>

                  <li class="nav-item mt-1">
                    <router-link :to="`/OpcionesProfesor/${dni}/${legajo}`">
                      <!--
                      <button type="button" class="btn btn-dark btn-lg btn-block">
                        <a class="text-light" href="#">Opciones</a>
                      </button>
                      -->
                      <a href="#" class="myButton">Opciones</a>
                    </router-link>
                  </li>

                  <li class="nav-item mt-1">
                    <router-link to="/" tag="li">
                      <!--
                      <button type="button" class="btn btn-dark btn-lg btn-block">
                        <a class="text-light" href="#">Salir</a>
                      </button>
                      -->
                      <a href="#" class="myButton">Salir</a>
                    </router-link>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </div>

      <nav class="fixed-top navbar navbar-dark bg-dark">
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarToggleExternalContent"
          aria-controls="navbarToggleExternalContent"
          aria-expanded="true"
          aria-label="Toggle navigation"
          @click="cambiarEstadoButton()"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <a style="color:white">Profesor: {{dni}} | Legajo: {{legajo}}</a>
      </nav>
    </div>
  </section>
</template>

<script lang="js">

  export default  {
    name: 'src-components-navbar-profesor',
    props: ['dni','legajo'],
    mounted () {

    },
    data () {
      return {
        estadoButtonNav: true
      }
    },
    methods: {
      cambiarEstadoButton() {
        if(this.estadoButtonNav){
          this.estadoButtonNav = false
        }else{
          this.estadoButtonNav = true
        }
        this.$emit('estadoButtonNav',this.estadoButtonNav)
      }

    },
    computed: {

    }
}


</script>

<style scoped lang="css">
.src-components-navbar-profesor {
}

.bg-dark {
   background-color: #2a68af!important;
}
.bg-secondary {
   background-color: #3070b8b6!important;
}
.btn-dark {
    color: #fff;
    background-color: #2a68af!important;
    border-color: #172c58;
}
.btn-secondary {
    color: #fff;
    background-color: #172c58!important;
    border-color: #172c58;
}
.navbar-dark .navbar-toggler {
    color: #172c58;
    border-color:  #172c58;
    background-color: #4193f0b6!important;
}
body {
padding-top: 50px;
}
.sub-header {
padding-bottom: 10px;
border-bottom: 1px solid #eee;
}
.sidebar {
display: none;
}
@media (min-width : 980px) {
.sidebar {
position: fixed;
top: 51px;
bottom: 0;
left: 0;
z-index: 1000;
display: block;
padding: 20px;
overflow-x: hidden;
overflow-y: auto;
/* Scrollable contents if viewport is shorter than content. */
background-color: #f5f5f5;
border-right: 1px solid #eee;
}
}
/* Sidebar navigation */
.nav-sidebar {
margin-right: -21px;
/* 20px padding + 1px border */
margin-bottom: 20px;
margin-left: -20px;
}
.nav-sidebar>li>a {
padding-right: 20px;
padding-left: 20px;
}
.nav-sidebar>.active>a {
color: #fff;
background-color: #428bca;
}
/*
* Main content
*/
.main {
padding: 20px;
}
@media (min-width : 980px) {
.main {
padding-right: 40px;
padding-left: 40px;
}
}
.main .page-header {
margin-top: 0;
}
/*
* Placeholder dashboard ideas
*/
.placeholders {
margin-bottom: 30px;
text-align: center;
}
.placeholders h4 {
margin-bottom: 0;
}
.placeholder {
margin-bottom: 20px;
}
.placeholder img {
display: inline-block;
border-radius: 50%;
}
.controls {
margin-top: 16px;
border: 1px solid transparent;
border-radius: 2px 0 0 2px;
box-sizing: border-box;
-moz-box-sizing: border-box;
height: 32px;
outline: none;
box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
}
.square_btn{
    display: inline-block;
    padding: 0.5em 1em;
    text-decoration: none;
    background: #4160a1;/*Button Color*/
    color: #FFF;
    border-bottom: solid 4px #627295;
    border-radius: 8px;
    font-size: 150%;
    width: 150px;
    text-align: center;
}
.square_btn:active {/*on Click*/
    -ms-transform: translateY(4px);
    -webkit-transform: translateY(4px);
    transform: translateY(4px);/*Move down*/
    border-bottom: none;/*disappears*/
    font-size: 150%;
}


.myButton {
	box-shadow: 0px 10px 14px -7px #276873;
	background:linear-gradient(to bottom, #599bb3 5%, #492a8c 100%);
	background-color:#599bb3;
	border-radius:8px;
	display:inline-block;
	cursor:pointer;
	color:#ffffff;
	font-family:Verdana;
	font-size:20px;
	padding:10px 25px;
  width: 150px;
	text-decoration:none;
	text-shadow:0px 1px 0px #3d768a;
  text-align: center;
}
.myButton:hover {
	background:linear-gradient(to bottom, #492a8c 5%, #599bb3 100%);
	background-color:#492a8c;
}
.myButton:active {
	position:relative;
	top:1px;
}



</style>
