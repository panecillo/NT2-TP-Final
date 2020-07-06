import Vue from  'vue'
import VueRouter from 'vue-router'

import Login from "./components/Login.vue";
import Alumno from "./components/Alumno.vue";
import Profesor from "./components/Profesor.vue";
import Coordinador from "./components/Coordinador.vue";

Vue.use(VueRouter)

//export const router = new VueRouter({
export default new VueRouter({
    mode: 'history',
    routes: [
	{path: '/', redirect: '/Login'},
      {path: '/Alumno', component: Alumno},
      {path: '/Login', component: Login},
      {path: '/Profesor', component: Profesor},
      {path: '/Coordinador', component: Coordinador},
    ]
})

