class DbClient {

    async connect() {
        throw new Error("falta implementar 'connect' en subclase!")
    }

    async disconnect() {
        throw new Error("falta implementar 'disconnect' en subclase!")
    }

    async getClient() {
        throw new Error("falta implementar 'getClient' en subclase!")
    }

    async getDb() {
        throw new Error("falta implementar 'getDb' en subclase!")
    }
}

export default DbClient