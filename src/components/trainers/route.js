import TrainersList from "./TrainersList.vue";
import TrainerDetails from "./TrainerDetails.vue";

const routes = [
  {
    path: "/trainers",
    name: "trainers",
    component: TrainersList,
  },
  {
    path: "/trainers/:id",
    name: "trainers-details",
    component: TrainerDetails,
  },
];

export default routes;
