<template>
  <div class="ideasget relative">
    <h1 class="text-3xl font-bold mb-8">
      Ideas Board
    </h1>
    <template v-if="isLoading">
      <vue-loaders-ball-beat
        class="w-full text-center"
        color="red"
        scale="1"
      />
    </template>
    <template v-else>
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
      <paginate
        ref="paginator"
        name="getAppData"
        tag="div"
        :list="getAppData"
        :per="itemPerPage"
      >
        <div class="flex flex-wrap -mx-4">
          <IdeasGetItem
            v-for="item in paginated('getAppData')"
            :key="item.id"
            :item="item"
          />
        </div>
      </paginate>
      <paginate-links
        class="relative text-center mt-4 md:absolute md:bottom-0"
        for="getAppData"
        :async="true"
        :limit="2"
        :show-step-links="true"
        :classes="{ 'li': 'inline' }"
        :hide-single-page="true"
      />
      <div class="paginate-details p-3 md:flex md:align-items-center">
        <div class="text-center md:text-left md:w-1/2">
          <span v-if="$refs.paginator">
            {{ $refs.paginator.pageItemsCount }} shown
          </span>
        </div>
        <div class="text-center md:text-right mt-3 md:mt-0 md:w-1/2">
          <a
            href="#"
            @click.prevent="toggleAllEvents"
          >
            {{ toggleAllEventsText }}
          </a>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import Vue from 'vue';
import VuePaginate from 'vue-paginate';
import { mapGetters } from 'vuex';

import IdeasGetItem from '@/components/ideasget/IdeasGetItem';

Vue.use(VuePaginate);

export default {
  name: 'IdeasGet',
  components: {
    IdeasGetItem
  },
  data() {
    return {
      isLoading: true,
      itemPerPage: 12,
      toggleAllEventsText: 'Show all',
      paginate: ['getAppData']
    };
  },
  computed: {
    ...mapGetters('appData', [
      'getAppData'
    ])
  },
  mounted() {
    if (this.getAppData) {
      this.isLoading = false;
    }
  },
  methods: {
    sortByTitle() {
      this.getAppData.sort((a, b) => a.title.localeCompare(b.title));
    },
    sortByDate() {
      console.log('sortByDate');
      this.getAppData.sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
    },
    toggleAllEvents() {
      if (this.$refs.paginator && this.itemPerPage === 12) {
        this.itemPerPage = 10000000;
        this.toggleAllEventsText = 'Show pagination';
      } else {
        this.itemPerPage = 12;
        this.toggleAllEventsText = 'Show all';
      }
    }
  }
};
</script>

<style scoped lang="stylus">
/* purgecss start ignore */
.paginate-links >>>
  transform translate(-50%,-50%)
  left 50%
  li
    cursor pointer
    padding 0 5px
    &.active
      font-weight bold
/* purgecss end ignore */
</style>
