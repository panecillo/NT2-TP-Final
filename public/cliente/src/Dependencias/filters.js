import Vue from 'vue'


Vue.filter('formatearFecha', function(value) {
    let fecha = new Date(value)
    return fecha.toLocaleString()
})

Vue.filter('leida', function(value) {
    let traduccion
    if(value == 1) {
        traduccion = "SI"
    }
    else {
        traduccion = "NO"
    }
    return traduccion
})

Vue.filter('tieneNota', function(value) {
    let tieneNota
    if(value == "") {
        tieneNota = "NO"
    }
    else {
        tieneNota = value
    }
    return tieneNota
})