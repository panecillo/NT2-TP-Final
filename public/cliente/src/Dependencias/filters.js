import Vue from 'vue'


Vue.filter('formatearFecha', function(value) {
    let fecha = new Date(value)
    return fecha.toLocaleString()
})