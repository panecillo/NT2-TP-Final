import express from 'express'
import CoordinadorApi from '../api/CoordinadorApi.js'


function getCoordinadorRouter() {

    const router = express.Router()

    const coordinadorApi = new CoordinadorApi()

    router.post('/', async (req, res) => {
        const coordinadorParaAgregar = req.body
        try {
            await coordinadorApi.agregar(coordinadorParaAgregar)
            res.status(201).json(coordinadorParaAgregar)
        } catch (err) {
            res.send(err)
        }
    })

    router.get('/', async (req, res) => {
        try {
            const queryParams = new Map(Object.entries(req.query))
            const coordinadores = await coordinadorApi.buscar(queryParams)
            res.json(coordinadores)
        } catch (err) {
            res.send(err)
        }
    })

    router.get('/getprofesorporlegajo/:legajo', async(req,res) => {
        let resultadoBuscarProfesor
        try {
            resultadoBuscarProfesor = await coordinadorApi.buscarProfesor(req.params.legajo)
            res.json(resultadoBuscarProfesor)
        } catch (err) {
            res.status(err.estado).json(err)
        }

    })

    router.delete('/:legajo', async (req, res) => {
        let resultadoEliminar
        try {
            resultadoEliminar = await coordinadorApi.borrar(req.params.legajo)
            //res.status(204).send(resultadoEliminar)
            res.json(resultadoEliminar)
        } catch (err) {
            res.status(err.estado).json(err)
        }
    })

    router.delete('/:curso/:legajo', async (req, res) => {
        let resultadoEliminar
        try {
            resultadoEliminar = await coordinadorApi.eliminarCursoDeCoordinador(req.params.curso, req.params.legajo)
            res.json(resultadoEliminar)
        } catch (err) {
            res.status(err.estado).json(err)
        }
    })

    router.put('/cursoalumnocomocoordinador/', async (req, res) => {
        //res.send("agregar el curso " + req.body.curso + " al coordinador " + req.body.legajo)
        let resultadoAsignarCurso
        try {
            resultadoAsignarCurso = await coordinadorApi.asignarCursoAlumnoComoCoordinador(req.body.curso, req.body.dni)
            res.json(resultadoAsignarCurso)
        } catch (err) {
            res.status(err.estado).json(err)
        }

    })

    
    router.post('/cursonuevo/', async (req, res) => {
        //res.send("agregar el curso " + req.body.curso + " al coordinador " + req.body.legajo)
        let resultadoCursoNuevo
        try {
            resultadoCursoNuevo = await coordinadorApi.crearCursoNuevo(req.body)
            res.json(resultadoCursoNuevo)
        } catch (err) {
            res.status(err.estado).json(err)
        }

    })


    router.put('/', async (req, res) => {
        const coordiParaReemplazar = req.body

        try {
            await coordinadorApi.modificar(coordiParaReemplazar)
            res.json(coordiParaReemplazar)
        } catch (err) {
            res.send(err)
        }
    })

    return router
}
export { getCoordinadorRouter }
