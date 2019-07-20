<template>
  <div class="ideasupdate">
    <h1 class="text-3xl font-bold mb-8">
      Update an idea
    </h1>
    <IdeasUpdateItem />
  </div>
</template>

<script>
import IdeasUpdateItem from '@/components/ideasupdate/IdeasUpdateItem';

export default {
  name: 'IdeasUpdate',
  components: {
    IdeasUpdateItem
  }
};
</script>

<style scoped lang="stylus">

</style>
