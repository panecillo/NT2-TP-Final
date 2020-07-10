import express from 'express'
import DbClientFactory from '../server/db/DbClientFactory.js'
import { getProfesorRouter } from './routers/profesorRouter.js'
import { getCursoRouter } from './routers/cursoRouter.js'
import { getAlumnoRouter } from './routers/AlumnoRouter.js'
import { getCoordinadorRouter } from './routers/coordinadorRouter.js'
import cors from 'cors'


class App {

    constructor() {
        const app = express()
        app.use(cors())
        app.use(express.json())
        app.set('json spaces', 4)
        app.use('/api/profesor', getProfesorRouter())
        app.use('/api/curso', getCursoRouter())
        app.use('/api/alumno', getAlumnoRouter())
        app.use('/api/coordinador', getCoordinadorRouter())
        this.app = app

        this.dbClient = DbClientFactory.getDbClient()
    }

    setOnReady(cb) {
        this.app.on('app_ready', cb)
    }

    async start(port) {
        
        await this.dbClient.connect()

        if (!port) {
            port = 0
        }

        const server = this.app.listen(port, () => {
            const actualPort = server.address().port
            this.app.emit("app_ready", actualPort)
        })
    }

    async disconnect() {
        await this.dbClient.disconnect()
    }
}

export default App
