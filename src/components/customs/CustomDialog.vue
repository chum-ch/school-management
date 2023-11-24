<template>
  <div class="hello">
    <Dialog
      :header="modal_header ? modal_header : 'Modal'"
      v-model:visible="displayModal"
      :position_dialog="position"
      :style="{ width: dialog_width ? dialog_width : '45vw' }"
      :modal="true"
      :breakpoints="{ '960px': '75vw', '641px': '100vw' }"
    >
    
      <div class="card m-1 p-3 ">
        <div class="text-center text-danger" v-if="is_delete">
          <span class="p-ml-2 me-1">Delete</span>
          <i class="pi pi-exclamation-triangle text-center"></i>
        </div>
        <slot name="bodyDialog"> </slot>
      </div>

      <template #footer v-if="hide_footer ? !hide_footer : true">
        <div class="flex justify-content-end flex-wrap">
          <custom-button
            @onClick="$emit('onClickCloseDialog')"
            :label="'Cancel'"
            class="me-3"
            :outlined="true"
          />
          <custom-button
            :label="footer_label ? footer_label : 'Submit'"
            :disabled="disabledSubmitBtn"
            :danger="danger"
            @onClick="($event) => $emit('onClickDialogSubmit', $event)"
          />
        </div>
      </template>
    </Dialog>
  </div>
</template>

<script>
import Dialog from "primevue/dialog";
export default {
  components: {
    Dialog,
  },
  data() {
    return {
      displayModal: false,
      position: "top",
    };
  },
  props: {
    msg: String,
    disabledSubmitBtn: Boolean,
    showDialog: Boolean,
    modal_header: String,
    dialog_width: String,
    position_dialog: String,
    hide_footer: Boolean,
    footer_label: String,
    danger: Boolean,
    is_delete:Boolean,
    title_delete: String
  },
  emits: ["onClickDialogSubmit", "onClickCloseDialog"],
  watch: {},
  updated() {
    // this.displayModal = this.showDialog
    // console.log('show dia', this.displayModal);
  },
  created() {},
  methods: {
    openDialog() {
      this.displayModal = true;
    },
    closeDialog() {
      this.displayModal = false;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
* {
  padding: 0;
  margin: 0;
}
.p-dialog .p-dialog-header-icon{
    display: none;
    align-items: center;
}
</style>
