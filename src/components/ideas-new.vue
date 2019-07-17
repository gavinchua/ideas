<template>
  <div class="ideasnew">
    <form
      id="formCreate"
      action=""
      @submit.prevent="submit"
    >
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="title"
        >
          Title
        </label>
        <input
          id="title"
          v-model="idea.title"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="title"
        >
        <div
          v-if="submitted && $v.idea.title.$error"
          class="text-red-500 text-xs italic"
        >
          <template v-if="submitted && !$v.idea.title.required">
            Required.
          </template>
          <template v-if="submitted && !$v.idea.title.minLength">
            Length must be at least 2 characters.
          </template>
        </div>
      </div>
      <div class="mb-6">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="body"
        >
          Body
        </label>
        <input
          id="body"
          v-model.trim="$v.idea.body.$model"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="body"
        >
        <div
          v-if="submitted && $v.idea.body.$error"
          class="text-red-500 text-xs italic"
        >
          <template v-if="submitted && !$v.idea.body.required">
            Required.
          </template>
          <template v-if="submitted && !$v.idea.body.minLength">
            Length must be at least 5 characters.
          </template>
        </div>
      </div>
      <div class="mb-6">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators';

export default {
  name: 'IdeasNew',
  filters: {
    json: function(value) {
      return JSON.stringify(value, null, '\t');
    }
  },
  data() {
    return {
      idea: {
        title: '',
        body: '',
        created_date: new Date()
      },
      submitted: false
    };
  },
  validations: {
    idea: {
      title: {
        required,
        minLength: minLength(2)
      },
      body: {
        required,
        minLength: minLength(5)
      }
    }
  },
  methods: {
    submit() {
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      } else {
        alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.idea));
        this.sendFormData();
      }
    },
    sendFormData() {
      console.log(this.idea);
      axios.post(`http://www.amock.io/api/gavinchua/idea/new/${this.idea}`)
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

</style>
