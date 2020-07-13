import Vue from "vue";

var miMixin = {
  methods: {
    toggleConectado(){
      this.$store.dispatch('toggleConectado')
    },
    toggleEnviando() {
      this.enviando = !this.enviando
    },
  },
  computed: {

  },
  created() {
  }

}

Vue.mixin(miMixin)
