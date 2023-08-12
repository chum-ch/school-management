<template>
  <div class="hello">
    <!-- Navigation with breadCrum  -->
    <!-- <custom-navigation :home="home" /> -->
    <div v-show="true" class="row row-cols-1 row-cols-md-4 row-cols-sm-2 px-1">
      <div v-for="(item, index) in schoolItems" :key="index" class="col">
        <div class="card h-100 custom transition-duration-500">
          <div
            class="image text-center d-flex justify-content-center cursor-pointer flex-wrap my-4"
          >
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo_2n4ixhk90E0WEDNpghs_skGLtJZuMNCGfqyiBtnwoKRjd8DRZxCgLlmGYCwm9fuGAg&usqp=CAU"
              alt=""
              srcset=""
              width="120"
              height="120"
              class=""
            />
            <div class="card-body">
              <h5 class="card-title text-center">{{ item.Name }}</h5>
              <custom-button
                class="card-text"
                :label="'Manages'"
                @onClick="manage(item.SCHOOLS_ID)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      values: "",
      schoolItems: [],
      home: {
        icon: "pi pi-home",
        to: "/",
      },
    };
  },
  props: {
    msg: String,
  },
  emits: [""],
  watch: {
    // values: {
    //   immediate: true,
    //   handler(data) {
    //     this.$emit("u", data);
    //   },
    // },
  },
  created() {
    this.getSchoolsList();
  },
  methods: {
    async getSchoolsList() {
      try {
        let schools = await this.$api.school.listSchools();
        if (schools && schools.data && schools.data.length > 0) {
          this.schoolItems = schools.data
        }
        
      } catch (error) {
        console.log('e', error);
      }
    },
    manage(id) {
      this.$router.push(`/schools/${id}/manages`);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
