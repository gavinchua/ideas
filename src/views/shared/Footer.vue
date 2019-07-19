<template>
  <footer class="md:flex">
    <div class="text-center md:w-1/2 md:text-left">
      &copy;
      <span
        v-text="getThisYear"
      />
      @gavin_chua
    </div>
    <div class="text-center md:w-1/2 md:text-right">
      <a
        href="https://github.com/gavinchua/ideas"
        target="_blank"
      >Github</a>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  computed: {
    getThisYear: () => new Date().getFullYear()
  }
};
</script>

<style lang="stylus">

</style>
