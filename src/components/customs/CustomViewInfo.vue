<template>
  <div class="hello">
    <h1>{{ msg }} </h1>
    <div
      class="viewInfo grid row"
      v-for="(item, index) in items_view_info"
      :key="index"
    >
      <div class="flex justify-content-between mb-2">
        <p>{{ item.label }}</p>
        <h6 class="fw-bold">{{ item.value }}</h6>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  props: {
    msg: String,
    items_view_info: Array,
  },
  emits: [""],
  watch: {
    // values: {
    //   immediate: true,
    //   handler(data) {
    //     this.$emit("update:modelValue", data);
    //   },
    // },
  },
  created() {},
  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  margin: 0;
  padding: 0;
}
</style>
