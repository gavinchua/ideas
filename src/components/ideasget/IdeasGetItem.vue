<template>
  <div class="ideasgetitem my-4 px-4 w-full overflow-hidden sm:w-1/2 md:w-1/3 lg:w-1/4">
    <div class="bg-gray-400 hover:bg-gray-500 hover:text-white px-4 py-6 relative item">
      <h5 class="mb-1">
        {{ item.title }}
      </h5>
      <p class="text-xs mb-3">
        {{ item.created_date | formatDate }}
      </p>
      <p class="text-sm">
        {{ item.body }}
      </p>
      <a
        href="#"
        class="absolute hidden btn-edit"
        @click.prevent="editItem(item.id)"
      >
        <font-awesome-icon icon="edit" />
      </a>
      <a
        href="#"
        class="absolute hidden btn-delete"
        @click.prevent="deleteItem(item.id)"
      >
        <font-awesome-icon icon="trash-alt" />
      </a>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'IdeasGetItem',
  filters: {
    formatDate(date) {
      const thisDate = new Date(date);
      const thisDateOptions = { day: 'numeric', month: 'long', year: 'numeric' };
      return thisDate.toLocaleDateString('en-GB', thisDateOptions);
    }
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
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
    }
  }
};
</script>

<style scoped lang="stylus">
/* purgecss start ignore */
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
/* purgecss end ignore */
</style>
