/* eslint-disable no-unused-vars */
import CustomError from '../errores/CustomError.js'

class ProfesorDao {

    async insertarProfesor(datoscontacto) {
        throw new CustomError(500, 'falta implementar insertarProfesor!')
    }

    async leerTodosProfesor() {
        throw new CustomError(500, 'falta implementar leerTodosProfesor!')
    }

    async buscarPorDniProfesor(nroDni) {
        throw new CustomError(500, 'falta implementar buscarPorDniProfesor!')
    }

    async eliminarProfesor(legajo) {
        throw new CustomError(500, 'falta implementar eliminarProfesor!')
    }

    async modificarProfesor(DatoscontactoNuevo) {
        throw new CustomError(500, 'falta implementar modificarProfesor!')    
    }
}

export default ProfesorDao