<template>
  <footer>
    &copy;
    <span
      v-text="getThisYear"
    />
    @gavin_chua
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
