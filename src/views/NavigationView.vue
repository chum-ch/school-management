<template>
  <div class="sticky top-0 z-5 blur">
    <div class="d-flex justify-content-between align-items-center mx-3">
      <h4>SMS</h4>
      <!-- <marquee width="60%" direction="left" height="" class=""
        >ប្រព័ន្ធគ្រប់គ្រងសាលារៀន សូមស្វាគមន៏!</marquee
      > -->
      <div class="image d-flex justify-content-center flex-wrap">
        <img
          src="../assets/img/school-1.png"
          alt=""
          srcset=""
          width="50"
          class="cursor-pointer"
          @click="($event) => (visible = true)"
        />
      </div>
    </div>
    <breadcrumb-primevue :home="home" :model="breadCrumb" class="m-0" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      home: {
        icon: "pi pi-home",
        to: "/",
      },
      breadCrumbs: this.breadCrumb,
      // breadCrumb: [
      //   { label: "Login", to: "/login" },
      //   { label: "Notebook" },
      //   { label: "Accessories" },
      //   { label: "Backpacks" },
      //   { label: "Item" },
      // ],
    };
  },
  updated() {
   
  },
  props: {
    breadCrumb: Array,
  },
  watch: {},
  emits: ["updatedBreadCrumb"],
  components: {},
  created() {},
  methods: {},
};
</script>
<style scoped>
.p-breadcrumb {
  padding: 0px 0px 10px 10px;
  border-top: none;
  border-right: none;
  border-left: none;
  background: transparent;
  border-radius: 0;
}
.blur {
  background: #ffffffb2;
  backdrop-filter: blur(5px);
}
</style>
