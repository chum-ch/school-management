<template>
  <div>
    <!-- Navigation with breadCrum  -->
    <custom-navigation :breadCrumb="breadCrumb" />
    <div v-show="true">
      <!-- Table  -->
      <custom-table
        ref="toCallMethodUnSelectedRow"
        :table_data="tableDataSchedules"
        :columns="columnsSchedules"
        @selected-row-data="selectedRowData"
        @onClickCreate="onClickCreateSchedule"
        @onClickEdit="onClickEditSchedule"
        @onClickDelete="onClickDeleteSchedule"
        @onClickDetails="onClickDetailsSchedule"
      />
      <!-- Dialog delete room  -->
      <custom-dialog
        ref="dialogDeleteSchedule"
        @onClickDialogSubmit="deleteSchedule()"
        :danger="true"
        @onClickCloseDialog="closeDialogDeleteSchedule()"
        :is_delete="true"
        :footer_label="'Delete'"
        :modal_header="'Delete Schedule'"
      >
        <template #bodyDialog>
          <div class="text-center mt-4">
            You was selected {{ selectedSchedules.length }} to delete.
          </div>
        </template>
      </custom-dialog>
      
      
    </div>
    <!-- Component  -->
    <!-- Chil schedule form  -->
    <ScheduleForm ref="toScheduleForm" @updatedSchedule="updatedSchedule" />
  </div>
</template>
<script>
import ScheduleForm from "./ScheduleForm.vue";
export default {
  components: {
    ScheduleForm,
  },
  data() {
    return {
      trainerOptions: [],
      roomOptions: [{ Name: "B2" }, { Name: "B3" }, { Name: "C4" }],
      something: "",
      // Bread Crumb
      schoolId: this.$route.params.schoolId,
      breadCrumb: [],
      // Table
      selectedSchedules: [],
      tableDataSchedules: [],
      columnsSchedules: [
        {
          field: "Title",
          header: "Subject's name",
        },
        {
          field: "StartDate",
          header: "Date",
        },
        {
          field: "StartTime",
          header: "Start time",
        },
        {
          field: "EndTime",
          header: "End time",
        },
        {
          field: "Trainer.Name",
          header: "Trainer",
        },
        {
          field: "Room.Name",
          header: "Room",
        },
      ],
    };
  },
  props: {},
  watch: {
    // something() {
    //   console.log("items", this.something);
    // },
  },
  created() {
    this.getSchoolDetails(this.schoolId);
  },
  methods: {
    onClickCreateSchedule() {
      this.$refs.toScheduleForm.scheduleInfoForm();
    },
    onClickEditSchedule() {
      this.$refs.toScheduleForm.scheduleInfoForm(this.selectedSchedules[0]);
    },
    onClickDetailsSchedule(event) {
      this.$router.push(`/cleaners/${event[0].cleanersID}`);
    },
    unSelecteRowSchedule() {
      this.$refs.toCallMethodUnSelectedRow.unSelectedAllRows();
    },
    // Delete schedule
    onClickDeleteSchedule() {
      this.openDialogDeleteSchedule();
    },
    selectedRowData(data) {
      this.selectedSchedules = data;
    },
    async getSchoolDetails(schoolId) {
      let school = await this.$api.school.getSchool(schoolId);
      if (school && school.data && Object.keys(school.data).length > 0) {
        this.breadCrumb = [];
        this.breadCrumb.push(
          { label: `${school.data.Name}`, to: "/" },
          { label: "Manages", to: `/schools/${schoolId}/manages` },
          { label: "Schedules", to: `/schools/${schoolId}/schedules` }
        );
        this.getListSchedules();
      } 
    },
    updatedSchedule(event) {
      if (event && event.CloseDialog) {
        this.unSelecteRowSchedule();
      } else {
        this.getSchoolDetails(this.schoolId);
      }
    },

    async getListSchedules() {
      try {
        let schedules = await this.$api.schedule.listSchedules(this.schoolId);
        if (schedules && schedules.data.length > 0) {
          console.log('this.tabl', this.tableDataSchedules)
          this.tableDataSchedules = schedules.data.map((schedule) => {
            let splitDate = schedule.StartDate.split("T");
            schedule.StartDate = splitDate[0];
            return schedule;
          });
        } else {
          this.tableDataSchedules = [];
        }
        this.unSelecteRowSchedule();
      } catch (error) {
        console.log("List schedules error", error);
      }
    },
    async deleteSchedule() {
      for (let item of this.selectedSchedules) {
        await this.$api.schedule.deleteSchedule(this.schoolId, item.SCHEDULES_ID);
      }
      this.closeDialogDeleteSchedule();
      this.getListSchedules();
    },
    openDialogDeleteSchedule() {
      this.$refs.dialogDeleteSchedule.openDialog();
    },
    closeDialogDeleteSchedule() {
      this.$refs.dialogDeleteSchedule.closeDialog();
      this.unSelecteRowSchedule();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
