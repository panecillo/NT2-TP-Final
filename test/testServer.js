import Cliente from './clientProfesores.js'
import Servidor from '../src/server/app.js'
import DbClientFactory from "../src/server/db/DbClientFactory.js"



async function main() {

    
    const ipServidor = 'http://127.0.0.1'
    
    const app = new Servidor()
    
    
    app.setOnReady(async (actualPort) => {
        const cli = new Cliente(ipServidor, actualPort)
        
        console.log('Levantando servidor en ', actualPort)

         
        //await app.disconnect()
        //process.exit(0)
    })

    app.start(8090)
}

//////////////////////////////////////////////////////////////

process.stdin.resume();//so the program will not close instantly

//do something when app is closing
process.on('exit', exitHandler.bind(null, { cleanup: true }));

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, { exit: true }));

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitHandler.bind(null, { exit: true }));
process.on('SIGUSR2', exitHandler.bind(null, { exit: true }));

//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, { exit: true }));

async function exitHandler(options, exitCode) {

    if (options.cleanup) {
        await DbClientFactory.getDbClient().disconnect()
        console.log('\nprograma finalizado normalmente')
    }
    if (exitCode || exitCode === 0) {
        console.log(`\nprograma finalizado con codigo: ${exitCode}`)
    }
    if (options.exit) {
        process.exit()
    }
}

/////////////////////////////////////////////////////////////////

main()