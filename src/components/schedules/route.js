import ScheduleList from "./ScheduleList.vue";
import ScheduleDetails from "./ScheduleDetails.vue";

const routes = [
  {
    path: "/schedules",
    name: "schedules",
    component: ScheduleList,
  },
  {
    path: "/schedules/:id",
    name: "schedules-details",
    component: ScheduleDetails,
  },
];

export default routes;
