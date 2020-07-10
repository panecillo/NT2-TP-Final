import CoordinadorDao from './CoordinadorDao.js'
import DbClientFactory from '../db/DbClientFactory.js'


class CoordinadorDaoDb extends CoordinadorDao {

    constructor(){
        super()
        this.client = DbClientFactory.getDbClient()
        
    }

    async insertarCoordinador(datoscontacto) {
        let resultadoCargaDatos
        let resultado
    
        

        // Para que tome la estructura de datos que necesita la tabla datos de contacto, me sobra el legajo
        const datosCoordi = {
            dni: datoscontacto.dni,
            nombre: datoscontacto.nombre,
            apellido: datoscontacto.apellido,
            direccion: datoscontacto.direccion,
            telefono: datoscontacto.telefono,
            email: datoscontacto.email
        }
        
    
        try {
            const db = await this.client.getDb()
            resultadoCargaDatos = await db.insert(datosCoordi).into('Datoscontacto')
            await db.insert({'dni':datoscontacto.dni, 'legajo':datoscontacto.legajo,'tipoempleado':'Coordinador'}).into('empleados')
            await db.insert({'dni':datoscontacto.dni, 'legajo':datoscontacto.legajo}).into('empleadoslegajos')
        }
        catch(error) {
        
            resultado = {
                "error": 400,
                "msg": "Error en la carga"
            }
            return resultado
        
        }
        
        return resultadoCargaDatos
    }

    async leerTodosCoordinador() {  
        let listaCoordi = []  
        try {  
            const db = await this.client.getDb()
            listaCoordi = await db.select().from('empleados')
            .innerJoin('empleadoslegajos', 'empleadoslegajos.legajo', 'empleados.legajo')
            .innerJoin('datoscontacto', 'datoscontacto.dni', 'empleadoslegajos.dni')
            .where('empleados.tipoempleado', '=' , 'Coordinador')
               if(listaCoordi.length == 0){
                   resultado = {
                       "error": 400,
                       "msg": "No hay Coordinadores cargados"
                   }
           }
    
        }
        catch(error) {
            resultado = {
                "error": 400,
                "msg": error
            }
            return resultado
        }
        return listaCoordi
    }   

    async buscarPorDniCoordinador(nroDni) { 

        // Cambiarlo a por legajo
        
        let resultado = null
        try {
            const db = await this.client.getDb()
            resultado = await db.select().from('datoscontacto')
            .innerJoin('empleados', 'datoscontacto.dni', 'empleados.dni')
            .where('datoscontacto.dni', '=' , nroDni)
            .andWhere('empleados.tipoempleado','=','Coordinador')
            if(resultado.length == 0){
                resultado = {
                    "error": 400,
                    "msg": "DNI no encontrado"
                }
                return resultado
            }
        }
        catch(error) {
            resultado = {
                "error": 400,
                "msg": error
            }
            return resultado
        }
        return resultado
    }  

    async eliminarCoordinador(legajo){

        let resultadoDatosPersonales
        let resultadoEmpleadosLegajos
        let resultadoEmpleados
        let resultadoCoordinadoresCursos
        let dni = 0
        let resultado
        
        
        try{
    
            // Voy a necesitar saber el dni del Coordinador para mas adelante....
            // console.log("voy a buscar primero a ver si esta este legajo: (",legajo,"), asi le asocio el dni")
            const db = await this.client.getDb()
            let busquedaDNI = await db.select()
            .from('empleadoslegajos')
            .where('empleadoslegajos.legajo', '=', legajo)
            .asCallback((err,rows) => {
                if (err) console.log("Ese legajo no esta en la lista de empleados")
            })


            if (busquedaDNI.length) {
                dni = (JSON.parse(JSON.stringify(busquedaDNI)))[0].dni
                // Hago el delete de las 4 tablas
                
                resultadoEmpleadosLegajos = await db.delete()
                .from('empleadoslegajos')
                .where('empleadoslegajos.legajo', '=', legajo)

                resultadoEmpleados = await db.delete()
                .from('empleados')
                .where('empleados.legajo', '=', legajo)

                resultadoDatosPersonales = await db.delete()
                .from('datoscontacto')
                .where('datoscontacto.dni', '=', dni)
            }
        
        } catch(error){
            resultado = {
                "error": 400,
                "msg": error
            }
            return resultado
        }
        if (dni != 0) 
        {
            return resultadoDatosPersonales
        } else {
            resultado = {
                "error": 400,
                "msg": "No se encuentra el empleado"
            }
            return resultado
        }
    }

    async modificarCoordinador(DatoscontactoNuevo) {
    
        // Corregir y hacer por legajo mejor?  Porque así como está solo modifica los datos de contacto
    
        // Para que tome la estructura de datos que necesita la tabla datos de contacto, me sobra el legajo
        const datosCoordi = {
            dni: DatoscontactoNuevo.dni,
            nombre: DatoscontactoNuevo.nombre,
            apellido: DatoscontactoNuevo.apellido,
            direccion: DatoscontactoNuevo.direccion,
            telefono: DatoscontactoNuevo.telefono,
            email: DatoscontactoNuevo.email
        }
        
        let resultado
        let resultadoRecargaLegajo
        try{
            const db = await this.client.getDb()
            resultado = await db.update(datosCoordi)
            .where('dni','=',DatoscontactoNuevo.dni)
            .from('Datoscontacto')
            resultadoRecargaLegajo = await db.update({'dni':DatoscontactoNuevo.dni, 'legajo':DatoscontactoNuevo.legajo})
            .where('dni','=',DatoscontactoNuevo.dni)
            .from('empleadoslegajos')
        }catch(error){
            resultado = {
                "error": 400,
                "msg": error
            }
            return resultado
        }
        return resultado
    }

    async buscarHorariosDeProfesor(nroLegajo) { 
    
        //let resultado1 = null
        let resultado2 = null
        try {
            //resultado1 = await this.db.client.select('nombre', 'apellido').from('datoscontacto')
            //.innerJoin('empleados', 'empleados.dni', 'datoscontacto.dni' ).where('empleados.legajo', nroLegajo)
            const db = await this.client.getDb()
            resultado2 = await db.select('fechaclase').from('horarioscurso')
            .innerJoin('profesorescursos', 'profesorescursos.idcurso', 'horarioscurso.idcurso' ).where('profesorescursos.legajo', nroLegajo)
            if(resultado2.length == 0){
                resultado2 = {
                    "error": 400,
                    "msg": "El Profesor no tiene cursos activos"
                }
            }
        }
        catch(error) {
            resultado2 = {
                "error": 400,
                "msg": error
            }
            return resultado2
        }
    
        return resultado2
    }   

    async asignarCursoAlumnoComoCoordinador(idcurso,dni)
    {
        // Verificar que el Coordinador exista
        let buscarAlumno
        let resultado
        
        try {
            const db = await this.client.getDb()
            buscarAlumno =  await db.select().from('estudiante')
            .where('estudiante.dni', '=' , dni)
                    
            if ( buscarAlumno.length) {
                
                // El Alumno existe, debo cargar el curso
                // Actualizo la tabla Alumno/Cursos
                try {
                    resultado = await db.update({'dni':dni, 'idcurso':idcurso})
                    .where('dni','=',dni)
                    .from('estudiante')

                } catch (error) {
                    resultado = {
                        "error": 400,
                        "msg": error
                    }
                    return resultado
                }

            } else {
                // El Alumno no existe, debo devolver un error
                resultado = {
                    "error": 400,
                    "msg": "El Alumno no existe"
                }
                return resultado
            }

        } catch (error) {
            resultado = {
                "error": 400,
                "msg": error
            }
            return resultado
        }
    
        return resultado

    }

    async crearCursoNuevo(cursoNuevo) {
        let resultadoCarga
        let resultado
    
        try {
            const db = await this.client.getDb()
            resultadoCarga= await db.insert({'idcurso':cursoNuevo.idcurso, 'nombrecurso':cursoNuevo.nombrecurso}).into('curso')
            await db.insert({'idcurso':cursoNuevo.idcurso, 'fechaclase':cursoNuevo.fechaclase}).into('horarioscurso')
        }
        catch(error) {
        
            resultado = {
                "error": 400,
                "msg": "Error en la carga"
            }
            return resultado
        
        }
        
        return resultadoCarga
    }


    async eliminarCursoDeCoordinador(idcurso, legajo)
    {
        let resultado

        try {
            const db = await this.client.getDb()
            resultado = await db.delete()
            .from('Coordinadorescursos')
            .where('Coordinadorescursos.legajo', '=', legajo)
            .andWhere('Coordinadorescursos.idcurso', '=', idcurso)
        } catch (error) {
            resultado = {
                "error": 400,
                "msg": "No puedo eliminar el Coordinador, recibo error: " + error
            }
            return resultado
        }

        return resultado
    }


}

export default CoordinadorDaoDb