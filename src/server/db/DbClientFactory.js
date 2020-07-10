import MysqlClient from './mysqlDBClient.js'

let mysqlClient = null

function getMysqlClient() {
    if (!mysqlClient) {
        mysqlClient = new MysqlClient()
    }
    return mysqlClient
}

class DbClientFactory {
    static getDbClient() {
        return getMysqlClient()
    }
}

export default DbClientFactory