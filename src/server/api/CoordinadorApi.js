import Coordinador from '../modelo/Coordinador.js'
import CoordinadorDaoFactory from '../dao/CoordinadorDaoFactory.js'
import CustomError from '../errores/CustomError.js'


class CoordinadorApi {

    constructor() {
        this.coordinadorDao = CoordinadorDaoFactory.getDao()
    }


    async agregar(datos) {
        CoordinadorApi.asegurarCoordinadorValido(datos)
        let respuesta = await this.coordinadorDao.insertarCoordinador(datos)
        
        if (respuesta.error) {
            throw new CustomError(400, 'no puedo agregar al coordinador', datos)
        }
    }

    async buscar(queryParams) {
        let coordinadores
        if (queryParams.size == 0) {
            coordinadores = await this.coordinadorDao.leerTodosCoordinador()
        } else if (queryParams.has('dni')) {
            coordinadores = await this.coordinadorDao.buscarPorDniCoordinador(queryParams.get('dni'))
        } else {
            throw new CustomError(400, 'parametros de consulta invalidos', queryParams)
        }
        return coordinadores
    }

    async buscarProfesor(legajo) {
        let profesor
        profesor = await this.coordinadorDao.buscarHorariosDeProfesor(legajo)
        return profesor
    }

    async borrar(legajo) {
        let respuesta = await this.coordinadorDao.eliminarCoordinador(legajo)
        return respuesta
    }

    async modificar(datosnuevos) {
        CoordinadorApi.asegurarCoordinadorValido(datosnuevos)
        await this.coordinadorDao.modificarCoordinador(datosnuevos)
    }

    async asignarCursoAlumnoComoCoordinador(curso, dni)
    {   
        let respuesta = await this.coordinadorDao.asignarCursoAlumnoComoCoordinador(curso, dni)
        return respuesta
    }

    async crearCursoNuevo(cursoNuevo)
    {   
        let respuesta = await this.coordinadorDao.crearCursoNuevo(cursoNuevo)
        return respuesta
    }

    async eliminarCursoDeCoordinador(curso, legajo)
    {
        let respuesta = await this.coordinadorDao.eliminarCursoDeCoordinador(curso, legajo)
        return respuesta
    }

    static asegurarCoordinadorValido(coordinador) {
        try {
            Coordinador.validar(coordinador)
        } catch (error) {
            throw new CustomError(400, 'el coordinador posee un formato json invalido o faltan datos', error)
        }
    }

}

export default CoordinadorApi