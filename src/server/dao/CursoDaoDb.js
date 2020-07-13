import CursoDao from './ProfesorDao.js'
import DbClientFactory from '../db/DbClientFactory.js'




class CursoDaoDb extends CursoDao {

    constructor(){
        super()
        this.client = DbClientFactory.getDbClient()
        
    }

    async leerTodosCursos() {
        let listaCursos

        try {  
            const db = await this.client.getDb()
            listaCursos = await db.select().from('curso')
            if(listaCursos.length == 0){
                resultado = {
                    "error": 400,
                    "msg": "No hay cursos cargados"
                }
            }
        }
        catch(error) {
            resultado = {
                "error": 400,
                "msg": error
            }
            return resultado
        }
        return listaCursos
    }

    async buscarAlumnosCurso(idCurso) {
        let listaAlumnos

        try {
            const db = await this.client.getDb()
            listaAlumnos = await db.select().from('datoscontacto')
            .innerJoin('estudiante', 'estudiante.dni', 'datoscontacto.dni')
            .innerJoin('estudiantenotas', 'estudiantenotas.dni', 'estudiante.dni')
            .innerJoin('curso', 'curso.idcurso', 'estudiante.idcurso')
            .where('curso.idcurso', '=', idCurso)

            if(listaAlumnos.length == 0){
                resultado = {
                    "error": 400,
                    "msg": "No hay alumnos cargados en el curso"
                }
                return resultado
            }

        } catch (error) {
            resultado = {
                "error": 400,
                "msg": error
            }
            return resultado
        }
        return listaAlumnos
    }

    async buscarClasesCurso(idCurso) {
        let listaClases
        
        try {
            const db = await this.client.getDb()
            listaClases = await db.select().from('horarioscurso')
            .where('horarioscurso.idcurso', '=', idCurso )

            if(listaClases.length == 0){
                resultado = {
                    "error": 400,
                    "msg": "No hay clases cargadas para este curso"
                }
                return resultado
            }
        } catch (error) {
            resultado = {
                "error": 400,
                "msg": error
            }
            return resultado
        }
        return listaClases        
    }

    async buscarTemarioCurso(idCurso) {
        let listaTemas
        
        try {
            const db = await this.client.getDb()
            listaTemas = await db.select().from('temascurso')
            .where('temascurso.idcurso', '=', idCurso )

            if(listaTemas.length == 0){
                resultado = {
                    "error": 400,
                    "msg": "No hay temas cargados para este curso"
                }
                return resultado
            }
        } catch (error) {
            resultado = {
                "error": 400,
                "msg": error
            }
            return resultado
        }
        return listaTemas        
        
    }

    async buscarCursos() {
        let cursos
        try {
            const db = await this.client.getDb()
            cursos = await db.select().from('curso')
            .leftJoin('nivel', 'nivel.idcurso', 'curso.idcurso')
            .leftJoin('profesorescursos', 'profesorescursos.idcurso', 'curso.idcurso')
            .leftJoin('empleadoslegajos', 'profesorescursos.legajo', 'empleadoslegajos.legajo')
            .leftJoin('datoscontacto', 'empleadoslegajos.dni', 'datoscontacto.dni')

            return cursos
        } catch (err) {
            throw new CustomError(400, 'Error al buscar los cursos', err)
        }
    }

    async buscarCurso(idCurso) {
        let curso
        try {
            const db = await this.client.getDb()
            curso = await db.select().from('curso')
            .join('nivel', 'nivel.idcurso', 'curso.idcurso')
            .join('profesorescursos', 'profesorescursos.idcurso', 'curso.idcurso')
            .join('empleadoslegajos', 'profesorescursos.legajo', 'empleadoslegajos.legajo')
            .join('datoscontacto', 'empleadoslegajos.dni', 'datoscontacto.dni')
            .where('curso.idcurso', '=', idCurso)
            return curso
        } catch (err) {
            throw new CustomError(400, 'Error al buscar el curso', err)
        }
    }
}




export default CursoDaoDb