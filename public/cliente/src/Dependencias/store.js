import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state : {
        usuario : undefined,
        curso: undefined,
        alumno: undefined,
        estoyConectado: false,
        horarios: undefined,
        urlBackend : process.env.NODE_ENV === 'production'? '': 'http://localhost:8090',
        arrayAlumnos: [],
        arrayTareas: [],
        arrayProfesores: [],
        arrayCoordinadores: [],
    },
    actions : {
        login({commit}, usuario) {
            commit('login',usuario)
        },
        guardarAlumnoLocalStorage({commit}) {
            commit('cargarAlumnoEnLocalStorage')
        },
        recuperarAlumnoLocalStorage({commit}) {
            commit('recuperarAlumnoLocalStorage')
        },
        guardarEmpleadoLocalStorage({commit}) {
            commit('cargarEmpleadoEnLocalStorage')
        },
        recuperarEmpleadoLocalStorage({commit}) {
            commit('recuperarEmpleadoLocalStorage')
        },
        logout({commit}) {
            commit('logout')
        },
        cargarCurso({commit}, curso) {
            commit('cargarCurso', curso)
        },
        toggleConectado({commit}) {
            commit('toggleConectado')
        },
        guardarCursoHorarios({commit}, horarios) {
            commit('guardarCursoHorarios', horarios)
        },
        cargaAlumno({commit}, alumno) {
            commit('cargaAlumno', alumno)
        },
        actionCargarArrayProfesores()
        {
            axios(this.state.urlBackend+'/api/profesor/')
            .then(rta => {
                this.state.arrayProfesores = rta.data
            })
            .catch(error => console.log("Fallo: ", error))
        },
        actionCargarArrayCoordinadores()
        {
            axios(this.state.urlBackend+'/api/coordinador/')
            .then(rta => {
                this.state.arrayCoordinadores = rta.data
            })
            .catch(error => console.log("Fallo: ", error))
        },
        actionGetProfesor(dni) {
            let resultado

            this.state.arrayProfesores.forEach(profesor => {
                    if ( profesor.dni == dni )
                    {
                        resultado = profesor
                    }
            });
            return resultado
        }
    },
    mutations : {
        login(state, usuario) {
            state.usuario = usuario
        },
        cargarAlumnoEnLocalStorage(state) {
            localStorage.setItem('dni',state.usuario.dni )
            localStorage.setItem('apellido',state.usuario.apellido)
            localStorage.setItem('nombre',state.usuario.nombre)
            localStorage.setItem('direccion',state.usuario.direccion)
            localStorage.setItem('email',state.usuario.email)
            localStorage.setItem('telefono',state.usuario.telefono)
        },
        recuperarAlumnoLocalStorage(state) {
            state.usuario.dni = localStorage.getItem('dni')
            state.usuario.apellido = localStorage.getItem('apellido')
            state.usuario.nombre = localStorage.getItem('nombre')
            state.usuario.direccion = localStorage.getItem('direccion')
            state.usuario.email = localStorage.getItem('email')
            state.usuario.telefono = localStorage.getItem('telefono')
        },
        cargarEmpleadoEnLocalStorage(state) {
            localStorage.setItem('dni',state.usuario.dni )
            localStorage.setItem('apellido',state.usuario.apellido)
            localStorage.setItem('nombre',state.usuario.nombre)
            localStorage.setItem('direccion',state.usuario.direccion)
            localStorage.setItem('email',state.usuario.email)
            localStorage.setItem('telefono',state.usuario.telefono)
            localStorage.setItem('tipoempleado',state.usuario.tipoempleado)
            localStorage.setItem('legajo',state.usuario.legajo)
        },
        recuperarEmpleadoLocalStorage(state) {
            state.usuario.dni = localStorage.getItem('dni')
            state.usuario.apellido = localStorage.getItem('apellido')
            state.usuario.nombre = localStorage.getItem('nombre')
            state.usuario.direccion = localStorage.getItem('direccion')
            state.usuario.email = localStorage.getItem('email')
            state.usuario.telefono = localStorage.getItem('telefono')
            state.usuario.tipoempleado = localStorage.getItem('tipoempleado')
            state.usuario.legajo = localStorage.getItem('legajo')
        },
        logout(state) {
            state.usuario = undefined
        },
        cargarCurso(state, curso) {
            state.curso = curso
        },
        toggleConectado(state) {
            state.estoyConectado = !state.estoyConectado
        },
        guardarCursoHorarios(state, horarios) {
            state.horarios = horarios
        },
        cargaAlumno(state, alumno) {
            state.alumno = alumno
        },
    }
})
