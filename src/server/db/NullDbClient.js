import CustomError from '../errores/CustomError.js'
import DbClient from './DbClient.js'

class NullDbClient extends DbClient {

    constructor() {
        super()
    }

    async connect() {
    }

    async disconnect() {
    }

    async getClient() {
        throw new CustomError(500, "no se ha configurado ningun cliente de bd para conectarse", true)
    }

    async getDb() {
        throw new CustomError(500, "no se ha configurado ningun cliente de bd para conectarse", true)
    }
}

export default NullDbClient