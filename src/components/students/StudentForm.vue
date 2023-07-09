<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <!-- Dialog student form  -->
    <custom-dialog
      ref="dialogStudentForm"
      :modal_header="'Student Form'"
      @onClickDialogSubmit="createStudentInfo"
      @onClickCloseDialog="closeDialogStudentForm"
      :footer_label="footer_label"
    >
      <template #bodyDialog>
        <div class="flex flex-wrap">
          <custom-input-text
            :placeholder="'......'"
            :label="'Last name'"
            :required="true"
            v-model="studentForm.LastName"
            :message_error="message.LastName"
            class="col-6"
          />
          <custom-input-text
            :placeholder="'.......'"
            :label="'First name'"
            :required="true"
            v-model="studentForm.FirstName"
            :message_error="message.FirstName"
            class="col-6"
          />
          <custom-input-text
            :placeholder="'.......'"
            :label="'Gender'"
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
            :placeholder="'.......'"
            :label="'Class'"
            v-model="studentForm.Class"
            class="col-6"
          />
          <custom-input-text
            :placeholder="'.......'"
            :label="'Email'"
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
      schoolId: this.$route.params.schoolId,
      studentID: "",
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
      this.clearStudentInfoForm();
      this.footer_label = "";
      this.$refs.dialogStudentForm.closeDialog();
      this.$emit("updatedStudent", { CloseDialog: true });
    },
    // Call student form info from parent
    studentInfoForm(data = "") {
      try {
        if (!data) {
          this.clearStudentInfoForm();
        } else {
          this.footer_label = "Edit";
          this.studentForm.FirstName = data.FirstName;
          this.studentForm.LastName = data.LastName;
          this.studentForm.Email = data.Email;
          this.studentForm.Gender = data.Gender;
          this.studentForm.Class = data.Class;
          this.studentForm.ID = data.ID;
          // Get studentID
          this.studentID = data.STUDENTS_ID;
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
          if (!this.footer_label) {
            await this.$api.student.createStudent(this.schoolId, this.studentForm);
          } else {
            await this.$api
              .student
              .updateStudent(this.schoolId, this.studentForm, this.studentID);
          }
          this.$emit("updatedStudent");
          this.closeDialogStudentForm();
        } else {
          if (!this.studentForm.FirstName) {
            this.message.FirstName = "First name is required";
          } else {
            this.message.FirstName = "";
          }
          if (!this.studentForm.LastName) {
            this.message.LastName = "Last name is required";
          } else {
            this.message.LastName = "";
          }
          if (!this.studentForm.Gender) {
            this.message.Gender = "Gender is required";
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
</style>
