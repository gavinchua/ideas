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
          <div
            v-for="i in paginated('getAppData')"
            :key="i.id"
            class="my-4 px-4 w-full overflow-hidden sm:w-1/2 md:w-1/3 lg:w-1/4"
          >
            <div class="bg-gray-400 hover:bg-gray-500 hover:text-white px-4 py-6 relative item">
              <h5 class="mb-1">
                {{ i.title }}
              </h5>
              <p class="text-xs mb-3">
                {{ i.created_date | formatDate }}
              </p>
              <p class="text-sm">
                {{ i.body }}
              </p>
              <a
                href="#"
                class="absolute hidden btn-edit"
                @click.prevent="editItem(i.id)"
              >
                <font-awesome-icon icon="edit" />
              </a>
              <a
                href="#"
                class="absolute hidden btn-delete"
                @click.prevent="deleteItem(i.id)"
              >
                <font-awesome-icon icon="trash-alt" />
              </a>
            </div>
          </div>
        </div>
      </paginate>
      <paginate-links
        class="relative text-center"
        for="getAppData"
        :async="true"
        :limit="2"
        :show-step-links="true"
        :classes="{ 'li': 'inline' }"
        :hide-single-page="true"
      />
      <div class="paginate-details md:flex md:align-items-center p-3">
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
import axios from 'axios';
import VuePaginate from 'vue-paginate';
import { mapGetters } from 'vuex';

Vue.use(VuePaginate);

export default {
  name: 'IdeasGet',
  filters: {
    formatDate(date) {
      const thisDate = new Date(date);
      const thisDateOptions = { day: 'numeric', month: 'long', year: 'numeric' };
      return thisDate.toLocaleDateString('en-GB', thisDateOptions);
    }
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
    editItem(id) {
      console.log(id);
      this.$router.push({ path: `/update/${id}` });
    },
    deleteItem(id) {
      console.log(id);
      // dispatch should be performed after axios.delete
      this.$store.dispatch('appData/commitRemoveAppData', id);
      axios.delete(`http://www.amock.io/api/gavinchua/idea/delete/${id}`)
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
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
.item
  height 200px
  @media (min-width: 768px) {
    height 250px
  }
  @media (min-width: 1280px) {
    height 200px
  }
  &:hover a
    display block
  a
    top 5px
    right 10px
    &.btn-edit
      right 35px

/deep/.paginate-links
  transform translate(-50%,-50%)
  position relative
  left 50%
  bottom -15px
  li
    cursor pointer
    padding 0 5px
    &.active
      font-weight bold
</style>
