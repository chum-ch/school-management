<template>
  <div class="mt-5">
    <div
      class="checkboxQA"
      v-for="(item, index) in dataCheckBox" :key="index"
      @mouseover="showIcon[index] = true"
      @mouseleave="showIcon[index] = false"
    >
      <div class="flex">
        <checkbox-primevue />
        <custom-input-text
          v-model="checkBoxValue"
          :styleCustomInput="true"
          :hideLabel="true"
          :placeholder="item.Placeholder"
          class="ms-1"
          @input="onTextInput(index)"
        />
        <div class="action" v-show="showIcon[index]">
          <i class="pi pi-check text-success"></i>
          <i class="pi pi-trash text-danger" @click="removeField(item)"></i>
        </div>
      </div>
    </div>
    <custom-button @click="addCheckbox" :label="'Add Checkbox'"></custom-button>
    <custom-button :label="'Submit'" @click="submit"></custom-button>
    <p v-for="(item, index) in items" :key="index">
    {{ item.Value }}
    </p>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      items: [],
      showIcon: [],
      checkBoxValue: "",
      style: {
        borderTop: "none",
        borderBottom: "2px solid #007bff",
        borderLeft: "none",
        borderRight: "none",
        outline: "none",
      },
      dataCheckBox: [], // Array to store checkbox values and v-model bindings
    };
  },
  watch: {
    dataCheckBox: {
      immediate: true,
      handler(data) {
        // this.dataCheckBox = data
        console.log('check', data);
      },
    },
    },
  methods: {
    submit() {
      console.log("v", this.dataCheckBox);
    },
    addCheckbox() {
      this.checkBoxValue = "";
      this.dataCheckBox.push({ Value: "", Placeholder: "Answer" }); // Add a new checkbox with its v-model binding
    },
    removeField(item) {
      // let items = [];
      // for(let data of this.dataCheckBox) {
      //   if (data.Value !== item.Value) {
      //     console.log(data);
      //     // this.dataCheckBox.push(data)
      //   }
      // }

      // const data = localStorage.getItem('checkbox');
      // if (data) {
      //   const dataCheckBox = JSON.parse(data);
      //   localStorage.setItem('checkbox', JSON.stringify(dataCheckBox));

      // }
      // console.log('d', item);
      this.dataCheckBox = this.dataCheckBox.filter(obj => obj.Value !== item.Value);
      // this.dataCheckBox.map(objCheck=>{
      //   this.checkBoxValue = objCheck.Value
      // })
      // this.items = this.dataCheckBox
      // this.dataCheckBox = [...this.dataCheckBox]
      // console.log('check', this.dataCheckBox);
      // this.dataCheckBox.splice(indexDelete, 1);
      // this.dataCheckBox = [ {Value:'dddd', Placeholder:'AA'}]
      // console.log('check', this.dataCheckBox);
      // this.dataCheckBox  = []
    },
    onTextInput(indexInput) {
      for (let index = 0; index < this.dataCheckBox.length; index += 1) {
        const element = this.dataCheckBox[index];
        if (indexInput === index) {
          element.Value = this.checkBoxValue;
        }
      }
      // localStorage.setItem('checkbox', JSON.stringify(this.dataCheckBox));
      // const data = localStorage.getItem('checkbox');
      // if (data) {
      //   this.dataCheckBox = JSON.parse(data);
      // }
    },
    // saveData(item) {
    // },
    // retrieveData(item) {
    // }
  },
};
</script>
<style scoped></style>
