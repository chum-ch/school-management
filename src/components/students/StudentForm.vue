<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <!-- Dialog student form  -->
    <custom-dialog
      ref="dialogStudentForm"
      :modal_header="'ទម្រង់ពត៌មាន សិស្សានុសិស្ស'"
      @onClickDialogSubmit="createStudentInfo"
      @onClickCloseDialog="closeDialogStudentForm"
      :footer_label="footer_label"
    >
      <template #bodyDialog>
        <div class="flex flex-wrap">
          <custom-input-text
            :placeholder="'នាមត្រកូល'"
            :label="'ទាមទារបញ្ចូល នាមត្រកូល'"
            :required="true"
            v-model="studentForm.LastName"
            :message_error="message.LastName"
            class="col-6"
          />
          <custom-input-text
            :placeholder="'នាមខ្លួន'"
            :label="'ទាមទារបញ្ចូល នាមខ្លួន'"
            :required="true"
            v-model="studentForm.FirstName"
            :message_error="message.FirstName"
            class="col-6"
          />
          <custom-input-text
            :placeholder="'ភេទ'"
            :label="'ទាមទារបញ្ចូល ភេទ'"
            :required="true"
            v-model="studentForm.Gender"
            :message_error="message.Gender"
            class="col-12"
          />
          <custom-input-text
            :placeholder="'លេខសម្គាល់'"
            :label="'បញ្ចូល លេខសម្គាល់'"
            v-model="studentForm.ID"
            class="col-6"
          />
          <custom-input-text
            :placeholder="'ថ្នាក់រៀន'"
            :label="'ទាមទារបញ្ចូល ថ្នាក់រៀន'"
            v-model="studentForm.Class"
            class="col-6"
          />
          <custom-input-text
            :placeholder="'សារអេឡិចត្រូនិច'"
            :label="'បញ្ចូល សារអេឡិចត្រូនិច'"
            v-model="studentForm.Email"
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
      studentForm: {
        ID: "",
        FirstName: "",
        LastName: "",
        Gender: "",
        Email: "",
        Class: "",
      },
      // Error message
      message: {
        ID: "",
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
  emits: ["updatedStudent"],
  watch: {},
  created() {},
  methods: {
    openDialogStudentForm() {
      this.$refs.dialogStudentForm.openDialog();
    },
    closeDialogStudentForm() {
      this.footer_label = "";
      this.$refs.dialogStudentForm.closeDialog();
      this.$emit("updatedStudent");
    },
    // Call student form info from parent
    studentInfoForm(data = "") {
      try {
        if (!data) {
          this.clearStudentInfoForm();
        } else {
          this.footer_label = "កែប្រែ";
          this.studentForm.FirstName = data.FirstName;
          this.studentForm.LastName = data.LastName;
          this.studentForm.Email = data.Email;
          this.studentForm.Gender = data.Gender;
          this.studentForm.Class = data.Class;
          this.studentForm.ID = data.ID;
          // Get studentID
          this.studentForm.studentsID = data.studentsID;
        }
        this.openDialogStudentForm();
        
      } catch (error) {
        console.log("Error student info form", error);
      }
    },
    async createStudentInfo() {
      try {
        if (
          this.studentForm.FirstName &&
          this.studentForm.LastName &&
          this.studentForm.Gender
        ) {
          for (const [key, value] of Object.entries(this.studentForm)) {
            if (!value) {
              this.studentForm[key] = "";
            }
          }
          if (!this.footer_label) {
            await this.$api.school.student().createStudent(this.studentForm);
          } else {
            await this.$api.school
              .student()
              .updateStudent(this.studentForm, this.studentForm.studentsID);
          }
          this.$emit("updatedStudent");
          this.closeDialogStudentForm();
        } else {
          if (!this.studentForm.FirstName) {
            this.message.FirstName = "ត្រូវតែបញ្ចូល នាមខ្លួន";
          } else {
            this.message.FirstName = "";
          }
          if (!this.studentForm.LastName) {
            this.message.LastName = "ត្រូវតែបញ្ចូល នាមត្រកូល";
          } else {
            this.message.LastName = "";
          }
          if (!this.studentForm.Gender) {
            this.message.Gender = "ត្រូវតែបញ្ចូល ភេទ";
          } else {
            this.message.Gender = "";
          }
        }
        
      } catch (error) {
        console.log("Error create student info", error);
      }
    },
    clearStudentInfoForm() {
      this.studentForm = {};
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
