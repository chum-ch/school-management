<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <!-- Dialog room form  -->
    <custom-dialog
      ref="dialogRoomForm"
      :modal_header="'Room Form'"
      @onClickDialogSubmit="createRoomInfo"
      @onClickCloseDialog="closeDialogRoomForm"
      :footer_label="footer_label"
    >
      <template #bodyDialog>
        <custom-input-text
          :placeholder="'.......'"
          :label="'Room name'"
          :required="true"
          v-model="roomForm.Name"
          :message_error="message.Name"
          class=""
        />
        <custom-input-text
          :placeholder="'.......'"
          :label="'Floor'"
          v-model="roomForm.Floor"
          class=""
        />
      </template>
    </custom-dialog>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      schoolId: this.$route.params.schoolId,
      // Form room
      roomID: "",
      roomForm: {
        Name: "",
        Floor: "",
      },
      // Error message
      message: {
        Name: "",
        Floor: "",
      },
      // Dialog
      footer_label: "",
    };
  },
  props: {
    msg: String,
  },
  emits: ["updatedRoom"],
  watch: {},
  created() {},
  methods: {
    openDialogRoomForm() {
      this.$refs.dialogRoomForm.openDialog();
    },
    closeDialogRoomForm() {
      this.clearRoomInfoForm()
      this.footer_label = "";
      this.$refs.dialogRoomForm.closeDialog();
      this.$emit("updatedRoom", { CloseDialog: true });
    },
    // Call room form info from parent
    roomInfoForm(data = "") {
      try {
        if (!data) {
          this.clearRoomInfoForm();
        } else {
          this.footer_label = "Edit";
          this.roomForm.Name = data.Name;
          this.roomForm.Floor = data.Floor;
          // Get roomID
          this.roomID = data.ROOMS_ID;
        }
        this.openDialogRoomForm();
      } catch (error) {
        console.log("Error room info form", error);
      }
    },
    async createRoomInfo() {
      try {
        if (this.roomForm.Name) {
          if (!this.footer_label) {
            await this.$api.room.createRoom(this.schoolId, this.roomForm);
          } else {
            console.log(this.roomForm);
            await this.$api.room.updateRoom(this.schoolId, this.roomForm, this.roomID);
          }
          this.$emit("updatedRoom");
          this.closeDialogRoomForm();
        } else {
          if (!this.roomForm.Name) {
            this.message.Name = "Room's name is required.";
          } else {
            this.message.Name = "";
          }
        }
      } catch (error) {
        console.log("Error create room info", error);
      }
    },
    clearRoomInfoForm() {
      this.roomForm = {};
      this.message = {};
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
