const client = process.env.DB_CLIENT
const host = process.env.DB_HOST
const user = process.env.DB_USER
const password = process.env.DB_PASSWORD
const database = process.env.DB_NAME
const mode = process.env.DB_MODE


const config = {
    client: client || 'mysql',
    host: host || '127.0.0.1',
    user: user || 'root',
    password: password || '',
    database: database || 'instituto',
    mode: mode || 'db'
}

export default config