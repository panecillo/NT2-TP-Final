import Vue from 'vue'
import VueForm from 'vue-form'

var options = {
    validators: {
      'rango': function(value) {
        return value >= 0 && value <= 10
      },
    }
  }

 Vue.use(VueForm, options)
  
  