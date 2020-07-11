import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state : {
        usuario : undefined,
        curso: undefined,
        estoyConectado: false
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
    }
})
