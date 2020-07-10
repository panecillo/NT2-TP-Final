import CursoDaoFactory from '../dao/CursoDaoFactory.js'
//import CustomError from '../errores/CustomError.js'


class CursoApi {

    constructor() {
        this.cursoDao = CursoDaoFactory.getDao()
    }


    async buscarAlumnos(idCurso) {
        let alumnos
        alumnos = await this.cursoDao.buscarAlumnosCurso(idCurso)
        return alumnos
    }

    async buscarClases(idCurso) {
        let clases 
        clases = await this.cursoDao.buscarClasesCurso(idCurso)
        return clases
    }

    async buscarTemas(idCurso) {
        let temas 
        temas = await this.cursoDao.buscarTemarioCurso(idCurso)
        return temas
    }

    async buscarCursos() {
        try {
            let cursos
            cursos = await this.cursoDao.buscarCursos()
            return cursos
        } catch(err){
            if(!(err instanceof CustomError)){
                throw new CustomError(400, 'Error al agregar curso al alumno', err)
            }
            throw err
        }
    }


}

export default CursoApi