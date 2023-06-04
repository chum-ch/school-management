<template>
  <div class="p-fluid">
    <h1>{{ msg }}</h1>
    <div class="my-1">
      <Button
        @click="($event) => $emit('onClick', $event)"
        :badge="badge"
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
  },
  emits: ["onClick"],
  watch: {},
  created() {},
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
