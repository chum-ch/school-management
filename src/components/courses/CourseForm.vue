<template>
  <div class="hello">
    <!-- Dialog course form  -->
    <custom-dialog
      ref="dialogCourseForm"
      :modal_header="'Course Form'"
      @onClickDialogSubmit="createCourseInfo"
      @onClickCloseDialog="closeDialogCourseForm"
      :footer_label="footer_label"
    >
      <template #bodyDialog>
        <custom-input-text
          :placeholder="'.......'"
          :label="'Course name'"
          v-model="courseForm.Name"
          :required="true"
          :message_error="message.Name"
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
      // Form course
      courseID: "",
      courseForm: {
        Name: "",
      },
      
      // Error message
      message: {
        Name: "",
      },
      // Dialog
      footer_label: "",
    };
  },
  props: {
    msg: String,
  },
  emits: ["updatedCourse"],
  watch: {},
  updated() {},
  created() {},
  methods: {
    openDialogCourseForm() {
      this.$refs.dialogCourseForm.openDialog();
    },
    closeDialogCourseForm() {
      this.footer_label = "";
      this.$refs.dialogCourseForm.closeDialog();
      this.setDefaultValue();
    },
    onlyUpdateCourse(data = {}) {
      if (data && Object.keys(data).length > 0) {
        this.courseForm.Name = data.Name;
        this.courseForm.Floor = data.Floor;
        // Get courseID
        this.courseID = data.COURSES_ID;
        if (this.courseID) {
          this.footer_label = "Edit";
        }
      }
    },
    async createCourseInfo() {
      try {
        if (this.courseForm.Name) {
          let course = {};
          if (this.courseID) {
            course = await this.$api.course.updateCourse(
              this.schoolId,
              this.courseForm,
              this.courseID
            );
          } else {
            course = await this.$api.course.createCourse(this.schoolId, this.courseForm);
          }
          this.$emit("updatedCourse", course.data);
          this.closeDialogCourseForm();
        } else {
          if (!this.courseForm.Name) {
            this.message.Name = "Course's name is required.";
          } else {
            this.message.Name = "";
          }
        }
      } catch (error) {
        console.log("Error create course info", error);
      }
    },
    setDefaultValue() {
      this.courseForm = {};
      this.message = {};
      this.courseID = "";
      this.footer_label = "";
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
