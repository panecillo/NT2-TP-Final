import request from 'request-promise-native'

class Cliente {

    constructor(ipServidor, puerto) {
        this.puerto = puerto
        this.serverUrl = `${ipServidor}:${puerto}/api/profesor`
    }

    async crearProfesor(profesor) {
        const postOpt = {
            method: 'POST',
            uri: this.serverUrl,
            json: true
        }
        if (profesor) {
            postOpt.body = profesor
        }

        const cliDTO = await request(postOpt)
        return cliDTO
    }

    async borrarProfesor(dni) {
        await request({
            method: 'DELETE',
            uri: this.serverUrl + '/' + dni,
            json: true
        })
    }

    async eliminarProfesor(legajo){

        const options = {
            method: 'DELETE',
            uri: this.serverUrl + '/' + legajo,
            json: true
        }

        return await request(options)
    }

    async buscarTodos() {
        const cliDTOs = await request({
            method: 'GET',
            uri: this.serverUrl,
            json: true
        })
        return cliDTOs
    }

    async buscarPorParametros(params) {
        const cliDTOs = await request({
            method: 'GET',
            uri: this.serverUrl,
            qs: params,
            json: true
        })
        return cliDTOs
    }

    async buscarCursosPorLegajo(legajo) {
        const cliDTOs = await request({
            method: 'GET',
            uri: this.serverUrl + '/getcursosporlegajo/' + legajo,
            json: true
        })
        return cliDTOs
    }
    
    async asignarCursoAProfesor(curso, legajo) {
        const cliDTO = await request({
            method: 'PUT',
            uri: this.serverUrl + '/cursoaprofesor/',
            body: {curso, legajo},
            json: true
        })
        return cliDTO
    }

    async eliminarCursoDeProfesor(curso, legajo){

        const options = {
            method: 'DELETE',
            uri: this.serverUrl + '/' + curso + '/' + legajo,
            json: true
        }
        return await request(options)
    }

    async reemplazar(nuevoprofe) {
        const cliDTO = await request({
            method: 'PUT',
            uri: this.serverUrl,
            body: nuevoprofe,
            json: true
        })
        return cliDTO
    }
}

export default Cliente
