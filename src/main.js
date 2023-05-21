import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
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
// Component primevue
import ToastService from 'primevue/toastservice';
import Divider from 'primevue/divider';
import Avatar from 'primevue/avatar';
import Breadcrumb from 'primevue/breadcrumb';
import Sidebar from 'primevue/sidebar';
import ScrollPanel from 'primevue/scrollpanel';


// Custom component
import NavigationView from "./views/NavigationView.vue";
import CustomInputText from './components/customs/CustomInputText.vue';
import CustomPassword from './components/customs/CustomPassword.vue';
import CustomButton from './components/customs/CustomButton.vue';
import CustomTable from './components/customs/CustomTable.vue';
const app = createApp(App);
app.component('divider-primevue', Divider);
app.component('avatar-primevue', Avatar);
app.component('breadcrumb-primevue', Breadcrumb);
app.component('sidebar-primevue', Sidebar);
app.component('scrollpanel-primevue', ScrollPanel);

app.component('custom-navigation', NavigationView);
app.component('custom-button', CustomButton);
app.component('custom-input-text', CustomInputText);
app.component('custom-input-password', CustomPassword);
app.component('custom-table', CustomTable);
app.use(PrimeVue);
app.use(ToastService);
app.use(router).mount('#app')
