import ProfesorDao from './ProfesorDao.js'
import DbClientFactory from '../db/DbClientFactory.js'



class ProfesorDaoDb extends ProfesorDao {

    constructor(){
        super()
        this.client = DbClientFactory.getDbClient()
        
    }

    async insertarProfesor(datoscontacto) {
        let resultadoCargaDatos
        let resultado
    
        // Para que tome la estructura de datos que necesita la tabla datos de contacto, 
        // me sobra el legajo
    
        const datosProfe = {
            dni: datoscontacto.dni,
            nombre: datoscontacto.nombre,
            apellido: datoscontacto.apellido,
            direccion: datoscontacto.direccion,
            telefono: datoscontacto.telefono,
            email: datoscontacto.email
        }
        
    
        try {
            const db = await this.client.getDb()
            resultadoCargaDatos = await db.insert(datosProfe).into('Datoscontacto')
            await db.insert({'dni':datoscontacto.dni, 'legajo':datoscontacto.legajo,'tipoempleado':'Profesor'}).into('empleados')
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

    async leerTodosProfesor() {  
        let listaProfes 
        try {  
            const db = await this.client.getDb()
            listaProfes = await db.select().from('datoscontacto')
            .innerJoin('empleados', 'empleados.dni', 'datoscontacto.dni')
            .where('empleados.tipoempleado', '=', 'Profesor')
            if(listaProfes.length == 0){
                resultado = {
                    "error": 400,
                    "msg": "No hay profesores cargados"
                }
            }
            //return listaProfes
        }
        catch(error) {
            resultado = {
                "error": 400,
                "msg": error
            }
            return resultado
        }
        return listaProfes
    }   


    async buscarPorLegajoProfesor(legajo) {
        let resultado

        try {
            const db = await this.client.getDb()
            resultado = await db.select().from('datoscontacto')
            .innerJoin('empleados','datoscontacto.dni', 'empleados.dni')
            .where('empleados.legajo', '=', legajo)
            .andWhere('empleados.tipoempleado', '=', 'Profesor')
            if(resultado.length == 0) {
                resultado = {
                    "error": 400,
                    "msg": "Legajo no encontrado"
                }
                return resultado
            }
        } catch(error) {
                resultado = {
                    "error": 400,
                    "msg": "Error de consulta: " + error
                }
                return resultado
        }
        return resultado
    }  

    async buscarPorDniProfesor(nroDni) { 

        let resultado = null
        try {
            const db = await this.client.getDb()
            resultado = await db.select().from('datoscontacto')
            .innerJoin('empleados', 'datoscontacto.dni', 'empleados.dni')
            .where('datoscontacto.dni', '=' , nroDni)
            .andWhere('empleados.tipoempleado','=','Profesor')
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
                "msg": "Error de consulta: " + error
            }
            return resultado
        }
        return resultado
    }  

    async eliminarProfesor(legajo){

        let resultadoDatosPersonales
        let dni = 0
        let resultado
        
        
        try{
    
            // Voy a necesitar saber el dni del profesor para mas adelante....
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
                
                await db.delete()
                .from('empleadoslegajos')
                .where('empleadoslegajos.legajo', '=', legajo)

                await db.delete()
                .from('profesorescursos')
                .where('profesorescursos.legajo','=',legajo)

                await db.delete()
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

    async modificarProfesor(DatoscontactoNuevo) {
    
        // Para que tome la estructura de datos que necesita la tabla datos de contacto, 
        // me sobra el legajo

        const datosProfe = {
            dni: DatoscontactoNuevo.dni,
            nombre: DatoscontactoNuevo.nombre,
            apellido: DatoscontactoNuevo.apellido,
            direccion: DatoscontactoNuevo.direccion,
            telefono: DatoscontactoNuevo.telefono,
            email: DatoscontactoNuevo.email
        }
        
        let resultado
        try{
            const db = await this.client.getDb()
            resultado = await db.update(datosProfe)
            .where('dni','=',DatoscontactoNuevo.dni)
            .from('Datoscontacto')
        }catch(error){
            resultado = {
                "error": 400,
                "msg": error
            }
            return resultado
        }
        return resultado
    }

    async buscarCursosDeProfesor(nroLegajo) { 
    
        let resultado = null
        try {
            const db = await this.client.getDb()
            resultado = await db.select().from('Empleados').innerJoin('ProfesoresCursos', 'ProfesoresCursos.legajo', 'Empleados.legajo' )
            .innerJoin('Curso', 'Curso.idCurso', 'ProfesoresCursos.idCurso').where('ProfesoresCursos.legajo', nroLegajo)
    
            if(resultado.length == 0){
                resultado = {
                    "error": 400,
                    "msg": "El profesor no tiene cursos activos"
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
    
        return resultado
    }   

    async asignarCursoAProfesor(idcurso,legajo)
    {
        // Verificar que el profesor exista
        let buscarProfe
        let resultado

        
        try {
            const db = await this.client.getDb()
            buscarProfe =  await db.select().from('empleados')
            .where('empleados.legajo', '=' , legajo)
                    
            if ( buscarProfe.length) {
                
                // El profesor existe, debo cargar el curso
                // Actualizo la tabla Profesores/Cursos
                try {
                    resultado = await db.insert({'legajo':legajo, 'idcurso':idcurso})
                    .into('profesorescursos')

                } catch (error) {
                    resultado = {
                        "error": 400,
                        "msg": error
                    }
                    return resultado
                }

            } else {
                // El profesor no existe, debo devolver un error
                resultado = {
                    "error": 400,
                    "msg": "El profesor no existe"
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

    async eliminarCursoDeProfesor(idcurso, legajo)
    {
        let resultado

        try {
            const db = await this.client.getDb()
            resultado = await db.delete()
            .from('profesorescursos')
            .where('profesorescursos.legajo', '=', legajo)
            .andWhere('profesorescursos.idcurso', '=', idcurso)
        } catch (error) {
            resultado = {
                "error": 400,
                "msg": "No puedo eliminar el profesor, recibo error: " + error
            }
            return resultado
        }

        return resultado
    }

    async buscarHorariosDeProfesor(nroLegajo){
        let resultado = null
        try {
            const db = await this.client.getDb()
            resultado = await db.select().from('ProfesoresCursos')
            .innerJoin('Curso','ProfesoresCursos.idcurso','Curso.idcurso')
            .innerJoin('HorariosCurso', 'Curso.idcurso', 'HorariosCurso.idcurso')
            .where('ProfesoresCursos.legajo','=',nroLegajo)
            .orderBy('fechaclase')
    
            if(resultado.length == 0){
                resultado = {
                    "error": 400,
                    "msg": "El profesor no tiene horarios cargados"
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
    
        return resultado
    }

    async cargarConsultaParaCoordinador(datos) {
        let resultado
        try {
            const db = await this.client.getDb()
            resultado = await db.insert(datos).into('consultasprofesores')
        } catch (error) {
            resultado = {
                "error": 400,
                "msg": "Error al cargar la consulta del profesor para el coordinador"
            }
        }
        return resultado
    }

    async cargarSolicitudActualizacionDatos(datos) {
        let resultado
        try {
            const db = await this.client.getDb()
            resultado = await db.insert(datos).into('actualizardatosprofesor')
        } catch (error) {
            resultado = {
                "error": 400,
                "msg": "Error al cargar el pedido de actualización de datos"
            }
        }
        return resultado
    }

}

export default ProfesorDaoDb