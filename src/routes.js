import Vue from  'vue'
import VueRouter from 'vue-router'

import Login from "./components/Login.vue";
import Alumno from "./components/Alumno.vue";

Vue.use(VueRouter)

//export const router = new VueRouter({
export default new VueRouter({
    mode: 'history',
    routes: [
	{path: '/', redirect: '/Login'},
      {path: '/Alumno', component: Alumno},
      {path: '/Login', component: Login},
    ]
})

