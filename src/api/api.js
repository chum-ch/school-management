
// // Config default api and accept header

import rooms from "./school-api/rooms";
import schools from "./school-api/schools";
import students from "./school-api/students";
import trainers from "./school-api/trainers";

// export default axios.create({
//     baseURL: process.env.VUE_APP_BACKEND_URL,
//     headers: {
//       "Content-type": "application/json"
//     }
//   });


export default axios => ({
  school: schools(axios),
  student: students(axios),
  trainer: trainers(axios),
  room: rooms(axios),
  
});

