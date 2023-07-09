import StudentsList from "./StudentsList.vue";
import StudentsDetails from "./StudentDetails.vue";

const routes = [
  {
    path: "/schools/:schoolId/students",
    name: "students",
    component: StudentsList,
  },
  {
    path: "/schools/:schoolId/students/:studentId",
    name: "students-details",
    component: StudentsDetails,
  },
];

export default routes;
