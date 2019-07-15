<template>
  <div
    id="app"
    class="relative"
  >
    <Header />
    <main id="page-wrap">
      <router-view :key="$route.fullPath" />
    </main>
    <Footer />
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
  }
};
</script>

<style lang="stylus">

</style>
