import Vue from  'vue'
import VueRouter from 'vue-router'

import Login from "../components/Login.vue";

import Alumno from "../components/Alumno/Alumno.vue";
import AlumnoCurso from "../components/Alumno/AlumnoCurso.vue";
import AlumnoProfesor from "../components/Alumno/AlumnoProfesor.vue";
import AlumnoOpcionesDatos from "../components/Alumno/AlumnoOpcionesDatos.vue";
import AlumnoOpcionesSolicitud from "../components/Alumno/AlumnoOpcionesSolicitud.vue";

import Profesor from "../components/Profesor/Profesor.vue";
import ProfesorCursos from "../components/Profesor/ProfesorCursos.vue";
import ProfesorHorarios from "../components/Profesor/ProfesorHorarios.vue";
import ProfesorOpcionesDatos from "../components/Profesor/ProfesorOpcionesDatos.vue";
import ProfesorOpcionesContacto from "../components/Profesor/ProfesorOpcionesContacto.vue";

import Coordinador from "../components/Coordinador/Coordinador.vue";
import CoordinadorListarCursos from "../components/Coordinador/CoordinadorListarCursos.vue";
import CoordinadorDetallesCurso from "../components/Coordinador/CoordinadorDetallesCurso.vue";
import CoordinadorAltaCurso from "../components/Coordinador/CoordinadorAltaCurso.vue";
import CoordinadorListarAlumnos from "../components/Coordinador/CoordinadorListarAlumnos.vue";
import CoordinadorAltaAlumno from "../components/Coordinador/CoordinadorAltaAlumno.vue";
import CoordinadorSolicitudes from "../components/Coordinador/CoordinadorSolicitudes.vue";
import CoordinadorListarProfesores from "../components/Coordinador/CoordinadorListarProfesores.vue";
import CoordinadorAltaProfesor from "../components/Coordinador/CoordinadorAltaProfesor.vue";
import CoordinadorConsultas from "../components/Coordinador/CoordinadorConsultas.vue";
import CoordinadorOpcionesDatos from "../components/Coordinador/CoordinadorOpcionesDatos.vue";

Vue.use(VueRouter)

export default new VueRouter({
    mode: 'history',
    routes: [
        {path: '/', redirect: '/Login'},
        {path: '/Alumno', component: Alumno,
        children: [
            {path: '/AlumnoCurso', component: AlumnoCurso},
            {path: '/AlumnoProfesor', component: AlumnoProfesor},
            {path: '/AlumnoOpcionesDatos', component: AlumnoOpcionesDatos},
            {path: '/AlumnoOpcionesSolicitud', component: AlumnoOpcionesSolicitud}
        ]},
        {path: '/Login', component: Login},
        {path: '/Profesor', component: Profesor,
        children: [
            {path: '/ProfesorCursos', component: ProfesorCursos},
            {path: '/ProfesorHorarios', component: ProfesorHorarios},
            {path: '/ProfesorOpcionesDatos', component: ProfesorOpcionesDatos},
            {path: '/ProfesorOpcionesContacto', component: ProfesorOpcionesContacto}
        ]},
        {path: '/Coordinador', component: Coordinador,
        children: [
            {path: '/CoordinadorListarCursos', component: CoordinadorListarCursos},
            {path: '/CoordinadorAltaCurso', component: CoordinadorAltaCurso},
            {path: '/CoordinadorDetallesCurso', component: CoordinadorDetallesCurso},
            {path: '/CoordinadorListarAlumnos', component: CoordinadorListarAlumnos},
            {path: '/CoordinadorAltaAlumno', component: CoordinadorAltaAlumno},
            {path: '/CoordinadorSolicitudes', component: CoordinadorSolicitudes},
            {path: '/CoordinadorListarProfesores', component: CoordinadorListarProfesores},
            {path: '/CoordinadorAltaProfesor', component: CoordinadorAltaProfesor},
            {path: '/CoordinadorConsultas', component: CoordinadorConsultas},
            {path: '/CoordinadorOpcionesDatos', component: CoordinadorOpcionesDatos}
        ]},
    ]
})

