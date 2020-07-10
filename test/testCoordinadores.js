import Cliente from './clientCoordinadores.js'
import Servidor from '../src/server/app.js'
import DbClientFactory from "../src/server/db/DbClientFactory.js"


async function testbuscarTodos(cli){
    console.log("\nCorriendo test:  Obtener todos los todos los coordinadores")
    let rta = await cli.buscarTodos()
    //console.log(rta)

    if (rta.estado) {
        console.log("Test falla con error: ", rta.descripcion)
        return true
    } else {
        console.log("Test OK")
        return false
    }
}


async function testAgregarCoordinador(cli){

    console.log("\nCorriendo test:  Agregar un coordinador")

    let dato =   {   
        dni: 12555679,    
        direccion: 'CALLAO2048', 
        telefono: '1132324349',
        email: 'GUIDO2@CACERES',
        nombre: 'GUIDO2',
        apellido: 'CACERES',
        legajo: 19909,
    }
    
    let rta
    rta = await cli.crearCoordinador(dato)

    console.log(rta)
        
    if (rta.estado) {
        console.log("Test falla con error: ", rta.descripcion)
        return true
    } else {
        console.log("Test OK")
        return false
    }


}

async function testObtenerPorDniCoordinador(cli){
    console.log("\nCorriendo test:  Buscar coordinador por dni")
    let rta = await cli.buscarPorParametros({ dni: 55000003 })

    console.log(rta)
       
    if (rta.estado) {
        console.log("Test falla con error: ", rta.descripcion)
        return true
    } else {
        console.log("Test OK")
        return false
    }
}

async function testModificarDatosPorDniCoordinador(cli){

    console.log("\nCorriendo test:  Modificar datos de un coordinador")

    let datoNuevo =   {   
        dni: 12555676,    
        direccion: 'UNACALLENUEVA', 
        telefono: '666666',
        email: 'UN@MAILNUEVO',
        nombre: 'UNNOMBRENUEVO2',
        apellido: 'UNAPELLIDONUEVO2',
        legajo: 878777,
    }

    let rta = await cli.reemplazar(datoNuevo, 12555660)
     
    console.log(rta)
    
    if (rta.estado) {
        console.log("Test falla con error: ", rta.descripcion)
        return true
    } else {
        console.log("Test OK")
        return false
    }
}

async function testEliminarCoordinador(cli){ 
    console.log("\nCorriendo test:  Eliminar un coordinador")
    
    let rta = await cli.eliminarCoordinador(199790)
    console.log(rta)

    if (rta.error) {
        console.log("Test falla con error: ", rta.msg)
        return true
    } else {
        console.log("Test OK")
        return false
    }
}



async function testAsignarCursoAlumnoComoCoordinador(cli) {
    console.log("\nCorriendo test:  Asignar curso a Alumno como coordinador")
    
    let dni = 112233
    let curso = 911

    let rta = await cli.asignarCursoAlumnoComoCoordinador(curso,dni)
    //console.log(rta)

    if (rta.error) {
        console.log("Test falla con error: ", rta.msg)
        return true
    } else {
        console.log("Test OK")
        return false
    }
}


async function testCrearCursoNuevo(cli){
    console.log("\nCorriendo test:  Crear curso nuevo como coordinador")
    
    let datoCurso =   {   
        idcurso: 284,
        nombrecurso: 'Ingles Tecnico 123',
        fechaclase: '2020-08-3 15:30:00',
    }

    let rta = await cli.crearCursoNuevo(datoCurso)
    //console.log(rta)

    if (rta.error) {
        console.log("Test falla con error: ", rta.msg)
        return true
    } else {
        console.log("Test OK")
        return false
    }
}

async function testListarProfesorConHorariosComoCoordinador(cli) {
    console.log("\nCorriendo test: Buscar horarios de un profesor como coordinador")

    let rta = await cli.buscarProfesorPorLegajo(1000)
    console.log(rta)

    if (rta.error) {
        console.log("Test falla con error: ", rta.msg)
        return true
    } else {
        console.log("Test OK")
        return false
    }

}



async function main() {

    const tests = [
        testAgregarCoordinador,
        testObtenerPorDniCoordinador,
        testbuscarTodos,
        testModificarDatosPorDniCoordinador,
        testEliminarCoordinador,
        testAsignarCursoAlumnoComoCoordinador,
        testCrearCursoNuevo,
        testListarProfesorConHorariosComoCoordinador,
    ]

    const ipServidor = 'http://127.0.0.1'
    
    const app = new Servidor()
    
    
    app.setOnReady(async (actualPort) => {
        const cli = new Cliente(ipServidor, actualPort)
        
        let done = 0
        let passed = 0
        let errors = 0
        let error = false

        console.log('running tests...\n')
//-------------------------------------cambie aca------------------------------//
        for (const test of tests) {
            error = await test(cli)       
            if (error) {
                errors ++
            } else {
                passed ++
            }
            done ++
         }
//-------------------------------------------------------------------//         
        console.log(`\ndone: ${done}`)
        console.log(`passed: ${passed}`)
        console.log(`errors: ${errors}`)

        await app.disconnect()
        process.exit(0)
    })

    app.start(8080)
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