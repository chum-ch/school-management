<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <!-- Dialog trainer form  -->
    <custom-dialog
      ref="dialogTrainerForm"
      :modal_header="'Trainer Form'"
      @onClickDialogSubmit="createTrainerInfo"
      @onClickCloseDialog="closeDialogTrainerForm"
      :footer_label="footer_label"
    >
      <template #bodyDialog>
        <div class="flex flex-wrap">
          <custom-input-text
            :placeholder="'......'"
            :label="'Last name'"
            :required="true"
            v-model="trainerForm.LastName"
            :message_error="message.LastName"
            class="col-6"
          />
          <custom-input-text
            :placeholder="'......'"
            :label="'First name'"
            :required="true"
            v-model="trainerForm.FirstName"
            :message_error="message.FirstName"
            class="col-6"
          />
          <custom-input-text
            :placeholder="'......'"
            :label="'Gender'"
            :required="true"
            v-model="trainerForm.Gender"
            :message_error="message.Gender"
            class="col-6"
          />
          <custom-input-text
            :placeholder="'......'"
            :label="'Province'"
            v-model="trainerForm.Province"
            :message_error="message.Province"
            class="col-6"
          />
          <custom-input-text
            :placeholder="'......'"
            :label="'Phone'"
            v-model="trainerForm.Phone"
            :message_error="message.Phone"
            class="col-12"
          />
          <custom-input-text
            :placeholder="'......'"
            :label="'Email'"
            v-model="trainerForm.Email"
            class="col-12"
          />
        </div>
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
      trainerID: "",
      // Form trainer
      trainerForm: {
        FirstName: "",
        LastName: "",
        Gender: "",
        Email: "",
        Province: "",
        Phone: ""
      },
      // Error message
      message: {
        FirstName: "",
        LastName: "",
        Gender: "",
      },
      // Dialog
      footer_label: "",
    };
  },
  props: {
    msg: String,
  },
  emits: ["updatedTrainer"],
  watch: {},
  created() {},
  methods: {
    openDialogTrainerForm() {
      this.$refs.dialogTrainerForm.openDialog();
    },
    closeDialogTrainerForm() {
      this.clearTrainerInfoForm()
      this.footer_label = "";
      this.$refs.dialogTrainerForm.closeDialog();
      this.$emit("updatedTrainer", { CloseDialog: true });
    },
    // Call trainer form info from parent
    trainerInfoForm(data = "") {
      try {
        if (!data) {
          this.clearTrainerInfoForm();
        } else {
          this.footer_label = "Eidt";
          this.trainerForm.FirstName = data.FirstName;
          this.trainerForm.LastName = data.LastName;
          this.trainerForm.Email = data.Email;
          this.trainerForm.Gender = data.Gender;
          this.trainerForm.Province = data.Province;
          this.trainerForm.Phone = data.Phone;
          // Get trainer ID
          this.trainerID = data.TRAINERS_ID
          
        }
        this.openDialogTrainerForm();
        
      } catch (error) {
        console.log("Error trainer info form", error);
      }
    },
    async createTrainerInfo() {
      try {
        if (
          this.trainerForm.FirstName &&
          this.trainerForm.LastName &&
          this.trainerForm.Gender
        ) {
          if (!this.footer_label) {
            await this.$api.trainer.createTrainer(this.schoolId, this.trainerForm);
          } else {
            await this.$api.trainer.updateTrainer(this.schoolId, this.trainerForm, this.trainerID);
          }
          this.$emit("updatedTrainer");
          this.closeDialogTrainerForm();
        } else {
          if (!this.trainerForm.FirstName) {
            this.message.FirstName = "First name is required";
          } else {
            this.message.FirstName = "";
          }
          if (!this.trainerForm.LastName) {
            this.message.LastName = "Last name is required";
          } else {
            this.message.LastName = "";
          }
          if (!this.trainerForm.Gender) {
            this.message.Gender = "Gender is required";
          } else {
            this.message.Gender = "";
          }
        }
        
      } catch (error) {
        console.log("Error create trainer info", error);
      }
    },
    clearTrainerInfoForm() {
      this.trainerForm = {};
      this.message = {};
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
