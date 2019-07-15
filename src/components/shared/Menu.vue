<template>
  <nav class="flex content-center">
    <router-link
      class="p-2 hover:underline font-semibold"
      to="/new"
    >
      New
    </router-link>
    <router-link
      class="p-2 hover:underline font-semibold"
      to="/update"
    >
      Update
    </router-link>
    <router-link
      class="p-2 hover:underline font-semibold"
      to="/delete"
    >
      Delete
    </router-link>
  </nav>
</template>

<script>
export default {
  name: 'Menu'
};
</script>

<style lang="stylus">

</style>
