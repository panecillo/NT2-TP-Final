import Profesor from '../modelo/Profesor.js'

function validarProfesores(profesores) {
    for (const profesor of profesores) {
        validarEstudiante(profesor)
    }
}

function validarProfesor(profesor) {
    Profesor.validar(profesor)
}

export {
    validarProfesor,
    validarProfesores
}