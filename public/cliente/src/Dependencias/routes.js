import Vue from  'vue'
import VueRouter from 'vue-router'

import Login from "../components/Login.vue";

//---------------------------------------------------------------------------------------------------------
//                                              Alumno
//---------------------------------------------------------------------------------------------------------

import Alumno from "../components/Alumno/Alumno.vue";
import AlumnoCurso from "../components/Alumno/AlumnoCurso.vue";
import AlumnoProfesor from "../components/Alumno/AlumnoProfesor.vue";
import AlumnoOpcionesDatos from "../components/Alumno/AlumnoOpcionesDatos.vue";
import AlumnoOpcionesSolicitud from "../components/Alumno/AlumnoOpcionesSolicitud.vue";

//---------------------------------------------------------------------------------------------------------
//                                              Profesor
//---------------------------------------------------------------------------------------------------------

import Profesor from "../components/Profesor/Profesor.vue";
import ProfesorCursos from "../components/Profesor/ProfesorCursos.vue";
import ProfesorCursosDetalle from "../components/Profesor/ProfesorCursosDetalle.vue";
import ProfesorNotas from "../components/Profesor/ProfesorNotas.vue";
import ProfesorHorarios from "../components/Profesor/ProfesorHorarios.vue";
import ProfesorOpcionesDatos from "../components/Profesor/ProfesorOpcionesDatos.vue";
import ProfesorOpcionesContacto from "../components/Profesor/ProfesorOpcionesContacto.vue";

//---------------------------------------------------------------------------------------------------------
//                                              Coordinador
//---------------------------------------------------------------------------------------------------------

import Coordinador from "../components/Coordinador/Coordinador.vue";
import CoordinadorCursoListar from "../components/Coordinador/CoordinadorCursoListar.vue";
import CoordinadorCursoDetalles from "../components/Coordinador/CoordinadorCursoDetalles.vue";
import CoordinadorCursoAlta from "../components/Coordinador/CoordinadorCursoAlta.vue";
import CoordinadorCursoModificacion from "../components/Coordinador/CoordinadorCursoModificacion.vue";
import CoordinadorAlumnoListar from "../components/Coordinador/CoordinadorAlumnoListar.vue";
import CoordinadorAlumnoDetalles from "../components/Coordinador/CoordinadorAlumnoDetalles.vue";
import CoordinadorAlumnoAlta from "../components/Coordinador/CoordinadorAlumnoAlta.vue";
import CoordinadorAlumnoModificacion from "../components/Coordinador/CoordinadorAlumnoModificacion.vue";
import CoordinadorAlumnoSolicitudes from "../components/Coordinador/CoordinadorAlumnoSolicitudes.vue";
import CoordinadorAlumnoSolicitudesDetalles from "../components/Coordinador/CoordinadorAlumnoSolicitudesDetalles.vue";
import CoordinadorProfesorListar from "../components/Coordinador/CoordinadorProfesorListar.vue";
import CoordinadorProfesorDetalles from "../components/Coordinador/CoordinadorProfesorDetalles.vue";
import CoordinadorProfesorAlta from "../components/Coordinador/CoordinadorProfesorAlta.vue";
import CoordinadorProfesorModificacion from "../components/Coordinador/CoordinadorProfesorModificacion.vue";
import CoordinadorProfesorConsultas from "../components/Coordinador/CoordinadorProfesorConsultas.vue";
import CoordinadorProfesorConsultasDetalles from "../components/Coordinador/CoordinadorProfesorConsultasDetalles.vue";
import CoordinadorOpcionesDatos from "../components/Coordinador/CoordinadorOpcionesDatos.vue";

Vue.use(VueRouter)

export default new VueRouter({
    mode: 'history',
    routes: [
        {path: '/', redirect: '/Login'},
        {path: '/Login', component: Login},
        {path: '/Alumno', component: Alumno,
        children: [
            {path: '/AlumnoCurso', component: AlumnoCurso},
            {path: '/AlumnoProfesor', component: AlumnoProfesor},
            {path: '/AlumnoOpcionesDatos', component: AlumnoOpcionesDatos},
            {path: '/AlumnoOpcionesSolicitud', component: AlumnoOpcionesSolicitud}
        ]},
        {path: '/Profesor', component: Profesor,
        children: [
            {path: '/ProfesorCursos', component: ProfesorCursos},
            {path: '/ProfesorCursosDetalle', component: ProfesorCursosDetalle},
            {path: '/ProfesorNotas', component: ProfesorNotas},
            {path: '/ProfesorHorarios', component: ProfesorHorarios},
            {path: '/ProfesorOpcionesDatos', component: ProfesorOpcionesDatos},
            {path: '/ProfesorOpcionesContacto', component: ProfesorOpcionesContacto}
        ]},
        {path: '/Coordinador', component: Coordinador,
        children: [
            {path: '/CoordinadorCursoListar', component: CoordinadorCursoListar},
            {path: '/CoordinadorCursoAlta', component: CoordinadorCursoAlta},
            {path: '/CoordinadorCursoModificacion', component: CoordinadorCursoModificacion},
            {path: '/CoordinadorCursoDetalles', component: CoordinadorCursoDetalles},
            {path: '/CoordinadorAlumnoListar', component: CoordinadorAlumnoListar},
            {path: '/CoordinadorAlumnoAlta', component: CoordinadorAlumnoAlta},
            {path: '/CoordinadorAlumnoModificacion', component: CoordinadorAlumnoModificacion},
            {path: '/CoordinadorAlumnoDetalles', component: CoordinadorAlumnoDetalles},
            {path: '/CoordinadorAlumnoSolicitudes', component: CoordinadorAlumnoSolicitudes},
            {path: '/CoordinadorAlumnoSolicitudesDetalles', component: CoordinadorAlumnoSolicitudesDetalles},
            {path: '/CoordinadorProfesorListar', component: CoordinadorProfesorListar},
            {path: '/CoordinadorProfesorAlta', component: CoordinadorProfesorAlta},
            {path: '/CoordinadorProfesorModificacion', component: CoordinadorProfesorModificacion},
            {path: '/CoordinadorProfesorDetalles', component: CoordinadorProfesorDetalles},
            {path: '/CoordinadorProfesorConsultas', component: CoordinadorProfesorConsultas},
            {path: '/CoordinadorProfesorConsultasDetalles', component: CoordinadorProfesorConsultasDetalles},
            {path: '/CoordinadorOpcionesDatos', component: CoordinadorOpcionesDatos}
        ]},
    ]
})

