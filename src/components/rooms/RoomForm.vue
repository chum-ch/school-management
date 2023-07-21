<template>
  <div class="hello">
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
          v-model="roomForm.Name"
          :required="true"
          :message_error="message.Name"
          class="py-0"
        />
        <custom-input-text
          :placeholder="'.......'"
          :label="'Floor'"
          v-model="roomForm.Floor"
          class="py-0"
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
  updated() {
    // if (this.modelValueUpdateRoom && Object.keys(this.modelValueUpdateRoom).length > 0) {
    //   this.roomForm.Name = this.modelValueUpdateRoom.Name;
    //   this.roomForm.Floor = this.modelValueUpdateRoom.Floor;
    //   // Get roomID
    //   this.roomID = this.modelValueUpdateRoom.ROOMS_ID;
    //   if(this.roomID) {
    //     this.footer_label = "Edit";
    //   }
    // } else {
    //   this.roomForm = {};
    //   this.message = {};
    // }
    // console.log('vfdfd', this.modelValueUpdateRoom);
  },
  created() {
  },
  methods: {
    openDialogRoomForm() {
      this.$refs.dialogRoomForm.openDialog();
    },
    closeDialogRoomForm() {
      this.footer_label = "";
      this.$refs.dialogRoomForm.closeDialog();
      this.setDefaultValue();
    },
    onlyUpdateRoom (data ={}) {
      if (data && Object.keys(data).length > 0) {
      this.roomForm.Name = data.Name;
      this.roomForm.Floor = data.Floor;
      // Get roomID
      this.roomID = data.ROOMS_ID;
      if(this.roomID) {
        this.footer_label = "Edit";
      }
    } 
    },
    async createRoomInfo() {
      try {
        if (this.roomForm.Name) {
          let room = {};
          if (this.roomID) {
            room = await this.$api.room.updateRoom(
              this.schoolId,
              this.roomForm,
              this.roomID
            );
          } else {
            room = await this.$api.room.createRoom(this.schoolId, this.roomForm);
          }
          this.$emit("updatedRoom", room.data);
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
    setDefaultValue() {
      this.roomForm = {};
      this.message = {};
      this.roomID = "";
      this.footer_label = "";
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
