<template>
  <div>
    <CustomSpinner
    :isLoading="isLoading"
    />
    <div class="router-view">
      <router-view />
    </div>
    <footer>
   
    </footer>
  </div>
</template>

<script>
import axios from "axios";
import CustomSpinner from "./components/customs/CustomSpinner.vue";
export default {
  setup() {
   },

  data() {
    return {
      isLoading: false
    };
  },
  emits: [],
  components: {
    CustomSpinner
  },
  created() {
    // Add an Axios interceptor to show/hide the spinner
    try {
      axios.interceptors.request.use((config) => {
        this.isLoading = true
        return config;
      });
      
      axios.interceptors.response.use(
        (response) => {
          this.isLoading = false
          return response;
        },
        (error) => {
          console.log('error');
          this.isLoading = false
          return Promise.reject(error);
        }
      );
      
    } catch (error) {
      console.log('error', error);
      this.isLoading = false
    }
  },
  methods: {
   
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
