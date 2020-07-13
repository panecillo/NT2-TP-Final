import express from 'express'
import CursoApi from '../api/CursoApi.js'


function getCursoRouter() {

    const router = express.Router()

    const cursoApi = new CursoApi()

    router.get('/cursos', async (req, res) => {
        try {
            const cursos = await cursoApi.buscarCursos()
            res.json(cursos)
        } catch (err) {
            res.send(err)
        }
    })

    router.get('/cursos/:idcurso', async (req, res) => {
        try {
            const cursos = await cursoApi.buscarCurso(req.params.idcurso)
            res.json(cursos)
        } catch (err) {
            res.send(err)
        }
    })

    router.get('/:idCurso', async (req, res) => {
        try {
            const alumnos = await cursoApi.buscarAlumnos(req.params.idCurso)
            res.json(alumnos)
        } catch (err) {
            res.send(err)
        }
    })

    router.get('/:idCurso/horarios', async (req, res) => {
        try {
            const clases = await cursoApi.buscarClases(req.params.idCurso)
            res.json(clases)
        } catch (err) {
            res.send(err)
        }
    })

    router.get('/:idCurso/temario', async (req, res) => {
        try {
            const temas = await cursoApi.buscarTemas(req.params.idCurso)
            res.json(temas)
        } catch (err) {
            res.send(err)
        }
    })

    
    return router
}
export { getCursoRouter }
