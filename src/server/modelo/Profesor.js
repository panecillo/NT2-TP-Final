import Joi from '@hapi/joi'

class Profesor {

    constructor(dni, legajo, nombre, apellido, direccion, telefono, email) {
        this.dni = dni
        this.legajo = legajo
        this.nombre = nombre
        this.apellido = apellido
        this.direccion = direccion
        this.email = email
        this.telefono = telefono
    }

    equals(otroProfesor) {
        if (!(otroProfesor instanceof Profesor)) {
            return false
        }
        if (this.nombre != otroProfesor.nombre) {
            return false
        }
        if (this.apellido != otroProfesor.nombre) {
            return false
        }
        if (this.dni != otroProfesor.dni) {
            return false
        }
        if (this.legajo != otroProfesor.legajo) {
            return false
        }
        if (this.direccion != otroProfesor.direccion) {
            return false
        }
        if (this.telefono != otroProfesor.telefono) {
            return false
        }
        if (this.email != otroProfesor.email) {
            return false
        }
        return true
    }

    static validar(profesor) {
        const profesorSchema = {
            dni: Joi.number().min(1).max(99999999).required(),
            direccion: Joi.string().alphanum().min(1).required(),
            telefono: Joi.number().integer().min(0),
            email: Joi.string().min(1).required(),
            nombre: Joi.string().alphanum().min(1).required(),
            apellido: Joi.string().alphanum().min(1).required(),
            legajo: Joi.number().integer().min(0).required(),            
        }

        const { error } = Joi.validate(profesor, profesorSchema)
        if (error) {
            throw error
        }
        return true
    }

}


export default Profesor