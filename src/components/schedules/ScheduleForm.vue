<template>
  <div class="hello">
    <!-- Dialog schedule form  -->
    <custom-dialog
      ref="dialogScheduleForm"
      :modal_header="'Schedule Form'"
      @onClickDialogSubmit="createScheduleInfo"
      @onClickCloseDialog="closeDialogScheduleForm"
      :footer_label="footer_label"
    >
      <template #bodyDialog>
        <div class="flex flex-wrap">
          <custom-input-text
            :placeholder="'......'"
            :label="'Subject name'"
            :required="true"
            v-model="scheduleForm.Title"
            :message_error="message.Title"
            class="col-12 py-0"
          />
          <custom-calendar
            :isShowIcon="true"
            :label="'Date'"
            :required="true"
            v-model="scheduleForm.StartDate"
            :modelValue="scheduleForm.StartDate"
            :message_error="message.StartDate"
            class="col-12 py-0"
          />
          <custom-dropdown
            :options="classesOptions"
            :placeholder="'Select classes'"
            :label="'Classes'"
            class="col-12 py-0"
            v-model="selectClass"
            :modelValue="selectClass"
            :required="true"
            :message_error="message.Class"
            @addNewDropdown="onClickCreateClass"
          />
          <custom-input-mask
            :placeholder="'hh:mm'"
            :mask="'99:99'"
            :label="'Start time'"
            :required="true"
            v-model="scheduleForm.StartTime"
            :modelValue="scheduleForm.StartTime"
            :message_error="message.StartTime"
            class="col-6 py-0"
          />
          <custom-input-mask
            :placeholder="'hh:mm'"
            :mask="'99:99'"
            class="col-6 py-0"
            :label="'End time'"
            v-model="scheduleForm.EndTime"
            :modelValue="scheduleForm.EndTime"
            :required="true"
            :message_error="message.EndTime"
          />
        </div>
      </template>
    </custom-dialog>
    <!-- Component  -->
    <!-- Child classes  -->
    <ClassForm ref="refToChildClassForm" @updatedClass="updatedClass" />
  </div>
</template>
<script>
import ClassForm from "../classes/ClassForm.vue";
export default {
  name: "ScheduleForm",
  components: {
    ClassForm,
  },
  data() {
    return {
      dateOptions: {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: "Asia/Phnom_Penh",
      },
      schoolId: this.$route.params.schoolId,
      scheduleID: "",
      startTime: "",
      endTime: "",
      // Form schedule
      scheduleForm: {
        Title: "",
        StartTime: "",
        EndTime: "",
        StartDate: "",
        EndDate: "",
        Class: "",
      },
      // Error message
      message: {
        Title: "",
        StartDate: "",
        StartTime: "",
        EndTime: "",
        Class: "",
      },
      // Class option
      selectClass: "",
      classesOptions: [],
      // Dialog
      footer_label: "",
    };
  },
  props: {
    msg: String,
  },
  emits: ["updatedSchedule"],
  watch: {},
  created() {},
  methods: {
    openDialogScheduleForm() {
      this.$refs.dialogScheduleForm.openDialog();
      this.listClasses();
    },
    closeDialogScheduleForm() {
      this.$refs.dialogScheduleForm.closeDialog();
      this.setDefaultValue();
    },
    onlyUpdateSchedule(data = {}) {
      if (Object.keys(data).length > 0) {
        this.scheduleForm.Title = data.Title;
        this.scheduleForm.StartDate = data.StartDate;
        this.scheduleForm.StartTime = data.StartTime;
        this.scheduleForm.EndTime = data.EndTime;

        this.scheduleID = data.SCHEDULES_ID;
        if (this.scheduleID) {
          this.footer_label = "Edit";
        }
        // Class option
        if (data.Class && Object.keys(data.Class).length > 0) {
          this.selectClass = {
            Value: data.Class.Name,
            ID: data.Class.Id,
            Room: data.Class.Room,
            Trainer: data.Class.Trainer,
          };
        }
      }
    },
    getDateTimeFormat(dateToConvert, time) {
      let date = new Date(dateToConvert);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      // const hours = date.getHours().toString().padStart(2, "0");
      // const minutes = date.getMinutes().toString().padStart(2, "0");
      // const seconds = date.getSeconds().toString().padStart(2, "0");
      if (!time) {
        time = "00:00";
      }
      const localString = `${year}-${month}-${day}T${time}:00`;
      return localString;
    },
    async createScheduleInfo() {
      try {
        if (
          this.scheduleForm.Title &&
          this.scheduleForm.StartDate &&
          this.scheduleForm.StartTime &&
          this.scheduleForm.EndTime &&
          this.selectClass &&
          this.selectClass.Value
        ) {
          this.scheduleForm.StartDate = this.getDateTimeFormat(
            this.scheduleForm.StartDate,
            this.scheduleForm.StartTime
          );
          this.scheduleForm.EndDate = this.getDateTimeFormat(
            this.scheduleForm.StartDate,
            this.scheduleForm.EndTime
          );
          this.selectClass["Name"] = this.selectClass["Value"];
          this.selectClass["Id"] = this.selectClass["ID"];
          delete this.selectClass["Value"];
          delete this.selectClass["ID"];
          this.scheduleForm.Class = this.selectClass;
          let schedule = {};
          if (this.scheduleID) {
            schedule = await this.$api.schedule.updateSchedule(
              this.schoolId,
              this.scheduleForm,
              this.scheduleID
            );
          } else {
            schedule = await this.$api.schedule.createSchedule(
              this.schoolId,
              this.scheduleForm
            );
          }
          this.$emit("updatedSchedule", schedule.data);
          this.closeDialogScheduleForm();
        } else {
          if (!this.scheduleForm.Title) {
            this.message.Title = "Subject name is required";
          } else {
            this.message.Title = "";
          }
          if (!this.scheduleForm.StartDate) {
            this.message.StartDate = "Date  is required";
          } else {
            this.message.StartDate = "";
          }
          if (!this.scheduleForm.Class) {
            this.message.Class = "Class is required";
          } else {
            this.message.Class = "";
          }
          if (!this.scheduleForm.StartTime) {
            this.message.StartTime = "Start time is required";
          } else {
            this.message.StartTime = "";
          }
          if (!this.scheduleForm.EndTime) {
            this.message.EndTime = "End time is required";
          } else {
            this.message.EndTime = "";
          }
        }
      } catch (error) {
        console.log("Error create schedule info", error);
      }
    },
    /**
     *
     * Classes
     */
    onClickCreateClass(value) {
      this.$refs.refToChildClassForm.openDialogClassForm();
      this.$refs.refToChildClassForm.onlyUpdateClasses({ Name: value });
    },
    updatedClass(classData) {
      if (classData && Object.keys(classData).length > 0) {
        this.selectClass = {
          Value: classData.Name,
          ID: classData.CLASSES_ID,
          Room: classData.Room,
          Trainer: classData.Trainer,
        };
      }
      this.listClasses();
    },
    async listClasses() {
      try {
        let classes = await this.$api.classApi.listClasses(this.schoolId);
        if (classes && classes.data && classes.data.length > 0) {
          this.classesOptions = classes.data.map((item) => {
            return {
              Value: item.Name,
              ID: item.CLASSES_ID,
              Room: item.Room,
              Trainer: item.Trainer,
            };
          });
        }
      } catch (error) {
        console.log("Error list class", error);
      }
    },
    /**
     * Clear value variable
     */
    setDefaultValue() {
      this.scheduleForm = {};
      this.message = {};
      this.scheduleID = "";
      this.selectClass = "";
      this.footer_label = "";
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
* {
  margin: 0;
  padding: 0;
}
</style>
