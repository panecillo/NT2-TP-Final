import AlumnoModelo from '../modelo/AlumnoModelo.js'
import CustomError from '../errores/CustomError.js'
import AlumnoDaoFactory from '../dao/AlumnoDaoFactory.js'

class AlumnoApi {

    constructor() {
        this.alumnosDao = AlumnoDaoFactory.getDao()
    }

    async agregarAlumno(al) {
        let alumnoFormateado = new AlumnoModelo(al.dni,al.direccion,al.telefono,al.email,al.nombre,al.apellido)
        try{
            AlumnoApi.asegurarAlumnoValido(alumnoFormateado)
        }
        catch(err){
            throw new CustomError(304, 'Error al validar el nuevo Alumno', err)
        }
        try{
           const alumnoAgregado = await this.alumnosDao.agregarAlumno(alumnoFormateado)
        }
        catch(err){
            throw err
        }
        return alumnoFormateado
    }

    async buscarAlumno(dni) {
        try{
            const alumno = await this.alumnosDao.buscarAlumnoPorDni(dni)
            return alumno
        }
        catch(err){
            throw err
        }
    }

    async buscarCurso(idCurso) {
        try{
            const curso = await this.alumnosDao.buscarCurso(idCurso)
            return curso
        }
        catch(err){
            throw err
        }
    }

    async listarAlumnos(){
        const alumnos = await this.alumnosDao.listarAlumnos()
        return alumnos
    }

    async listarAlumnosYNotas(){
        const alumnos = await this.alumnosDao.listarAlumnosYNotas()
        return alumnos
    }

    async borrarAlumno(dni){
        try{
            const alumno = await this.buscarAlumno(dni)
            await this.alumnosDao.borrarAlumno(dni)
            return alumno
        }
        catch(err){
            if(!(err instanceof CustomError)){
                throw new CustomError(400, 'Error al borrar el alumno', err)
            }
            throw err
            
        }
    }

    async buscarDatosCurso(dni){
        try{
            const datosCurso = await this.alumnosDao.buscarDatosCurso(dni)
            return datosCurso
        }
        catch(err){
            throw new CustomError(400, 'Error al traer los datos del curso', err)
        }
    }

    async modificarCursoAlumno(datos){
        try{
            await this.alumnosDao.modificarCursoAlumno(datos)
            return datos
        }
        catch(err){
            if(!(err instanceof CustomError)){
                throw new CustomError(400, 'Error al agregar curso al alumno', err)
            }
            throw err
        }
    }

    async modificarAlumno(alumno){
        try{
            await this.buscarAlumno(alumno.dni)
            await this.alumnosDao.modificarAlumno(alumno)
            return alumno
        }
        catch(err){
            throw new CustomError(400, 'Error al modificar alumno', err)
        }
    }

    async actualizarNotas(datos) {
        try {
            await this.alumnosDao.actualizarNotas(datos)
        }
        catch(err){
            throw new CustomError(400, 'Error al actualizar notas', err)
        }
    }

    async buscarNotas(dni) {
        let notas 
        notas = await this.alumnosDao.buscarNotas(dni)
        return notas
    }

    static asegurarAlumnoValido(alumno) {
        try {
            AlumnoModelo.validarAlumno(alumno)
        } catch (error) {
            throw new CustomError(400, 'El Alumno posee un formato json invalido o faltan datos', error)
        }
    }

}

export default AlumnoApi