import express from 'express'
import AlumnoApi from '../api/AlumnoApi.js'
import CustomError from '../errores/CustomError.js'

function getAlumnoRouter() {

    const router = express.Router()

    const alumnoApi = new AlumnoApi()

    router.get('/', async(req, res) => {
        try {
            const alumnos = await alumnoApi.listarAlumnos()
            res.json(alumnos)
        }
        catch (err) {
            let error = new CustomError(400, 'Error al traer los alumnos', err)
            res.send(error)
        }
    })

    router.get('/notas', async(req, res) => {
        try {
            const alumnos = await alumnoApi.listarAlumnosYNotas()
            res.json(alumnos)
        }
        catch (err) {
            let error = new CustomError(400, 'Error al traer los alumnos', err)
            res.send(error)
        }
    })

    router.get('/:dni', async (req, res) => {
        try {
            const dni = req.params.dni
            const alumnos = await alumnoApi.buscarAlumno(dni)
            res.json(alumnos)
        }
        catch (err) {
            let error = new CustomError(400, 'Error al traer los alumnos', err)
            res.send(error)
        }
    })

    router.get('/datoscurso/:dni', async (req, res) => {
        try {
            const dni = req.params.dni
            const datosCurso = await alumnoApi.buscarDatosCurso(dni)
            res.json(datosCurso)
        }
        catch (err) {
            let error = new CustomError(400, 'Error buscar los datos del curso', err)
            res.send(error)
        }
    })

    router.get('/notas/:dni', async (req, res) => {
        try {
            const dni = req.params.dni
            const notas = await alumnoApi.buscarNotas(dni)
            res.json(notas)
        }
        catch (err) {
            let error = new CustomError(400, 'Error al buscar las notas del alumno:', err)
            res.send(error)
        }
    })

    router.post('/', async (req, res) => {
        const alumnoParaAgregar = req.body
        try {
            const alumnoAgregado = await alumnoApi.agregarAlumno(alumnoParaAgregar)
            res.status(201).json(alumnoAgregado)
        }
        catch (err) {
            let error = new CustomError(400, 'Error al agregar el alumno', err)
            res.send(error)
        }
    })

    router.delete('/:dni', async (req, res) => {
        try {
            const dni = req.params.dni
            const alumnoBorrado = await alumnoApi.borrarAlumno(dni)
            res.send(alumnoBorrado)
        }
        catch (err) {
            res.send(err)
        }
    })

    router.put('/:dni', async (req, res) => {
        const alumnoParaModificar = req.body
        try {
            const alumnoModificado = await alumnoApi.modificarAlumno(alumnoParaModificar)
            res.json(alumnoModificado)
        }
        catch (err) {
            res.send(err)
        }

    })

    router.post('/actualizarnotas/', async (req, res) => {
        try {
            await alumnoApi.actualizarNotas(req.body)
        } catch (error) {
            res.send(error)
        }
    })

    router.put('/cursoAlumno/:dni', async (req, res) => {
        
        const datos = req.body
        try {
            await alumnoApi.modificarCursoAlumno(datos)
            res.json(datos)
        }
        catch (err) {
            console.log(err)
            res.send(err)
        }

    })
    return router

}

export { getAlumnoRouter }