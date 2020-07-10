import Joi from '@hapi/joi'

class DatosContacto {

    constructor(dni, direccion, telefono, email, nombre, apellido) {
/*         let _dni = dni
        let _direccion = direccion
        let _telefono = telefono
        let _email = email
        let _nombre = nombre
        let _apellido = apellido
        
        this.getDni = () => _dni
        this.setDni = (dni) => _dni = dni

        this.getDireccion = () => direccion
        this.setDireccion = (direccion) => _direccion = direccion

        this.getTelefono = () => _telefono
        this.setTelefono = (telefono) => _telefono = telefono

        this.getEmail = () => _email
        this.setEmail = (email) => _email = email

        this.getNombre = () => _nombre
        this.setNombre = (nombre) => _nombre = nombre

        this.getApellido = () => _apellido
        this.setApellido = (apellido) => _apellido = apellido */

        this.dni = dni
        this.direccion = direccion
        this.telefono = telefono
        this.email = email
        this.nombre = nombre
        this.apellido = apellido

    }

    static validarDatosContacto(datosContacto) {
        const datosContactoSchema = {
            dni: Joi.number().min(1).max(99999999).required(),
            direccion: Joi.string().alphanum().min(1).required(),
            telefono: Joi.string().alphanum().min(1).required(),
            email: Joi.string().alphanum().min(1).required(),
            nombre: Joi.string().alphanum().min(1).required(),
            apellido: Joi.string().alphanum().min(1).required(),
        }
        const { err } = Joi.validate(datosContacto, datosContactoSchema)
        if (err) {
            console.log("hay errores en validarDatosContacto")
            throw err
        }
    }
}

export default DatosContacto