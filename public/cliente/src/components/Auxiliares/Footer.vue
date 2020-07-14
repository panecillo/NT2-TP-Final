<template>

  <section class="src-components-footer bg-dark">

    <div class="container">

      <ul class="list-unstyled list-inline text-center">
        <li class="list-inline-item">
          <a class="btn-floating btn-fb mx-1" href="https://www.facebook.com/">
            <i class="fab fa-facebook-f">
              <img src="../../../public/facebook.png">
            </i>
          </a>
        </li>
        <li class="list-inline-item">
          <a class="btn-floating btn-tw mx-1" href="https://www.instagram.com/?hl=en">
            <i class="fab fa-facebook-f">
              <img src="../../../public/instagram.png">
            </i>
          </a>
        </li>
        <li class="list-inline-item">
          <a class="btn-floating btn-gplus mx-1" href="https://www.linkedin.com/">
            <i class="fab fa-facebook-f">
              <img src="../../../public/linkedin.png">
            </i>
          </a>
        </li>
        <li class="list-inline-item">
          <a class="btn-floating btn-li mx-1" href="https://www.whatsapp.com/">
            <i class="fab fa-facebook-f">
              <img src="../../../public/whatsapp.png">
            </i>
          </a>
        </li>
        <li class="list-inline-item">
          <a class="btn-floating btn-dribbble mx-1">
            <i class="fab fa-dribbble"> </i>
          </a>
        </li>
      </ul>
    </div>

    <div class="footer-copyright text-center py-3 bg-dark">© 2020 OrtBridge</div>


  </section>

</template>

<script lang="js">

  export default  {
    name: 'src-components-footer',
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
  .src-components-footer {
    color: white;
    height: 5rem;
    padding-top: 1.5rem;
  }
  .header {
    text-align: center;
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
  .subheading {
    padding-left: 1rem;
  }
  .footer-copyright {
    font-size: 10px;
  }
  .container {
    margin-top: 0px;
    margin-bottom: 0px;
    height: 30px;
  }
  img {
    height: 20px;
    width: 20px;
  }
  .list {
    padding-bottom: 10rem;
  }
  
</style>
