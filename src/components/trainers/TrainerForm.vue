<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <!-- Dialog student form  -->
    <custom-dialog
      ref="dialogTrainerForm"
      :modal_header="'ទម្រង់ពត៌មាន សិស្សានុសិស្ស'"
      @onClickDialogSubmit="createTrainerInfo"
      @onClickCloseDialog="closeDialogTrainerForm"
      :footer_label="footer_label"
    >
      <template #bodyDialog>
        <div class="flex flex-wrap">
          <custom-input-text
            :placeholder="'នាមត្រកូល'"
            :label="'ទាមទារបញ្ចូល នាមត្រកូល'"
            :required="true"
            v-model="trainerForm.LastName"
            :message_error="message.LastName"
            class="col-6"
          />
          <custom-input-text
            :placeholder="'នាមខ្លួន'"
            :label="'ទាមទារបញ្ចូល នាមខ្លួន'"
            :required="true"
            v-model="trainerForm.FirstName"
            :message_error="message.FirstName"
            class="col-6"
          />
          <custom-input-text
            :placeholder="'ភេទ'"
            :label="'ទាមទារបញ្ចូល ភេទ'"
            :required="true"
            v-model="trainerForm.Gender"
            :message_error="message.Gender"
            class="col-6"
          />
          <custom-input-text
            :placeholder="'ខេត្ដ'"
            :label="'ទាមទារបញ្ចូល ខេត្ដ'"
            v-model="trainerForm.Province"
            :message_error="message.Province"
            class="col-6"
          />
          <custom-input-text
            :placeholder="'លេខទូរសព្ទ'"
            :label="'ទាមទារបញ្ចូល លេខទូរសព្ទ'"
            v-model="trainerForm.Phone"
            :message_error="message.Phone"
            class="col-12"
          />
          <custom-input-text
            :placeholder="'សារអេឡិចត្រូនិច'"
            :label="'បញ្ចូល សារអេឡិចត្រូនិច'"
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
      // Form student
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
      this.footer_label = "";
      this.$refs.dialogTrainerForm.closeDialog();
      this.$emit("updatedTrainer");
    },
    // Call student form info from parent
    trainerInfoForm(data = "") {
      try {
        if (!data) {
          this.clearTrainerInfoForm();
        } else {
          this.footer_label = "កែប្រែ";
          this.trainerForm.FirstName = data.FirstName;
          this.trainerForm.LastName = data.LastName;
          this.trainerForm.Email = data.Email;
          this.trainerForm.Gender = data.Gender;
          this.trainerForm.Province = data.Province;
          this.trainerForm.Phone = data.Phone;
          // Get studentID
          this.trainerForm.trainersID = data.trainersID;
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
          console.log('data', this.trainerForm);
          for (const [key, value] of Object.entries(this.trainerForm)) {
            if (!value) {
              this.trainerForm[key] = "";
            }
          }
          if (!this.footer_label) {
            await this.$api.school.trainer().createTrainer(this.trainerForm);
          } else {
            await this.$api.school
              .trainer()
              .updateTrainer(this.trainerForm, this.trainerForm.trainersID);
          }
          this.$emit("updatedTrainer");
          this.closeDialogTrainerForm();
        } else {
          if (!this.trainerForm.FirstName) {
            this.message.FirstName = "ត្រូវតែបញ្ចូល នាមខ្លួន";
          } else {
            this.message.FirstName = "";
          }
          if (!this.trainerForm.LastName) {
            this.message.LastName = "ត្រូវតែបញ្ចូល នាមត្រកូល";
          } else {
            this.message.LastName = "";
          }
          if (!this.trainerForm.Gender) {
            this.message.Gender = "ត្រូវតែបញ្ចូល ភេទ";
          } else {
            this.message.Gender = "";
          }
        }
        
      } catch (error) {
        console.log("Error create student info", error);
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
