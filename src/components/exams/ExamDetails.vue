<template>
  <div class="">
      <custom-qa :examSections="examSections" v-show="false" />
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      schoolId: this.$route.params.schoolId,
      examSections: {},
    };
  },
  props: {},
  emits: ["update:modelValue"],
  watch: {
    // values: {
    //   immediate: true,
    //   handler(data) {
    //     this.$emit("update:modelValue", data);
    //   },
    // },
    // message_error: {
    //   immediate: true,
    //   handler(data) {
    //     if (data) {
    //       this.p_invalid = "p-invalid";
    //     }
    //   },
    // },
  },
  created() {
    // this.values = this.modelValue;
  },
  methods: {
    async getExam(id) {
      let exams = await this.$api.exam.getExam(this.schoolId, id);
      if (exams && exams.data[0]) {
        this.examSections = exams.data[0];
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
