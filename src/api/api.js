
// // Config default api and accept header

// export default axios.create({
//     baseURL: process.env.VUE_APP_BACKEND_URL,
//     headers: {
//       "Content-type": "application/json"
//     }
//   });

import School from './school-api/index'
export default axios => ({
  school: School(axios),
});

