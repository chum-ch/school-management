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
      <StudentForm ref="toStudentForm" @updatedStudent="getListStudent" />

      <!-- Dialog delete student  -->
      <custom-dialog
        ref="dialogDeleteStudent"
        @onClickDialogSubmit="deleteStudent"
        :danger="true"
        @onClickCloseDialog="closeDialogDeleteStudent"
        :is_delete="true"
        :footer_label="'លុប ចោល'"
        :modal_header="'ការលុបទិន្ន័យ'"
      >
        <template #bodyDialog>
          <div class="text-center mt-4">
            អ្នកបានជ្រើសរើសសិស្សានុសិស្សចំនួន {{ selectedStudent.length }} ដើម្បីលុបចោល។
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
       breadCrumb: [{ label: "សិស្ស", to: "/students" }],
      // Table
      selectedStudent: [],
      tableDataStudents: [],
      dataKey: "studentsID",
      columnsStudent: [
        {
          field: "ID",
          header: "លេខសម្គាល់",
        },
        {
          field: "LastName",
          header: "នាមត្រកូល",
        },
        {
          field: "FirstName",
          header: "នាមខ្លួន",
        },
        {
          field: "Gender",
          header: "ភេទ",
        },
        {
          field: "Email",
          header: "សារអេឡិចត្រូនិច",
        },
        {
          field: "Class",
          header: "ថ្នាក់រៀន",
        },
      ],
    };
  },
  props: [],
  emits: [],
  watch: {},
  created() {
    this.getListStudent();
  },
  methods: {
    onClickCreateStudent() {
      this.$refs.toStudentForm.studentInfoForm();
    },
    onClickEditStudent() {
      this.$refs.toStudentForm.studentInfoForm(this.selectedStudent[0]);
    },
    onClickDetailsStudent(event) {
      this.$router.push(`/students/${event[0].studentsID}`);
    },
    unSelecteRowStudent() {
      this.$refs.toCallMethodUnSelectedRow.unSelectedAllRows();
    },
    selectedRowData(data) {
      this.selectedStudent = data;
    },

    async getListStudent() {
      try {
        let students = await this.$api.school.student().listStudents();
        if (students.data) {
          this.tableDataStudents = students.data;
        }
        this.unSelecteRowStudent();
        
      } catch (error) {
        console.log("Error list student", error);
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
      this.getListStudent();
    },
    async deleteStudent() {
      for (let item of this.selectedStudent) {
        await this.$api.school.student().deleteStudent(item.studentsID);
      }
      this.closeDialogDeleteStudent();
      this.getListStudent();
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
