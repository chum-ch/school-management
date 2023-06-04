import StudentsList from "./StudentsList.vue";
import StudentsDetails from "./StudentDetails.vue";

const routes = [
  {
    path: "/students",
    name: "students",
    component: StudentsList,
  },
  {
    path: "/students/:id",
    name: "students-details",
    component: StudentsDetails,
  },
];

export default routes;
