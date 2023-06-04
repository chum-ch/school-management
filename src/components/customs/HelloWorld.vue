<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <div>
      <button-primevue label="Check" />
    </div>
  </div>
</template>

<script>
export default {
  components: {
  },
  data() {
    return {
      values: "",
    };
  },
  props: {
    msg: String,
    placeholder: String,
    is_required: Boolean,
    label: String,
    message_error: String,
    user_icon: Boolean,
    search_icon: Boolean,
    spinner_icon: Boolean,
    has_icon: Boolean,
    right_icon: Boolean,
    // sm_size: Boolean,
    // lg_size: Boolean,
    is_disabled: Boolean,
    border: String,
    value: String,
    modelValue: String,
  },
  emits: ["update:modelValue"],
  watch: {
    values: {
      immediate: true,
      handler(data) {
        this.$emit("update:modelValue", data);
      },
    },
  },
  created() {
    this.values = this.modelValue;
  },
  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
