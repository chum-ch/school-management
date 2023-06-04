<template>
  <div>
    <custom-navigation :breadCrumb="breadCrumb" />
  <div class="hello flex">
    <h1>{{ msg }}</h1>
    <custom-details
    :full_name="fullName"
    :email="email"
    >
    <template #view_info>
      <custom-view-info :items_view_info="viewInfo" />
    </template>
    <template #view_tab>
      <tab-menu-primevue v-model:activeIndex="active" :model="items" />
    </template>
    </custom-details>
  </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      fullName: "",
      email: "",
      values: "",
      // BreadCrum 
       // Bread Crumb
       breadCrumb: [{ label: "សិស្ស", to: "/students" }],
      // Tabl
      active: 0,
      items: [
        {
          label: "គ្រួសារ",
          command: () => {
            this.testingClick();
          },
        },
        {
          label: "ការសិក្សា",
          command: () => {
            this.testingClick();
          },
        },
        {
          label: "អវត្តមាន",
          command: () => {
            this.testingClick();
          },
        },
        {
          label: "កាលវិភាគ",
          command: () => {
            this.testingClick();
          },
        },
      ],
      viewInfo: [
        {
          label: "លេខសម្គាល់",
          key: "ID",
        },
        {
          label: "ថ្នាក់រៀន",
          key: "Class",
        },
        {
          label: "នាមត្រកូល",
          key: "LastName",
        },
        {
          label: "នាមខ្លួន",
          key: "FirstName",
        },
        {
          label: "ភេទ",
          key: "Gender",
        },
      ],
    };
  },
  props: {
    msg: String,
  },
  emits: [""],
  watch: {
  },
  created() {
    this.detailsStudent(this.$route.params.id);
  },
  methods: {
    testingClick() {
      console.log("dd");
    },
    async detailsStudent(id) {
      try {
        if(id){
          let getStuent = await this.$api.school
            .student()
            .getStudent(id);
          if (getStuent.data) {
            this.fullName = `${getStuent.data[0].LastName} ${getStuent.data[0].FirstName}`
            this.email = `${getStuent.data[0].Email}`
           this.viewInfo = this.$globalFunction.sectionViewInfo(this.viewInfo, getStuent.data[0])
           this.breadCrumb.push({ label: `${this.fullName}`, to: `/students/${this.$route.params.id}` })
          }
        }
        
      } catch (error) {
        console.log("Error details student", error);
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  margin: 0;
  padding: 0;
}
</style>
