import Cliente from './clientAlumnos.js'
import Servidor from '../src/server/app.js'
import util from 'util'

async function testAgregarAlumno(cli){

    let dato1 =   {   
        dni: 30000001,    
        direccion: 'Rivadavia 1234', 
        telefono: '1152523434',
        email: 'carlos@mail.com',
        nombre: 'Carlos',
        apellido: 'Gomez',
        
    }
    let alumno1 = await cli.agregarAlumno(dato1)
    console.log("\nAgregar Alumno 1: ")
    console.log(util.inspect(alumno1, {showHidden: false, depth: null, colors: true}))

    let dato2 =   {   
        dni: 31000002,    
        direccion: 'Diaz Velez 1234', 
        telefono: '1152223434',
        email: 'carlos@mail.com',
        nombre: 'Juan',
        apellido: 'Castro',
        
    }
    let alumno2 = await cli.agregarAlumno(dato2)
    console.log("\nAgregar Alumno 2: ")
    console.log(util.inspect(alumno2, {showHidden: false, depth: null, colors: true}))

    let dato3 =   {   
        dni: 31000003,    
        direccion: 'Carabobo 1234', 
        telefono: '1151113434',
        email: 'carlos@mail.com',
        nombre: 'Raul',
        apellido: 'Garcia',
        
    }
    let alumno3 = await cli.agregarAlumno(dato3)
    console.log("\nAgregar Alumno 3: ")
    console.log(util.inspect(alumno3, {showHidden: false, depth: null, colors: true}))

    let dato4 =   {   
        dni: 31000125,    
        direccion: 'Caracas 1234', 
        telefono: '1151444434',
        email: 'jlian@mail.com',
        nombre: 'Julian',
        apellido: 'Garcia',
        
    }
    let alumno4 = await cli.agregarAlumno(dato4)
    console.log("\nAgregar Alumno 4: ")
    console.log(util.inspect(alumno3, {showHidden: false, depth: null, colors: true}))

}

async function testObtenerTodosAlumno(cli){
    let alumnos = await cli.obtenerTodosAlumno()
    console.log("\nObtener todos los alumnos: ")
    console.log(util.inspect(alumnos, {showHidden: false, depth: null, colors: true}))
}

async function testObtenerAlumnoPorDni(cli){
    let alumno = await cli.obtenerAlumnoPorDni(30307686)
    console.log("\nBusqueda por DNI: ")
    console.log(util.inspect(alumno, {showHidden: false, depth: null, colors: true}))
}


async function testEliminarAlumnoFalla(cli){
    console.log("\nEliminar un alumno:")      
    let alumno = await cli.eliminarAlumno(30000007)
    console.log(util.inspect(alumno, {showHidden: false, depth: null, colors: true}))
}

async function testEliminarAlumnoExito(cli){
    console.log("\nEliminar un alumno:")      
    let alumno = await cli.eliminarAlumno(30000001)
    console.log(util.inspect(alumno, {showHidden: false, depth: null, colors: true}))
}

async function testObtenerDatosCursoPorAlumno(cli){
    let dni = 29004601
    console.log(`\nBuscando datos del curso del alumno con dni ${dni}`)
    let datosCurso = await cli.obtenerDatosCursoPorAlumno(dni)
    console.log(util.inspect(datosCurso, {showHidden: false, depth: null, colors: true}))
}

async function testModificarCursoAlumno(cli){  
    let dni = 112233
    let idCurso = 120
    console.log("\nAgregar curso a un alumno:")  
        
    let alumnoCurso = await cli.modificarCursoAlumno(dni,idCurso)
    console.log(util.inspect(alumnoCurso, {showHidden: false, depth: null, colors: true}))
    console.log("\n")
}

async function testModificarAlumno(cli){  
    let datosParaModificar =   {   
        dni: 31000125,    
        direccion: 'Caracas 1238', 
        telefono: '1151444435',
        email: 'jlian@mail.com',
        nombre: 'Julian',
        apellido: 'Garcia',
    }
    console.log("\Modificar datos de un alumno:")  
        
    let alumno = await cli.modificarAlumno(datosParaModificar)
    console.log(util.inspect(alumno, {showHidden: false, depth: null, colors: true}))
}

async function main(){  

    const tests = [
        testAgregarAlumno,
        testObtenerTodosAlumno,
        testObtenerAlumnoPorDni,
        testEliminarAlumnoFalla,
        testEliminarAlumnoExito,
        testObtenerDatosCursoPorAlumno,
        testModificarCursoAlumno,
        testModificarAlumno
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

main()