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
          <custom-dropdown
            :options="trainerOptions"
            :placeholder="'Select trainer'"
            :label="'Trainer'"
            :required="true"
            v-model="scheduleForm.Trainer"
            :message_error="message.Trainer"
            class="col-6 py-0"
            @addNewDropdown="onClickCreateTrainer"
          />
          <custom-calendar
            :isShowIcon="true"
            :label="'Date'"
            :required="true"
            v-model="scheduleForm.StartDate"
            :message_error="message.StartDate"
            class="col-6 py-0"
          />
          <custom-input-mask
            :placeholder="'hh:mm'"
            :mask="'99:99'"
            :label="'Start time'"
            :required="true"
            v-model="scheduleForm.StartTime"
            :message_error="message.StartTime"
            class="col-6 py-0"
          />
          <custom-input-mask
            :placeholder="'hh:mm'"
            :mask="'99:99'"
            class="col-6 py-0"
            :label="'End time'"
            v-model="scheduleForm.EndTime"
            :required="true"
            :message_error="message.EndTime"
          />
          <custom-dropdown
            :options="roomOptions"
            :placeholder="'Select room'"
            :label="'Room'"
            class="col-6 py-0"
            v-model="scheduleForm.Room"
            :required="true"
            :message_error="message.Room"
          />
          <custom-dropdown
            :options="classOptions"
            :placeholder="'Select class'"
            :label="'Classes'"
            class="col-6 py-0"
            v-model="scheduleForm.Class"
            :required="true"
            :message_error="message.Class"
          />
        </div>
      </template>
    </custom-dialog>
    <!-- Component  -->
    <!-- Chil trainer form  -->
    <TrainerForm ref="toTrainerForm" @updatedTrainer="listTrainers" />
  </div>
</template>

<script>
import TrainerForm from "../trainers/TrainerForm.vue";
export default {
  name: "ScheduleForm",
  components: {
    TrainerForm,
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
      classOptions: [],
      roomOptions: [],
      trainerOptions: [],
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
        Trainer: "",
        Room: "",
        Class: "",
      },
      // Error message
      message: {
        Title: "",
        StartDate: "",
        StartTime: "",
        EndTime: "",
        Trainer: "",
        Room: "",
        Class: "",
      },
      // Dialog
      footer_label: "",
    };
  },
  props: {
    msg: String,
  },
  emits: ["updatedSchedule"],
  watch: {},
  created() {
    this.listRooms();
  },
  methods: {
    onClickCreateTrainer() {
      this.$refs.toTrainerForm.trainerInfoForm();
    },
    openDialogScheduleForm() {
      this.$refs.dialogScheduleForm.openDialog();
      this.listTrainers();
      
    },
    closeDialogScheduleForm() {
      this.clearScheduleInfoForm();
      this.footer_label = "";
      this.$refs.dialogScheduleForm.closeDialog();
      this.$emit("updatedSchedule", { CloseDialog: true });
    },
    // Call schedule form info from parent
    scheduleInfoForm(data = "") {
      try {
        console.log("data", data);
        if (!data) {
          this.clearScheduleInfoForm();
        } else {
          this.footer_label = "Eidt";
          this.scheduleForm.Title = data.Title;
          this.scheduleForm.StartDate = data.StartDate;
          this.scheduleForm.StartTime = data.StartTime;
          this.scheduleForm.EndTime = data.EndTime;
          this.scheduleForm.Room = data.Room;
          this.scheduleForm.Trainer = data.Trainer;
          // Get schedule ID
          this.scheduleID = data.SCHEDULES_ID;
        }
        this.openDialogScheduleForm();
      } catch (error) {
        console.log("Error schedule info form", error);
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
          this.scheduleForm.Trainer &&
          this.scheduleForm.Room &&
          this.scheduleForm.Class
        ) {
          this.scheduleForm.StartDate = this.getDateTimeFormat(
            this.scheduleForm.StartDate,
            this.scheduleForm.StartTime
          );
          this.scheduleForm.EndDate = this.getDateTimeFormat(
            this.scheduleForm.StartDate,
            this.scheduleForm.EndTime
          );
          if (!this.footer_label) {
            await this.$api.schedule.createSchedule(this.schoolId, this.scheduleForm);
          } else {
            await this.$api.schedule.updateSchedule(
              this.schoolId,
              this.scheduleForm,
              this.scheduleID
            );
          }
          this.$emit("updatedSchedule");
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
          if (!this.scheduleForm.Trainer) {
            this.message.Trainer = "Trainer is required";
          } else {
            this.message.Trainer = "";
          }
          if (!this.scheduleForm.Room) {
            this.message.Room = "Room is required";
          } else {
            this.message.Room = "";
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
    async listClasses() {
      try {
        let classes = await this.$api.class.listClasses(this.schoolId);
        if (classes && classes.data && classes.data.length > 0) {
          this.classOptions = classes.data.map((classItem) => {
            return {
              Value: `${classItem.Name}`,
              ID: classItem.CLASSES_ID,
            };
          });
        } else {
          this.classOptions = [];
        }
        this.listRooms();
      } catch (error) {
        console.log("Error list class", error);
      }
    },
    async listTrainers() {
      let trainers = await this.$api.trainer.listTrainers(this.schoolId);
      if (trainers && trainers.data.length > 0) {
        this.trainerOptions = trainers.data.map((trainer) => {
          return {
            Value: `${trainer.LastName} ${trainer.FirstName}`,
            ID: trainer.TRAINERS_ID,
          };
        });
      } else {
        this.trainerOptions = [];
      }
    this.listClasses();
    },
    async listRooms() {
      let rooms = await this.$api.room.listRooms(this.schoolId);
      if (rooms && rooms.data.length > 0) {
        this.roomOptions = rooms.data.map((room) => {
          return { Value: `${room.Name}`, ID: room.ROOMS_ID };
        });
      } else {
        this.roomOptions = [];
      }
    },

    clearScheduleInfoForm() {
      this.scheduleForm = {};
      this.message = {};
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
