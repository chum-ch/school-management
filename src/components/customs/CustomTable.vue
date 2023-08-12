<template>
  <div>
    <div class="action flex justify-content-between flex-wrap mx-3">
      <div class="flex justify-content-start flex-wrap">
        <custom-button
          :label="'Add'"
          class="mt-3 me-3"
          @onClick="($event) => $emit('onClickCreate', $event)"
        />
        <custom-button
          :label="'Edit'"
          class="mt-3 me-3"
          @onClick="($event) => $emit('onClickEdit', $event)"
          :outlined="true"
          :disabled="disabledDetails"
        />
        <custom-button
          :label="'Delete'"
          class="mt-3 me-3"
          @onClick="($event) => $emit('onClickDelete', selection)"
          :danger="true"
          :outlined="true"
          :disabled="disabledDelete"
        />
        <custom-button
          :label="'More'"
          class="mt-3 me-3"
          @onClick="($event) => $emit('onClickDetails', selection)"
          :warning="true"
          :outlined="true"
          :disabled="disabledDetails"
        />
      </div>
      <custom-input-text
        v-model="filters['global'].value"
        placeholder="Search ..."
        :show_icon="true"
        :left_icon="true"
        :search_icon="true"
      />
    </div>
    <div class="m-1">
      <!-- showGridlines -->
      <DataTable
        :value="table_data"
        scrollable
        scrollHeight="450px"
        class="p-datatable-sm"
        tableStyle="min-width: 50rem"
        :rowHover="true"
        :resizableColumns="true"
        :dataKey="data_key"
        @row-select="selectedRow"
        @row-unselect="unSelectedRow"
        @row-select-all="selectedAllRows"
        @row-unselect-all="unSelectedAllRows"
        paginator
        :rows="9"
        :rowsPerPageOptions="[9, 50, 100]"
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="Showing from {first} to {last} of {totalRecords}"
        :globalFilterFields="globalFilterFields"
        v-model:selection="selection"
        v-model:filters="filters"
      >
        <template #empty>
          <div v-if="table_data.length !== 0">
            The
            <span class="text-danger fw-bolder"> {{ filters["global"].value }}</span> is
            not found! 🥺
          </div>
        </template>
        <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
        <template v-for="(item, index) in columns" :key="index">
          <Column
            :field="item.field"
            :header="item.header"
            headerStyle="width: 3rem"
            v-if="item.field === 'ProfileURL'"
          >
            <template #body="{ data }">
              <img
                :src="
                  data.ProfileURL
                    ? data.ProfileURL
                    : 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png'
                "
                alt=""
                class="`flag rounded-circle"
                style="width: 30px"
              />
            </template>
          </Column>
          <Column
            :field="item.field"
            :header="item.header"
            headerStyle="width: 3rem"
            v-else
          >
          </Column>
        </template>
      </DataTable>
    </div>
  </div>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { FilterMatchMode } from "primevue/api";
// import ColumnGroup from 'primevue/columngroup';   // optional
// import Row from 'primevue/row';                   // optional

export default {
  data() {
    return {
      // Table
      selection: [],
      filters: null,
      globalFilterFields: [null],
      // Button
      disabledDelete: true,
      disabledDetails: true,
    };
  },
  name: "CustomTable",
  components: {
    DataTable,
    Column,
    // ColumnGroup,
    // Row
  },
  errorCaptured(error, vm, info) {
    console.error("Error", error, vm, info);
    return true; // Return true to continue propagating the error
  },
  props: {
    msg: String,
    table_data: Array,
    columns: Array,
    data_key: String,
  },
  emits: [
    "selected-row-data",
    "onClickCreate",
    "onClickDelete",
    "onClickDetails",
    "onClickEdit",
  ],
  watch: {
    selection: {
      immediate: true,
      handler(data) {
        if (data.length > 0) {
          this.disabledDelete = false;
          if (data.length > 1) {
            this.disabledDetails = true;
          } else {
            this.disabledDetails = false;
          }
        } else {
          this.disabledDelete = true;
          this.disabledDetails = true;
        }
      },
    },
  },
  created() {
    if (this.columns) {
      this.columns.forEach((element) => {
        this.globalFilterFields.push(element.field);
      });
    }
    this.initFilters();
  },
  methods: {
    selectedRow() {
      this.emitSelectedRowData("selectRow");
    },
    unSelectedRow() {
      // this.selectedRowData = this.selectedRowData.filter(item => item.index !== event.index);
      this.emitSelectedRowData("unSelectRow");
    },
    unSelectedAllRows() {
      this.disabledDetails = true;
      this.disabledDelete = true;
      this.selection = [];
      this.emitSelectedRowData("unSelectAllRow");
    },
    selectedAllRows(event) {
      this.selection = event.data;
      this.emitSelectedRowData("selectAllRow");
    },

    emitSelectedRowData(checked) {
      if (
        checked === "selectRow" ||
        checked === "unSelectRow" ||
        checked === "selectAllRow"
      ) {
        this.$emit("selected-row-data", this.selection);
      } else {
        this.$emit("selected-row-data", []);
      }
    },
    initFilters() {
      this.filters = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      };
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
/* h3 {
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
} */
</style>
