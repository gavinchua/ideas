<template>
  <div class="ideasget">
    <div class="flex justify-end -mx-4">
      <a
        class="inline-block mx-2"
        href="#"
        @click.prevent="sortByTitle"
      >
        Sort by Name
      </a>
      <a
        class="inline-block mx-2"
        href="#"
        @click.prevent="sortByDate"
      >
        Sort by Date
      </a>
    </div>
    <div class="flex flex-wrap -mx-4">
      <div
        v-for="i in getAppData"
        :key="i.id"
        class="my-4 px-4 w-full overflow-hidden sm:w-1/2 md:w-1/3 lg:w-1/4"
      >
        <div class="bg-gray-400 p-4 item">
          <h5 class="mb-1">
            {{ i.title }}
          </h5>
          <p class="text-xs mb-3">
            {{ i.created_date }}
          </p>
          <p class="text-sm">
            {{ i.body }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'IdeasGet',
  created() {
    this.$store.dispatch('appData/fetchAppData');
  },
  computed: {
    ...mapGetters('appData', [
      'getAppData'
    ])
  },
  methods: {
    sortByTitle: function() {
      this.getAppData.sort((a, b) => a.title.localeCompare(b.title));
    },
    sortByDate: function() {
      this.getAppData.sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
    }
  }
};
</script>

<style scoped lang="stylus">
.item
  height 200px
</style>
