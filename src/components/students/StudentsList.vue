<template>
  <div>
    <custom-navigation :breadCrumb="breadCrumb" />
    <custom-table/>
  
  </div>
</template>
<script>
import axios from '../../api/index.js'
export default {
  data() {
    return {
      breadCrumb: [{ label: "Students", to: "/students" }],
    };
  },
  props:[],
  emits:[],
  watch:{
  },
  created() {
    axios.get('/students')
          .then(res=>{
            console.log("dfdf",res.data);
          })
  },

  methods: {
  },
  
};
</script>
<style lang=""></style>
