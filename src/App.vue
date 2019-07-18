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
</style>
