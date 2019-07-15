<template>
  <router-link to="/home">
    <img
      class="logo"
      alt="Logo"
      src="@/assets/img/logo.png"
    >
  </router-link>
</template>

<script>
export default {
  name: 'Logo'
};
</script>

<style lang="stylus">
.logo {
  height: 45px;
  width: 116px;
  @media (min-width: 992px) {
    height: 60px;
    width: 155px;
  }
}
</style>
