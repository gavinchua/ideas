<template>
  <div class="ideasget">
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
      <div class="flex flex-wrap -mx-4">
        <div
          v-for="i in getAppData"
          :key="i.id"
          class="my-4 px-4 w-full overflow-hidden sm:w-1/2 md:w-1/3 lg:w-1/4"
        >
          <div class="bg-gray-400 hover:bg-gray-500 hover:text-white px-4 py-6 relative item">
            <h5 class="mb-1">
              {{ i.title }}
            </h5>
            <p class="text-xs mb-3">
              {{ i.created_date }}
            </p>
            <p class="text-sm">
              {{ i.body }}
            </p>
            <a
              href="#"
              class="absolute hidden"
              @click.prevent="deleteItem(i.id)"
            >
              <font-awesome-icon icon="trash-alt" />
            </a>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';

export default {
  name: 'IdeasGet',
  data() {
    return {
      isLoading: true
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
</style>
