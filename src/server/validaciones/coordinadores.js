import Coordinador from '../modelo/Coordinador.js'

function validarCoordinadores(coordinadores) {
    for (const coordinador of coordinadores) {
        validarEstudiante(coordinador)
    }
}

function validarCoordinador(coordinador) {
    Coordinador.validar(coordinador)
}

export {
    validarCoordinador,
    validarCoordinadores
}