<template>

  <section class="src-components-coordinador">
    <h1>Hola {{this.$route.query.nombre}} {{this.$route.query.apellido}}</h1>
  </section>

</template>

<script lang="js">

  export default  {
    name: 'src-components-coordinador',
    props: [],
    mounted () {

    },
    data () {
      return {

      }
    },
    methods: {

    },
    computed: {

    }
}


</script>

<style scoped lang="css">
  .src-components-coordinador {

  }
</style>
