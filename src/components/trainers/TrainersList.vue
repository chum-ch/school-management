<template lang="">
    <div>
         <!-- Navigation with breadCrum  -->
      <custom-navigation :breadCrumb="breadCrumb" />
      <div v-show="true">
        <!-- Table  -->
        <custom-table
          ref="toCallMethodUnSelectedRow"
          :table_data="tableDataTrainers"
          :columns="columnsTrainer"
          @selected-row-data="selectedRowData"
          @onClickCreate="onClickCreateTrainer"
          @onClickEdit="onClickEditTrainer"
          @onClickDelete="onClickDeleteTrainer"
          @onClickDetails="onClickDetailsTrainer"
          :data_key="dataKey"
        />
      </div>
      <!-- Chil student form  -->
      <TrainerForm ref="toTrainerForm" @updatedTrainer="getListTrainers" />
    </div>
</template>
<script>
import TrainerForm from './TrainerForm.vue';
export default {
  components: {
    TrainerForm
  },
  data() {
    return {
       // Bread Crumb
       breadCrumb: [{ label: "លោក-អ្នក គ្រូ", to: "/trainers" }],
       // Table
       dataKey: "trainersID",
      selectedTrainers: [],
      tableDataTrainers: [],
      columnsTrainer:[
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
          field: "Phone",
          header: "លេខទូរសព្ទ",
        },
        {
          field: "Email",
          header: "សារអេឡិចត្រូនិច",
        },
        {
          field: "Province",
          header: "ខេត្ត",
        },
      ],
    };
  },
  props: {},
  watch: {},
  created() {
    this.getListTrainers()
  },
  methods: {
    onClickCreateTrainer() {
      this.$refs.toTrainerForm.trainerInfoForm();
      
    },
    onClickEditTrainer() {
      this.$refs.toTrainerForm.trainerInfoForm(this.selectedTrainers[0]);
    },
    onClickDetailsTrainer(event) {
      this.$router.push(`/trainers/${event[0].trainersID}`);
    },
    unSelecteRowStudent() {
      this.$refs.toCallMethodUnSelectedRow.unSelectedAllRows();
    },
    
     // Delete trainer
     onClickDeleteTrainer() {
      console.log('d');
    },
    selectedRowData(data) {
      this.selectedTrainers = data;
    },
    async getListTrainers() {
      try {
        let trainers = await this.$api.school.trainer().listTrainers();
        if (trainers.data) {
          this.tableDataTrainers = trainers.data;
        }
        this.unSelecteRowStudent();
      } catch (error) {
        console.log('Error list trainer', error);
      }
      
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>