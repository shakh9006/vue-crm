<template>
  <div id="app">
    <compoenent :is="layout">
      <router-view></router-view>
    </compoenent>
  </div>
</template>

<script>
  import EmptyLayout from "./layouts/EmptyLayout";
  import MainLayout from "./layouts/MainLayout";
  export default  {


    computed: {
        layout() {
            return (this.$route.meta.layout || 'main') + '-layout';
        }
    },

    components: {
      EmptyLayout, MainLayout
    }
  }
</script>

<style lang="scss">
  @import "~materialize-css/dist/css/materialize.min.css";
  @import "assets/css/index.css";
</style>
