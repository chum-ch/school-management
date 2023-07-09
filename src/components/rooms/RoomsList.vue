<template>
    <div>
         <!-- Navigation with breadCrum  -->
      <custom-navigation :breadCrumb="breadCrumb" />
      <div v-show="true">
        <!-- Table  -->
        <custom-table
          ref="toCallMethodUnSelectedRow"
          :table_data="tableDataRooms"
          :columns="columnsRoom"
          @selected-row-data="selectedRowData"
          @onClickCreate="onClickCreateRoom"
          @onClickEdit="onClickEditRoom"
          @onClickDelete="openDialogDeleteRoom"
          @onClickDetails="onClickDetailsRoom"
        />
      </div>
      <!-- Chil room form  -->
      <RoomForm ref="toRoomForm" @updatedRoom="updatedRoom"/>
      <!-- Dialog delete room  -->
      <custom-dialog
        ref="dialogDeleteRoom"
        @onClickDialogSubmit="deleteRoom()"
        :danger="true"
        @onClickCloseDialog="closeDialogDeleteRoom()"
        :is_delete="true"
        :footer_label="'Delete'"
        :modal_header="'Delete Room'"
      >
        <template #bodyDialog>
          <div class="text-center mt-4">
            You was selected  {{ selectedRooms.length }} to delete.
          </div>
        </template>
      </custom-dialog>
    </div>
</template>
<script>
import RoomForm from './RoomForm.vue';
export default {
  components: {
    RoomForm
  },
  data() {
    return {
      schoolId: this.$route.params.schoolId,
       // Bread Crumb
       breadCrumb: [],
       // Table
      selectedRooms: [],
      tableDataRooms: [],
      columnsRoom:[
        {
          field: "Name",
          header: "Room name",
        },
        {
          field: "Floor",
          header: "Floor",
        },
      ],
    };
  },
  props: {},
  watch: {},
  created() {
    this.getSchoolDetails(this.schoolId)
  },
  methods: {
    onClickCreateRoom() {
      this.$refs.toRoomForm.roomInfoForm();
      
    },
    onClickEditRoom() {
     
      this.$refs.toRoomForm.roomInfoForm(this.selectedRooms[0]);
    },
    onClickDetailsRoom(event) {
      console.log('Details', event);
      // this.$router.push(`/rooms/${event[0].trainersID}`);
    },
    unSelecteRowRoom() {
      this.$refs.toCallMethodUnSelectedRow.unSelectedAllRows();
    },
  
    selectedRowData(data) {
      this.selectedRooms = data;
    },
    async getSchoolDetails(schoolId) {
      let school = await this.$api.school.getSchool(schoolId)
      if(school && school.data && Object.keys(school.data).length > 0){
        this.breadCrumb = [];
        this.breadCrumb.push({ label: `${school.data.Name}`, to: '/' }, { label: 'Magnages', to: `/schools/${schoolId}/manages` }, { label: 'Rooms', to: `/schools/${schoolId}/rooms` });
        this.getListRoom()
      }
    },
    async getListRoom() {
      try {
        let rooms = await this.$api.room.listRooms(this.schoolId);
        if (rooms && rooms.data && rooms.data.length > 0) {
          this.tableDataRooms = rooms.data;
        }
        this.unSelecteRowRoom();
      } catch (error) {
        console.log('Error list room', error);
      }
    },
    updatedRoom(event){
      if(event && event.CloseDialog){
        this.unSelecteRowRoom();
      } else {
        this.getSchoolDetails(this.schoolId)
      }
    },
    async deleteRoom(){
      for (let item of this.selectedRooms){
        await this.$api.room.deleteRoom(this.schoolId, item.ROOMS_ID);
      }
      this.closeDialogDeleteRoom();
      this.getSchoolDetails(this.schoolId);
    },
    openDialogDeleteRoom() {
      this.$refs.dialogDeleteRoom.openDialog();
    },
    closeDialogDeleteRoom() {
      this.$refs.dialogDeleteRoom.closeDialog();
      this.unSelecteRowRoom();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>