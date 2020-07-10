import Joi from '@hapi/joi'

class Coordinador {

    constructor(id, legajo, nombre, apellido, direccion, telefono, email) {
        this.id = id
        this.legajo = legajo
        this.nombre = nombre
        this.apellido = apellido
        this.direccion = direccion
        this.email = email
        this.telefono = telefono
    }

    equals(otroCoordinador) {
        if (!(otroCoordinador instanceof Coordinador)) {
            return false
        }
        if (this.nombre != otroCoordinador.nombre) {
            return false
        }
        if (this.apellido != otroCoordinador.nombre) {
            return false
        }
        if (this.dni != otroCoordinador.dni) {
            return false
        }
        if (this.legajo != otroCoordinador.legajo) {
            return false
        }
        if (this.direccion != otroCoordinador.direccion) {
            return false
        }
        if (this.telefono != otroCoordinador.telefono) {
            return false
        }
        if (this.email != otroCoordinador.email) {
            return false
        }
        return true
    }

    static validar(coordinador) {
        const coordinadorSchema = {
            dni: Joi.number().min(1).max(99999999).required(),
            direccion: Joi.string().alphanum().min(1).required(),
            telefono: Joi.number().integer().min(0),
            email: Joi.string().min(1).required(),
            nombre: Joi.string().alphanum().min(1).required(),
            apellido: Joi.string().alphanum().min(1).required(),
            legajo: Joi.number().integer().min(0).required(),            
        }

        const { error } = Joi.validate(coordinador, coordinadorSchema)
        if (error) {
            throw error
        }
        return true
    }

}


export default Coordinador