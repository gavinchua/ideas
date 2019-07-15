<template>
  <header class="flex items-center justify-between flex-wrap">
    <Logo />
    <Menu />
  </header>
</template>

<script>
import Logo from '@/components/shared/Logo';
import Menu from '@/components/shared/Menu';

export default {
  name: 'Header',
  components: {
    Logo,
    Menu
  }
};
</script>

<style lang="stylus">

</style>
