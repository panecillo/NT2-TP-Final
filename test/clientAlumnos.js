import request from 'request-promise-native'

class Cliente {

    constructor(ipServidor, puerto) {
        this.puerto = puerto
        this.serverUrl = `${ipServidor}:${puerto}/api/alumno`
    }

    async obtenerAlumnoPorDni(dni){
        const options = {
            method: 'GET',
            uri: this.serverUrl + '/' + dni,
            json: true,
        }

        return await request(options)
    }

    async obtenerTodosAlumno(){

        const options = {
            method: 'GET',
            uri: this.serverUrl,
            json: true
        }

        return await request(options)
    }


    async agregarAlumno(alumno){
        const options = {
            method: 'POST',
            uri: this.serverUrl,
            json: true,
            body: alumno
        }

        return await request(options)
    }

    async modificarAlumno(alumno){

        const options = {
            method: 'PUT',
            uri: this.serverUrl + '/' + alumno.dni,
            body: alumno,
            json: true
        }

        return await request(options)
    }

    async modificarCursoAlumno(dni, idCurso){
 
        const options = {
            method: 'PUT',
            uri: this.serverUrl + '/cursoAlumno/' + dni,
            body: {dni, idCurso},
            json: true
        }
        
        return await request(options)     
    }
    
    async eliminarAlumno(dni){

        const options = {
            method: 'DELETE',
            uri: this.serverUrl + '/' + dni,
            json: true
        }

        return await request(options)
    }

    async obtenerDatosCursoPorAlumno(dni){
        const options = {
            method: 'GET',
            uri: this.serverUrl + '/datoscurso/' + dni,
            json: true,
        }

        return await request(options)
    } 

}

export default Cliente
