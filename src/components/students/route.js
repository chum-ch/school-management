import StudentsList from "./StudentsList.vue";
import StudentsDetails from "./StudentDetails.vue";
const routes = [

  {
    path: "/schools/:schoolId/generations/:generationId/students",
    name: "students",
    component: StudentsList,
  },
  {
    path: "/schools/:schoolId/generations/:generationId/students/:studentId",
    name: "students-details",
    component: StudentsDetails,
  },
];

export default routes;
