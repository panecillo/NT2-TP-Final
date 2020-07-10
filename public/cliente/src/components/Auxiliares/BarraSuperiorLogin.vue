<template>

  <section class="src-components-barra-superior">
    <div class="logo">
      <img src="../../../public/logoInstituto.png" width="150" height="54" alt="Instituto ORTBRIDGE">
    </div>
  </section>

</template>

<script lang="js">

  export default  {
    name: 'src-components-barra-superior',
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
  .src-components-barra-superior {
    background-color: #345b9e;
  }
  .logo {
    display: inline-block;
  }

</style>
