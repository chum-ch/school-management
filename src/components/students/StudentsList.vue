<template>
  <div>
    <!-- Navigation with breadCrum  -->
    <custom-navigation :breadCrumb="breadCrumb" />
    <div v-show="true">
      <!-- Table  -->
      <custom-table
        ref="toCallMethodUnSelectedRow"
        :table_data="tableDataStudents"
        :columns="columnsStudent"
        @selected-row-data="selectedRowData"
        @onClickCreate="onClickCreateStudent"
        @onClickEdit="onClickEditStudent"
        @onClickDelete="onClickDeleteStudent"
        @onClickDetails="onClickDetailsStudent"
        :data_key="dataKey"
      />
      <!-- Child student form  -->
      <StudentForm ref="toStudentForm" @updatedStudent="updatedStudent" />

      <!-- Dialog delete student  -->
      <custom-dialog
        ref="dialogDeleteStudent"
        @onClickDialogSubmit="deleteStudent"
        :danger="true"
        @onClickCloseDialog="closeDialogDeleteStudent"
        :is_delete="true"
        :footer_label="'Delete'"
        :modal_header="'Delete Student'"
      >
        <template #bodyDialog>
          <div class="text-center mt-4">
            You was selected {{ selectedStudent.length }} to delete.
          </div>
        </template>
      </custom-dialog>
    </div>
    <div></div>
  </div>
</template>
<script>
import StudentForm from "./StudentForm.vue";
export default {
  components: {
    StudentForm,
  },
  data() {
    return {
       // Bread Crumb
       breadCrumb: [],
      // Table
      schoolId: this.$route.params.schoolId,
      selectedStudent: [],
      tableDataStudents: [],
      dataKey: "ID",
      columnsStudent: [
        {
          field: "ID",
          header: "Student's ID",
        },
        {
          field: "LastName",
          header: "Last name",
        },
        {
          field: "FirstName",
          header: "First name",
        },
        {
          field: "Gender",
          header: "Gender",
        },
        {
          field: "Email",
          header: "Email",
        },
        {
          field: "Class",
          header: "Class",
        },
      ],
    };
  },
  props: [],
  emits: [],
  watch: {},
  created() {
    this.getSchoolDetails(this.schoolId);
  },
  methods: {
    onClickCreateStudent() {
      this.$refs.toStudentForm.studentInfoForm();
    },
    onClickEditStudent() {
      this.$refs.toStudentForm.studentInfoForm(this.selectedStudent[0]);
    },
    onClickDetailsStudent(event) {
      console.log('details', event);
      // this.$router.push(`/students/${event[0].studentsID}`);
    },
    unSelecteRowStudent() {
      this.$refs.toCallMethodUnSelectedRow.unSelectedAllRows();
    },
    selectedRowData(data) {
      this.selectedStudent = data;
    },
    async getSchoolDetails(schoolId) {
      let school = await this.$api.school.getSchool(schoolId)
      if(school && school.data && Object.keys(school.data).length > 0){
        this.breadCrumb = [];
        this.breadCrumb.push({ label: `${school.data.Name}`, to: '/' }, { label: 'Magnages', to: `/schools/${schoolId}/manages` }, { label: 'Students', to: `/schools/${schoolId}/students` })
        this.getListStudent()
      }
    },
    async getListStudent() {
      try {
        let students = await this.$api.student.listStudents(this.schoolId);
        if(students && students.data && students.data.length > 0){
          this.tableDataStudents = students.data
        }
        this.unSelecteRowStudent();
        
      } catch (error) {
        console.log("Error list student", error);
      }
    },
    updatedStudent(event) {
      if(event && event.CloseDialog) {
       this.unSelecteRowStudent()
      } else {
        this.getSchoolDetails(this.schoolId);
      }
    },
    // Delete student
    onClickDeleteStudent() {
      this.openDialogDeleteStudent();
    },
    openDialogDeleteStudent() {
      this.$refs.dialogDeleteStudent.openDialog();
    },
    closeDialogDeleteStudent() {
      this.$refs.dialogDeleteStudent.closeDialog();
    },
    async deleteStudent() {
      for (let item of this.selectedStudent) {
        await this.$api.student.deleteStudent(this.schoolId, item.STUDENTS_ID);
      }
      this.closeDialogDeleteStudent();
      this.getSchoolDetails(this.schoolId);
    },
  },
};
</script>
<style scoped>
* {
  padding: 0;
  margin: 0;
}
</style>
