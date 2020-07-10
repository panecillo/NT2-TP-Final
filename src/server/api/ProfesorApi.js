import Profesor from '../modelo/Profesor.js'
import ProfesorDaoFactory from '../dao/ProfesorDaoFactory.js'
import CustomError from '../errores/CustomError.js'


class ProfesorApi {

    constructor() {
        this.profesorDao = ProfesorDaoFactory.getDao()
    }


    async agregar(datos) {
        // Instancio un profesor y lo valido
        let profesor = new Profesor(datos.dni,datos.legajo,datos.nombre,datos.apellido,datos.direccion,datos.telefono,datos.email)
        ProfesorApi.asegurarProfesorValido(profesor)
        let respuesta = await this.profesorDao.insertarProfesor(profesor)
        
        if (respuesta.error) {
            throw new CustomError(400, 'no puedo agregar al profesor', datos)
        }
    }

    async buscar(queryParams) {
        let profesores
        if (queryParams.size == 0) {
            profesores = await this.profesorDao.leerTodosProfesor()
        } else if (queryParams.has('dni')) {
            profesores = await this.profesorDao.buscarPorDniProfesor(queryParams.get('dni'))
        } else if (queryParams.has('legajo')) {
            profesores = await this.profesorDao.buscarPorLegajoProfesor(queryParams.get('legajo'))
        } else {
            throw new CustomError(400, 'parametros de consulta invalidos', queryParams)
        }
        return profesores
    }

    async buscarCursos(legajo) {
        let cursos
        cursos = await this.profesorDao.buscarCursosDeProfesor(legajo)
        return cursos
    }

    async buscarHorarios(legajo) {
        let horarios
        horarios = await this.profesorDao.buscarHorariosDeProfesor(legajo)
        return horarios
    }

    async borrar(legajo) {
        let respuesta = await this.profesorDao.eliminarProfesor(legajo)
        return respuesta
    }

    async modificar(datosnuevos) {
        ProfesorApi.asegurarProfesorValido(datosnuevos)
        await this.profesorDao.modificarProfesor(datosnuevos)
    }

    async asignarCursoAProfesor(curso, legajo)
    {
        let respuesta = await this.profesorDao.asignarCursoAProfesor(curso, legajo)
        return respuesta
    }

    async cargarConsultaParaCoordinador(datos) 
    {
        let respuesta = await this.profesorDao.cargarConsultaParaCoordinador(datos)
        return respuesta
    }

    async cargarSolicitudActualizacionDatos(datos)
    {
        let respuesta = await this.profesorDao.cargarSolicitudActualizacionDatos(datos)
        return respuesta
    }

    async eliminarCursoDeProfesor(curso, legajo)
    {
        let respuesta = await this.profesorDao.eliminarCursoDeProfesor(curso, legajo)
        return respuesta
    }

    static asegurarProfesorValido(profesor) {
        try {
            Profesor.validar(profesor)
        } catch (error) {
            throw new CustomError(400, 'El profesor posee un formato json invalido o faltan datos', error)
        }
    }

}

export default ProfesorApi