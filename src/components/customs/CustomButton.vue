<template>
  <div class="p-fluid">
    <div class="my-1 text-white">
      <Button
        @click="($event) => $emit('onClick', $event)"
        :badge="badge"
        :type="type ? type : 'button'"
        v-show="hide ? false : true"
        :raised="raised"
        :label="label"
        :rounded="rounded"
        :link="is_link"
        :iconPos="right_icon ? 'right' : ''"
        :disabled="disabled"
        :text="text"
        :outlined="outlined"
        :size="normal ? 'normal' : large ? 'large' : 'small'"
        :severity="
          secondary
            ? 'secondary'
            : success
            ? 'success'
            : info
            ? 'info'
            : warning
            ? 'warning'
            : help
            ? 'help'
            : danger
            ? 'danger'
            : ''
        "
        :icon="
          check_icon
            ? 'pi pi-check'
            : user_icon
            ? 'pi pi-user'
            : search_icon
            ? 'pi pi-search'
            : spinner_icon
            ? 'pi pi-spin pi-spinner'
            : email_icon
            ? 'pi pi-envelope'
            : delete_icon
            ? 'pi pi-trash'
            : cancel_icon
            ? 'pi pi-times'
            : plus_icon
            ? 'pi pi-plus'
            : image_icon
            ? 'pi pi-images'
            : cloud_icon
            ? 'pi pi-cloud-upload'
            : ''
        "
      />
    </div>
  </div>
</template>

<script>
import Button from "primevue/button";

export default {
  name: "CustomButton",
  components: {
    Button,
  },
  data() {
    return {};
  },
  props: {
    badge: String,
    msg: String,
    normal: Boolean,
    large: Boolean,
    hide: Boolean,
    label: String,
    check_icon: Boolean,
    user_icon: Boolean,
    search_icon: Boolean,
    spinner_icon: Boolean,
    right_icon: Boolean,
    email_icon: Boolean,
    delete_icon: Boolean,
    cancel_icon: Boolean,
    plus_icon: Boolean,
    image_icon: Boolean,
    cloud_icon: Boolean,
    is_link: Boolean,
    disabled: Boolean,
    secondary: Boolean,
    success: Boolean,
    info: Boolean,
    warning: Boolean,
    help: Boolean,
    danger: Boolean,
    raised: Boolean,
    rounded: Boolean,
    text: Boolean,
    outlined: Boolean,
    type: String,
  },
  emits: ["onClick"],
  watch: {},
  created() {},
  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
