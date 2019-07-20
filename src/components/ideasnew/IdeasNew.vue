<template>
  <div class="ideasnew">
    <h1 class="text-3xl font-bold mb-8">
      Create a new idea
    </h1>
    <IdeasNewItem />
  </div>
</template>

<script>
import IdeasNewItem from '@/components/ideasnew/IdeasNewItem';

export default {
  name: 'IdeasNew',
  components: {
    IdeasNewItem
  }
};
</script>

<style scoped lang="stylus">

</style>
