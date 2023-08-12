<template>
  <div class="mb-1">
    <section class="flex flex-column">
    <div>
      <label for="date">Date<span v-if="required" class="text-red-500"> *</span></label>
    </div>
      <Calendar
        class="text-white"
        v-model="values"
        :showIcon="isShowIcon"
        dateFormat="yy-mm-dd"
        :selectionMode="isMultipleDate ? 'multiple' : isRangeDate ? 'range' : 'single'"
        id="date"
        @update:modelValue="updateModelValue"
      />
      <small v-if="message_error !== ''" class="flex text-red-500">
        {{ message_error }}
        <i :class="message_error ? 'pi pi-info-circle' : ''" style="margin: 2px" />
      </small>
    </section>
  </div>
</template>

<script>
import Calendar from "primevue/calendar";
export default {
  name: "CustomCalendar",
  components: {
    Calendar,
  },
  data() {
    return {
      values: "",
    };
  },
  props: {
    msg: String,
    required: Boolean,
    isShowIcon: Boolean,
    isMultipleDate: Boolean,
    isRangeDate: Boolean,
    modelValue: [String, Date],
    message_error: String,
  },
  emits: ["update:modelValue"],
  watch: {
    values: {
      immediate: true,
      handler(data) {
        this.$emit("update:modelValue", data);
      },
    },
    message_error: {
      immediate: true,
      handler(data) {
        if (data) {
          this.p_invalid = "p-invalid";
        }
      },
    },
  },
  created() {
    this.updateModelValue(this.modelValue)
  },
  methods: {
    updateModelValue(value) {
      this.values = value;
      this.$emit("update:modelValue", this.values);
      // console.log("value text input", value);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >

</style>
