/* eslint-disable no-unused-vars */
import CustomError from '../errores/CustomError.js'

class CursoDao {

    async leerTodosCursos() {
        throw new CustomError(500, 'falta implementar leerTodosCursos!')
    }

    async buscarAlumnosCurso(idCurso) {
        throw new CustomError(500, 'falta implementar buscarAlumnosDeCurso!')
    }

    async buscarClasesCurso(idCurso) {
        throw new CustomError(500, 'falta implementar buscarClasesDeCurso!')
    }

    async buscarTemarioCurso(idCurso) {
        throw new CustomError(500, 'falta implementar buscarTemarioCurso!')    
    }
}

export default CursoDao