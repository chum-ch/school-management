<template>
  <div>
    <!-- <custom-input-text
    :show_icon="true"
    :placeholder="'Email'"
    @update:modelValue="value1"
    /> -->

    <!-- <custom-input-password
      class="col-4"
      :eye_icon="true"
      :label="'Password'"
      :message_error="message_error"
      :is_required="true"
      @update:modelValue="value1($event)"
      :modelValue="text1"
    /> -->

    <!-- <custom-button
      class="col-3"
      :label="'Search'"
      :search_icon="true"
      :help="true"
      @onClick="test"
    /> -->
    <!-- Navigation with breadCrum  -->
    <custom-navigation :breadCrumb="breadCrumb" />
    <div class="row row-cols-1 row-cols-md-5 row-cols-sm-3 p-2 flex justify-content-center flex-wrap">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="col"
        @click="list(item.name)"
      >
        <div class="card h-100 custom transition-duration-500 text-center">
          <div class="image d-flex justify-content-center cursor-pointer flex-wrap my-4">
            <img :src="item.img" alt="" srcset="" width="70" height="70" class="" />
            <div class="card-body">
              <h5 class="card-title">{{ item.title }}</h5>
              <p class="card-text">
                {{ item.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="row row-cols-1 row-cols-md-4 row-cols-sm-2 g-4 px-1 my-2">
      <div class="col" @click="$event=>list('students')">
        <div class="card h-100 custom transition-duration-500">
          <div
            class="image d-flex justify-content-center cursor-pointer flex-wrap my-4"
          >
            <img
              src="../assets/img/classroom.png"
              alt=""
              srcset=""
              width="100"
              class=""
            />
            <div class="card-body">
              <h5 class="card-title w-100 text-center">សិស្សានុសិស្ស</h5>
              <p class="card-text">
                ការគ្រប់គ្រងលើសិស្សានុសិស្ស ទាំងអស់នៅក្នុងសាលា ។
              </p>
            </div>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>
<script>
// @ is an alias to /src
import data from "../assets/data/startingData.json";
export default {
  name: "NavigationView",
  components: {},
  data() {
    return {
      items: [],
      breadCrumb: [],
      schoolId: this.$route.params.schoolId
    };
  },
  watch: {},
  created() {
    this.items = data;
    this.getSchoolDetails(this.schoolId);
  },

  methods: {
    async getSchoolDetails(schoolId) {
      let school = await this.$api.school.getSchool(schoolId)
      if(school && school.data && Object.keys(school.data).length > 0){
        this.breadCrumb = [{ label: `${school.data.Name}`, to: '/' }, { label: 'Manages', to: `/schools/${schoolId}/manages` }];
      }
    },
    list(screen) {
      this.$router.push(screen);
    },
  },
};
</script>
<style scoped>
.custom:hover {
  border: 1px solid #007bff;
  transform: scale(1.02);
  box-shadow: #007bff 0px -1px 3px 0px inset;
}
</style>
