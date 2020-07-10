import Joi from '@hapi/joi'
import DatosContacto from './DatosContactoModelo.js'

class Alumno {

    constructor(dni, direccion, telefono, email, nombre, apellido) {

/*         let _datosContacto = this._crearDatosContacto(dni, direccion, telefono, email, nombre, apellido)
        let _cursoId = null

        this.getCursoId = () => _cursoId
        this.setCursoId = (cursoId) => _cursoId = cursoId

        this.getDatosContacto = () => _datosContacto
        this.setDatosContacto = (datosContacto) => _datosContacto = datosContacto */

        this.datosContacto = this.crearDatosContacto(dni, direccion, telefono, email, nombre, apellido)
        this.cursoId = null
    }

    static validarAlumno(alumno) {
        const alumnoSchema = {
            cursoId: Joi.number().integer().min(0).allow(null)
        }
        
        const { err } = Joi.validate(alumno, alumnoSchema)
        if (err) {
            throw err
        }

        try{
            DatosContacto.validarDatosContacto(alumno.datosContacto)
        }
        catch(err){
            throw err
        }
    }

    crearDatosContacto(dni, direccion, telefono, email, nombre, apellido) {
        let datosContacto = new DatosContacto(dni, direccion, telefono, email, nombre, apellido)
        return datosContacto
    }

}

export default Alumno