import Cliente from './clientProfesores.js'
import Servidor from '../src/server/app.js'
import DbClientFactory from "../src/server/db/DbClientFactory.js"


async function testbuscarTodos(cli){
    console.log("\nCorriendo test:  Obtener todos los todos los profesores")
    let rta = await cli.buscarTodos()
    //console.log(rta)

    if (rta.estado) {
        console.log("Test fallla con error: ", rta.descripcion)
        return true
    } else {
        console.log("Test OK")
        return false
    }
}


async function testAgregarProfesor(cli){

    console.log("\nCorriendo test:  Agregar un profesor")

    let dato =   {   
        dni: 9700001,    
        direccion: 'UNACALLE', 
        telefono: '666666',
        email: 'UN@MAIL',
        nombre: 'UNNOMBRE',
        apellido: 'UNAPELLIDO',
        legajo: 878787,
    }
    
    let rta
    rta = await cli.crearProfesor(dato)

    //console.log(rta)
        
    if (rta.estado) {
        console.log("Test fallla con error: ", rta.descripcion)
        return true
    } else {
        console.log("Test OK")
        return false
    }


}

async function testObtenerPorDniProfesor(cli){
    console.log("\nCorriendo test:  Buscar profesor por dni")
    let rta = await cli.buscarPorParametros({ dni: 9700001 })

    //console.log(rta)
       
    if (rta.estado) {
        console.log("Test fallla con error: ", rta.descripcion)
        return true
    } else {
        console.log("Test OK")
        return false
    }
}

async function testObtenerPorLegajoProfesor(cli){
    console.log("\nCorriendo test:  Buscar profesor por legajo")
    let rta = await cli.buscarPorParametros({ legajo: 878787 })

    //console.log(rta)
       
    if (rta.estado) {
        console.log("Test fallla con error: ", rta.descripcion)
        return true
    } else {
        console.log("Test OK")
        return false
    }
}

async function testModificarDatosPorDniProfesor(cli){

    console.log("\nCorriendo test:  Modificar datos de un profesor")

    let datoNuevo =   {   
        dni: 9700001,    
        direccion: 'UNACALLENUEVA', 
        telefono: '666666',
        email: 'UN@MAILNUEVO',
        nombre: 'UNNOMBRENUEVO2',
        apellido: 'UNAPELLIDONUEVO2',
        legajo: 878787,
    }

    let rta = await cli.reemplazar(datoNuevo, 9700001)
     
    //console.log(rta)
    
    if (rta.estado) {
        console.log("Test fallla con error: ", rta.descripcion)
        return true
    } else {
        console.log("Test OK")
        return false
    }
}

async function testEliminarProfesor(cli){ 
    console.log("\nCorriendo test:  Eliminar un profesor")
    
    let rta = await cli.eliminarProfesor(878787)
    //console.log(rta)

    if (rta.error) {
        console.log("Test falla con error: ", rta.msg)
        return true
    } else {
        console.log("Test OK")
        return false
    }
}


async function testAsignarCursoAProfesor(cli) {
    console.log("\nCorriendo test:  Asignar curso a profesor")
    
    let legajo = 878787
    let curso = 100

    let rta = await cli.asignarCursoAProfesor(curso,legajo)
    //console.log(rta)

    if (rta.error) {
        console.log("Test falla con error: ", rta.msg)
        return true
    } else {
        console.log("Test OK")
        return false
    }
}

async function testEliminarCursoDeProfesor(cli) {
    console.log("\nCorriendo test:  Eliminar curso de profesor")

    let legajo = 878787
    let curso = 100

    let rta = await cli.eliminarCursoDeProfesor(curso, legajo)
    //console.log(rta)

    if (rta.error) {
        console.log("Test falla con error: ", rta.msg)
        return true
    } else {
        console.log("Test OK")
        return false
    }
}


async function testListarCursosProfesor(cli) {
    console.log("\nCorriendo test: Buscar cursos de un profesor")

    let rta = await cli.buscarCursosPorLegajo(1000)
    //console.log(rta)

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
        testAgregarProfesor,
        testObtenerPorDniProfesor,
        testObtenerPorLegajoProfesor,
        testbuscarTodos,
        testModificarDatosPorDniProfesor,
        testAsignarCursoAProfesor,
        testEliminarCursoDeProfesor,
        testEliminarProfesor,
        testListarCursosProfesor
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