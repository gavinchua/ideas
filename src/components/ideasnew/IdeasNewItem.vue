<template>
  <div class="ideasnewitem">
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
          ref="title"
          v-model="idea.title"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Title"
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
        <textarea
          id="body"
          v-model="idea.body"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          Body
        </textarea>
        <span class="text-red-500 text-xs italic">
          {{ charactersCheck }}
        </span>
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
          <template v-if="submitted && !$v.idea.body.maxLength">
            Length cannot be more than 140 characters.
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
        <a
          href="#"
          class="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded ml-3"
          @click.prevent="cancel"
        >
          Cancel
        </a>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import { required, minLength, maxLength } from 'vuelidate/lib/validators';

export default {
  name: 'IdeasNewItem',
  filters: {
    json: function(value) {
      return JSON.stringify(value, null, '\t');
    }
  },
  data() {
    return {
      idea: {
        id: '',
        title: '',
        body: '',
        created_date: ''
      },
      submitted: false,
      myToast: null
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
        minLength: minLength(5),
        maxLength: maxLength(140)
      }
    }
  },
  computed: {
    charactersCheck() {
      const bodyLength = this.idea.body.length;
      const bodyLengthLimit = 140;
      const bodyLengthCheck = bodyLengthLimit - bodyLength;
      console.log(bodyLengthCheck);
      if (bodyLengthCheck <= 15) {
        if (bodyLengthCheck > 0) {
          return `Max characters is ${bodyLengthLimit}. You have ${bodyLengthCheck} characters remaining`;
        }
      }
      return null;
    }
  },
  mounted() {
    this.focusInput();
  },
  methods: {
    focusInput() {
      this.$refs.title.focus();
    },
    generateID() {
      return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
      );
    },
    cancel() {
      if (this.myToast) {
        this.myToast.goAway(0);
      }
      this.$router.push('/');
    },
    submit() {
      // question is how to get the id for the new data?
      // auto from api/backend?
      this.idea.id = this.generateID();
      console.log('New ID', this.idea.id);

      this.idea.created_date = new Date().toISOString().slice(0, 19).replace('T', ' ');
      console.log('New Date', this.idea.created_date);

      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      console.log('ADDED SUCCESS!! :-)\n\n' + JSON.stringify(this.idea));
      this.sendFormData();
    },
    sendFormData() {
      // dispatch should be performed after axios.post
      this.$store.dispatch('appData/commitAddAppData', this.idea);
      axios.post(`http://www.amock.io/api/gavinchua/idea/new/${this.idea}`)
        .then(function(response) {
          console.log(response);
          // should be here
          // this.$store.dispatch('appData/commitAddAppData', this.idea);
          // this.showToasted();
        })
        .catch(function(error) {
          console.log(error);
        });
      // router push should be performed after axios.post
      this.showToasted();
    },
    showToasted() {
      this.idea = {
        id: '',
        title: '',
        body: '',
        created_date: ''
      };
      this.submitted = false;
      this.myToast = this.$toasted.show('Idea had been added successfully!', {
        position: 'bottom-center',
        singleton: true,
        fitToScreen: true,
        action: [
          {
            text: 'X',
            onClick: (e, toastObject) => {
              toastObject.goAway(0);
              this.$router.push('/');
            }
          }
        ]
      });
    }
  }
};
</script>

<style scoped lang="stylus">

</style>
