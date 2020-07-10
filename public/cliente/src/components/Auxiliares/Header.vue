<template>

  <section class="src-components-header">
    <div class="header">
      <h2>{{texto}}</h2>
    </div>
    

  </section>

</template>

<script lang="js">

  export default  {
    name: 'src-components-header',
    props: ['texto'],
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
  .src-components-header {

  }
  .header {
    text-align: center;
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
</style>
