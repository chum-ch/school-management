<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div class="">
      <DataTable
        :value="customers"
        scrollable
        scrollHeight="500px"
        style="min-width: 50rem"
        v-model:selection="selectedProduct"
        dataKey="id" tableStyle="min-width: 50rem"
        paginator
        :rows="10"
        :options="{ label: 'Small', value: 'small', class: 'sm' }"
      >
      <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
        <Column field="name" header="Name"></Column>
        <Column
          field="country.name"
          header="Country"
        ></Column>
        <Column
          field="representative.name"
          header="Representative"
        ></Column>
        <Column field="company" header="Company"></Column>
      </DataTable>
    </div>


  </div>
</template>

<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
// import ColumnGroup from 'primevue/columngroup';   // optional
// import Row from 'primevue/row';                   // optional

export default {
  name: "CustomTable",
  props: {
    msg: String,
    placeholder: String,
    is_required: Boolean,
    label: String,
    message_error: String,
    user_icon: Boolean,
    search_icon: Boolean,
    spinner_icon: Boolean,
    has_icon: Boolean,
    right_icon: Boolean,
    // sm_size: Boolean,
    // lg_size: Boolean,
    is_disabled: Boolean,
    border: String,
    value: String,
    modelValue: String,
  },
  data() {
    return {
      selectedProduct:[],
      values: "",
      customers: [
       
       {
        id:"111",
         name: 'Hello',
         representative: { name: "hello" },
         country: { name: "Hello" },
         company:'Hello'
       },
       {
        id:"22",
         name: 'Hello',
         representative: { name: "hello" },
         country: { name: "Hello" },
         company:'Hello'
       },
       
     ],
    };
  },
  created() {
    this.values = this.modelValue;
  },
  components: {
    DataTable,
    Column,
    // ColumnGroup,
    // Row
  },
  emits: ["update:modelValue"],
  watch: {
    values: {
      immediate: true,
      handler(data) {
        this.$emit("update:modelValue", data);
      },
    },
  },
  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
