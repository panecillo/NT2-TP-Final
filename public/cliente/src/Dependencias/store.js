import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state : {
        usuario : undefined,
        curso: undefined,
        alumno: undefined,
        alumnos: undefined,
        pforesor: undefined,
        consulta: undefined,
        cursos: undefined,
        estoyConectado: false,
        horarios: undefined,
        horariosProfesor: undefined,
        solicitudes: undefined,
        solicitud: undefined,
        tengoCurso: false
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
        cargarCursos({commit}, cursos) {
            commit('cargarCursos', cursos)
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
        cargaAlumnos({commit}, alumnos) {
            commit('cargaAlumnos', alumnos)
        },
        cargaProfesor({commit}, profesor) {
            commit('cargaProfesor', profesor)
        },
        guardarHorariosProfesor({commit}, horarios) {
            commit('guardarHorariosProfesor', horarios)
        },
        cargaConsulta({commit}, consulta) {
            commit('cargarConsulta', consulta)
        },
        actualizarUsuarioCoordinador({commit}, coordinador) {
            commit('actualizarUsuarioCoordinador', coordinador)
        },
        cargaSolicitudes({commit}, solicitudes) {
            commit('cargaSolicitudes', solicitudes)
        },
        cargaSolicitud({commit}, solicitud) {
            commit('cargaSolicitud', solicitud)
        },
        tengoCurso({commit}) {
            commit('tengoCurso')
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
            localStorage.setItem('idcurso',state.usuario.idcurso)
        },
        recuperarAlumnoLocalStorage(state) {
            state.usuario.dni = localStorage.getItem('dni')
            state.usuario.apellido = localStorage.getItem('apellido')
            state.usuario.nombre = localStorage.getItem('nombre')
            state.usuario.direccion = localStorage.getItem('direccion')
            state.usuario.email = localStorage.getItem('email')
            state.usuario.telefono = localStorage.getItem('telefono')
            state.usuario.idcurso = localStorage.getItem('idcurso')
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
        cargarCursos(state, cursos) {
            state.cursos = cursos
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
        cargaAlumnos(state, alumnos) {
            state.alumnos = alumnos
        },
        cargaProfesor(state, profesor) {
            state.profesor = profesor
        },
        guardarHorariosProfesor(state, horarios) {
            state.horariosProfesor = horarios
        },
        cargarConsulta(state, consulta) {
            state.consulta = consulta
        },
        actualizarUsuarioCoordinador(state, coordinador) {
            state.usuario.apellido = coordinador.apellido
            state.usuario.nombre = coordinador.nombre
            state.usuario.direccion = coordinador.direccion
            state.usuario.email = coordinador.email
            state.usuario.telefono = coordinador.telefono
        },
        cargaSolicitudes(state, solicitudes) {
            state.solicitudes = solicitudes
        },
        cargaSolicitud(state, solicitud) {
            state.solicitud = solicitud
        },
        tengoCurso(state) {
            state.tengoCurso = localStorage.getItem('idcurso') != null
        }
    }
})
