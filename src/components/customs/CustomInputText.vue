<template>
  <div class="p-fluid">
    <div :class="hideLabel ? 'd-none' : ''">
      <label v-if="label !== ''">{{ label }} </label>
      <span v-if="required" class="text-red-500"> *</span>
    </div>
    <div v-if="show_icon">
      <span :class="right_icon ? 'p-input-icon-right' : 'p-input-icon-left'">
        <i
          :class="
            user_icon
              ? 'pi pi-user'
              : search_icon
              ? 'pi pi-search'
              : spinner_icon
              ? 'pi pi-spin pi-spinner'
              : email_icon
              ? 'pi pi-envelope'
              : 'pi pi-user'
          "
        />
        <InputText
          :class="[required && message_error !== '' ? p_invalid : '']"
          :style="style"
          :placeholder="placeholder"
          v-model="values"
          @update:modelValue="updateModelValue"
        />
      </span>
    </div>
    <div class="" v-else>
      <InputText
        :style="style"
        :class="[required && message_error !== '' ? p_invalid : '']"
        :placeholder="placeholder"
        :disabled="is_disabled"
        v-model="values"
        @update:modelValue="updateModelValue"
      />
    </div>
    <small
      v-if="message_error !== ''"
      class="flex text-red-500"
      :class="hideLabel ? 'd-none' : ''"
    >
      {{ message_error }}
      <i :class="message_error ? 'pi pi-info-circle' : ''" style="margin: 3px" />
    </small>
  </div>
</template>
<script>
import InputText from "primevue/inputtext";
export default {
  name: "styleCustomInputText",
  components: {
    InputText,
  },
  data() {
    return {
      values: "",
      p_invalid: "",
    };
  },
  updated() {
    if (this.modelValue) {
      this.values = this.modelValue;
    } else {
      this.values = "";
    }
  },
  created() {
    this.updateModelValue(this.modelValue);
  },
  props: {
    msg: String,
    placeholder: String,
    required: Boolean,
    label: String,
    message_error: String,
    user_icon: Boolean,
    search_icon: Boolean,
    spinner_icon: Boolean,
    email_icon: Boolean,
    show_icon: Boolean,
    right_icon: Boolean,
    is_disabled: Boolean,
    border: String,
    style: Object,
    styleCustomInput: Boolean,
    hideLabel: Boolean,
    // value: String,
    modelValue: [String, Number, Object],
  },
  emits: ["update:modelValue"],
  watch: {
    // values: {
    //   immediate: true,
    //   handler(data) {
    //     this.values = data
    //     console.log('da', data);
    //   },
    // },
    message_error: {
      immediate: true,
      handler(data) {
        if (data) {
          this.p_invalid = "p-invalid";
        }
      },
    },
  },
  methods: {
    // setDefaultValue(){
    //   this.values = ""
    // },
    updateModelValue(value) {
      this.values = value;
      this.$emit("update:modelValue", this.values);
      // console.log("value text input", value);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.custom-input {
  border: none;
  outline: none;
  padding: 0 0 0 5px;
  background: transparent;
}
</style>
