import CustomError from '../errores/CustomError.js'

class AlumnoDao {

    async add(alumnoNuevo) {
        throw new CustomError(500, 'Falta Implementar Add')
    }

}

export default AlumnoDao