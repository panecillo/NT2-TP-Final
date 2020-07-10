/* eslint-disable no-unused-vars */
import CustomError from '../errores/CustomError.js'

class CoordinadorDao {

    async insertarCoordinador(datoscontacto) {
        throw new CustomError(500, 'falta implementar insertarCoordinador!')
    }

    async leerTodosCoordinador() {
        throw new CustomError(500, 'falta implementar leerTodosCoordinador!')
    }

    async buscarPorDniCoordinador(nroDni) {
        throw new CustomError(500, 'falta implementar buscarPorDniCoordinador!')
    }

    async eliminarCoordinador(legajo) {
        throw new CustomError(500, 'falta implementar eliminarCoordinador!')
    }

    async modificarCoordinador(DatoscontactoNuevo) {
        throw new CustomError(500, 'falta implementar modificarCoordinador!')    
    }
}

export default CoordinadorDao