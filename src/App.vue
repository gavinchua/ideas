<template>
  <div
    id="app"
    class="relative"
  >
    <div class="container my-10 m-auto px-3">
      <Header />
      <main
        id="page-wrap"
        class="m-10"
      >
        <router-view :key="$route.fullPath" />
      </main>
      <Footer />
    </div>
  </div>
</template>

<script>
import Header from '@/views/shared/Header';
import Footer from '@/views/shared/Footer';

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  created() {
    this.$store.dispatch('appData/fetchAppData');
  }
};
</script>

<style lang="stylus">
main
  min-height 55vh

//.focus\:shadow-outline:focus {
input:focus
textarea:focus
  box-shadow 0 0 0 3px rgba(204,204,204, 0.5)!important

input[readonly]:focus
  box-shadow 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)!important
</style>
