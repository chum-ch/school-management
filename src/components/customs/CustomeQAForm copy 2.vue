<template>
  <div>
    <div class="add-qa">
      <custom-button
        @click="
          addCheckbox({
            Type: 'Checkbox',
            Text: 'Question?',
            Points: '5',
            UserAnswer: [],
            Options: [],
          })
        "
        :label="'Add QA Checkbox'"
      />
    </div>
    <div
      class="my-2"
      v-for="(itemQuestion, indexQuestion) in schemaExam.Questions"
      :key="indexQuestion"
    >
      <div class="qa-form card w-6 mx-auto p-2">
        <custom-input-text
          :hideLabel="true"
          v-model="itemQuestion.Text"
          :modelValue="itemQuestion.Text"
          @input="onTextInput(itemQuestion.Text)"
          :style="{
            padding: '9px',
            borderBottom: '2px solid var( --primary-500)',
            borderTop: 'none',
            borderRight: 'none',
            borderLeft: 'none',
          }"
          :placeholder="'Question ?'"
        />

        <div
          class="checkboxQA"
          v-for="(itemCheckBox, indexCheckBox) in itemQuestion.Options"
          :key="indexCheckBox"
          @mouseover="showIcon[indexCheckBox] = true"
          @mouseleave="showIcon[indexCheckBox] = false"
        >
          <div
            class="flex justify-content-between p-1"
            :style="itemCheckBox.IsCorrect ? style : ''"
          >
            <div class="checkbox-qa">
              <checkbox-primevue
                v-model="checkBoxItem"
                :inputId="itemCheckBox.Text"
                :name="itemCheckBox.Text"
                :value="itemCheckBox"
                :disabled="true"
                :class="!itemCheckBox.IsCorrect ? 'ms-1' : ''"
              />
              <label :for="itemCheckBox.Text" class="ml-2">
                {{ itemCheckBox.Text }}
              </label>
            </div>
            <div class="action" v-show="showIcon[indexCheckBox]">
              <!-- <i class="pi pi-check text-success mx-2"></i> -->
              <i class="pi pi-pencil mx-2" @click="getValueEditField(indexQuestion, indexCheckBox, itemCheckBox.Text)"></i>
              <i
                class="pi pi-trash text-danger mx-2"
                @click="removeField(indexQuestion, indexCheckBox)"
              ></i>
            </div>
          </div>
        </div>
        <div class="add-checkbox flex mx-1">
          <custom-input-text
            :hideLabel="true"
            v-model="itemQuestion.OptionText"
            :modelValue="itemQuestion.OptionText"
            @input="onTextInput(itemQuestion, indexQuestion, itemQuestion.OptionText)"
            :style="{ padding: '9px', margin: '5px' }"
            :placeholder="'Add option'"
          />
          <div class="add-edit mx-3">
            <custom-button
              @click="saveEditField(indexQuestion, itemQuestion.OptionText)"
              :label="'Edit'"
              v-if="indexCheckBoxEdit || indexCheckBoxEdit === 0"
            />
            <custom-button
              @click="addCheckbox(itemQuestion, indexQuestion, itemQuestion.OptionText)"
              :label="'Add'"
              v-else
            />
          </div>
        </div>
        <divider-primevue />

        <!-- <custom-button :label="'Submit'" @click="submit" class="" /> -->
      </div>
      <!-- <div class="result"></div> -->
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      showIcon: [],
      checkBoxItem: [
        {
          Text: "Apple",
          IsCorrect: true,
        },
        {
          Text: "Banana",
          IsCorrect: true,
        },
      ],
      checkBoxValue: "",
      checkBoxQuestion: "",
      indexCheckBoxEdit: null,
      style: {
        backgroundColor: "var( --primary-100)",
        borderTop: "none",
        borderBottom: "none",
        borderLeft: "4px solid var( --primary-500)",
        borderRight: "none",
        outline: "none",
        borderRadius: "4px",
      },
      dataCheckBox: [], // Array to store checkbox values and v-model bindings
      schemaExam: {
        Exam: "OOP",
        Questions: [
          // {
          //   Type: "answer",
          //   Text: "What is the capital of France?",
          //   Points: "5",
          //   CorrectAnswer: "Paris",
          //   UserAnswer: "",
          // },
          {
            Type: "Checkbox",
            Text: "Which of the following are fruits?",
            Points: "5",
            UserAnswer: [],
            OptionText:"",
            Options: [
              {
                Text: "Apple",
                IsCorrect: true,
              },
              {
                Text: "Carrot",
                IsCorrect: false,
              },
              {
                Text: "Banana",
                IsCorrect: true,
              },
              {
                Text: "Potato",
                IsCorrect: false,
              },
            ],
          },
          // {
          //   Type: "option",
          //   Text: "Who painted the Mona Lisa?",
          //   Points: "5",
          //   UserAnswer: {},
          //   Options: [
          //     {
          //       Text: "Leonardo da Vinci",
          //       IsCorrect: true,
          //     },
          //     {
          //       Text: "Pablo Picasso",
          //       IsCorrect: false,
          //     },
          //     {
          //       Text: "Vincent van Gogh",
          //       IsCorrect: false,
          //     },
          //     {
          //       Text: "Michelangelo",
          //       IsCorrect: false,
          //     },
          //   ],
          // },
        ],
      },
    };
  },
  watch: {
    // dataCheckBox: {
    //   immediate: true,
    //   handler(data) {
    //     // this.dataCheckBox = data
    //     console.log("check", data);
    //   },
    // },
  },
  methods: {
    submit() {
      console.log("v", this.dataCheckBox);
    },
    addCheckbox(data, indexQuestion = "", valueCheckBox = "") {
      if ((indexQuestion && valueCheckBox) || indexQuestion === 0) {
        this.schemaExam.Questions[indexQuestion].Options.push({
          Text: valueCheckBox,
          IsCorrect: false,
        });
        this.schemaExam.Questions[indexQuestion].OptionText = ""
      } else {
        this.schemaExam.Questions.push(data);
      }
      // if (value) {
      //   this.dataCheckBox.push({ Value: value, Placeholder: "Answer" }); // Add a new checkbox with its v-model binding
      //   this.setDefaultValue();
      // }
    },
    saveEditField(indexQuestion, valueEdit) {
      this.schemaExam.Questions[indexQuestion].Options[this.indexCheckBoxEdit].Text = valueEdit;
      this.indexCheckBoxEdit = null;
      this.schemaExam.Questions[indexQuestion].OptionText = ""
      this.setDefaultValue();
    },
    getValueEditField(indexQuestion, indexCheckBoxEdit, valueEdit) {
      this.indexCheckBoxEdit = indexCheckBoxEdit;
      this.schemaExam.Questions[indexQuestion].OptionText = valueEdit
      // this.schemaExam.Questions[indexQuestion].Options[indexCheckBoxEdit].Text = valueEdit;
    },
    removeField(indexQuestion, indexCheckBox) {
      this.schemaExam.Questions[indexQuestion].Options.splice(indexCheckBox, 1);
      // this.dataCheckBox = [ {Value:'dddd', Placeholder:'AA'}]
      // console.log('check', this.dataCheckBox);
      // this.dataCheckBox  = []
    },
    onTextInput(value) {
      if (!value) {
        this.setDefaultValue();
      }
    },
    // saveData(item) {
    // },
    // retrieveData(item) {
    // }
    setDefaultValue() {
      this.checkBoxValue = "";
      this.indexCheckBoxEdit = null;
    },
  },
};
</script>
<style scoped></style>
