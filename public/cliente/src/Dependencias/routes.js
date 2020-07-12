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
import CursosProfesor from "../components/Profesor/CursosProfesor.vue";
import CursoDetalles from "../components/Profesor/CursoDetalles.vue";
import OpcionesProfesor from "../components/Profesor/OpcionesProfesor.vue";
import HorariosProfesor from "../components/Profesor/HorariosProfesor.vue";
import CalificarAlumno from "../components/Profesor/CalificarAlumno.vue";
import FormConsultasParaCoordinador from "../components/Profesor/FormConsultasParaCoordinador.vue"
import FormCambioDatosProfesor from "../components/Profesor/FormCambioDatosProfesor.vue"

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
import CoordinadorProfesorListar from "../components/Coordinador/CoordinadorProfesorListar.vue";
import CoordinadorProfesorAlta from "../components/Coordinador/CoordinadorProfesorAlta.vue";
import CoordinadorProfesorConsultas from "../components/Coordinador/CoordinadorProfesorConsultas.vue";
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
        {path: '/Profesor', component: Profesor},
        {path: '/CursosProfesor/:dni/:legajo', component: CursosProfesor, props:true},
        {path: '/CursoDetalles/:idCurso/:nombreCurso/:dniProfesor/:legajo', component: CursoDetalles, props:true},
        {path: '/OpcionesProfesor/:dni/:legajo', component: OpcionesProfesor, props:true},
        {path: '/HorariosProfesor/:dni/:legajo', component: HorariosProfesor, props:true},
        {path: '/CalificarAlumno/:dniProfesor/:legajo/:dniAlumno/:nombreAlumno/:apellidoAlumno', component: CalificarAlumno, props:true},
        {path: '/FormConsultasParaCoordinador/:dni/:legajo', component: FormConsultasParaCoordinador, props:true},
        {path: '/FormCambioDatosProfesor/:dni/:legajo', component: FormCambioDatosProfesor, props:true},
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
            {path: '/CoordinadorProfesorListar', component: CoordinadorProfesorListar},
            {path: '/CoordinadorProfesorAlta', component: CoordinadorProfesorAlta},
            {path: '/CoordinadorProfesorConsultas', component: CoordinadorProfesorConsultas},
            {path: '/CoordinadorOpcionesDatos', component: CoordinadorOpcionesDatos}
        ]},
    ]
})

