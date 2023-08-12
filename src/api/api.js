
// // Config default api and accept header

import schools from "./school-api/schools";
import rooms from "./school-api/rooms";
import classes from "./school-api/classes";
import schedules from "./school-api/schedules";
import trainers from "./school-api/trainers";
import students from "./school-api/students";
import courses from "./school-api/courses";
import generations from "./school-api/generations";

// export default axios.create({
//     baseURL: process.env.VUE_APP_BACKEND_URL,
//     headers: {
//       "Content-type": "application/json"
//     }
//   });
export default axios => ({
  school: schools(axios),
  classApi: classes(axios),
  room: rooms(axios),
  schedule: schedules(axios),
  trainer: trainers(axios),
  student: students(axios),
  course: courses(axios),
  generation: generations(axios),
  
});

