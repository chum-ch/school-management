import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import API from './api/api'
import  utils  from './utils/utils'
// PrimeVue
import PrimeVue from 'primevue/config';
import 'primeflex/primeflex.css'
//theme
// import "primevue/resources/themes/lara-light-indigo/theme.css";  
import "primevue/resources/themes/lara-light-blue/theme.css"
// import "./assets/theme.css";     
//core
import "primevue/resources/primevue.min.css";

//icons
import "primeicons/primeicons.css";
// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Component primevue
import TabMenu from 'primevue/tabmenu';
import ToastService from 'primevue/toastservice';
import Divider from 'primevue/divider';
import Avatar from 'primevue/avatar';
import Breadcrumb from 'primevue/breadcrumb';
import Sidebar from 'primevue/sidebar';
import ScrollPanel from 'primevue/scrollpanel';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Splitter from 'primevue/splitter';
import SplitterPanel from 'primevue/splitterpanel';
import FileUpload from 'primevue/fileupload';

// Custom component
import NavigationView from "./views/NavigationView.vue";
import CustomInputText from './components/customs/CustomInputText.vue';
import CustomPassword from './components/customs/CustomPassword.vue';
import CustomButton from './components/customs/CustomButton.vue';
import CustomTable from './components/customs/CustomTable.vue';
import CustomDialog from './components/customs/CustomDialog.vue';
import CustomViewInfo from './components/customs/CustomViewInfo.vue';
import CustomDetails from './components/customs/CustomDetails.vue';
import CustomFullCalendar from './components/customs/CustomFullCalendar.vue';
import CustomCalendar from './components/customs/CustomCalendar.vue';
import CustomInputMask from './components/customs/CustomInputMask.vue';
import CustomDropdown from './components/customs/CustomDropdown.vue';
import CustomRadioButton from './components/customs/CustomRadioButton.vue';
import CustomTab from './components/customs/CustomTab.vue';
import CustomPeopleProfile from './components/customs/CustomPeopleProfile.vue';
import PeopleProfile from './components/customs/PeopleProfile.vue';
import CustomCropImg from './components/customs/CustomCropImg.vue';
const app = createApp(App);
// Config Axios 
// const axiosInstance = axios.create({
//     baseURL: process.env.VUE_APP_BACKEND_URL,
//     withCredentials: true,
//     headers: {
//         'Content-Type': 'application/json'
//     }
// })
// app.config.globalProperties.$axios = axiosInstance
axios.defaults.baseURL = process.env.VUE_APP_BACKEND_URL
app.config.globalProperties.$http = axios;
app.config.globalProperties.$api = API(axios);
// Set global function
app.config.globalProperties.$globalFunction = utils


// Register component
// Primevue
app.component('tab-menu-primevue', TabMenu);
app.component('divider-primevue', Divider);
app.component('avatar-primevue', Avatar);
app.component('breadcrumb-primevue', Breadcrumb);
app.component('sidebar-primevue', Sidebar);
app.component('scrollpanel-primevue', ScrollPanel);
app.component('tab-view-primevue', TabView);
app.component('tab-panel-primevue', TabPanel);
app.component('splitter-primevue', Splitter);
app.component('file-upload-primevue', FileUpload);
app.component('splitter-panel-primevue', SplitterPanel);

// Custom
app.component('custom-navigation', NavigationView);
app.component('custom-button', CustomButton);
app.component('custom-input-text', CustomInputText);
app.component('custom-input-password', CustomPassword);
app.component('custom-table', CustomTable);
app.component('custom-dialog', CustomDialog);
app.component('custom-view-info', CustomViewInfo);
app.component('custom-details', CustomDetails);
app.component('custom-full-calendar', CustomFullCalendar);
app.component('custom-calendar', CustomCalendar);
app.component('custom-input-mask', CustomInputMask);
app.component('custom-dropdown', CustomDropdown);
app.component('custom-radio-button', CustomRadioButton);
app.component('custom-tab', CustomTab);
app.component('custom-people-profile', CustomPeopleProfile);
app.component('custom-profile', PeopleProfile);
app.component('custom-crop-img', CustomCropImg);

const vuetify = createVuetify({
  components,
  directives,
})
app.use(vuetify);
app.use(PrimeVue);
app.use(ToastService);
app.use(router).mount('#app')
