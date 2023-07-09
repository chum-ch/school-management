export default (axios)=>({
    listStudents(schoolId){
        return axios.get(`schools/${schoolId}/students`)
    },
    createStudent(schoolId, data){
        return axios.post(`schools/${schoolId}/students`, data)
    },
    updateStudent(schoolId, data, ID){
        return axios.put(`schools/${schoolId}/students/${ID}`, data)
    },
    getStudent(schoolId, ID){
        return axios.get(`schools/${schoolId}/students/${ID}`)
    },
    deleteStudent(schoolId, ID){
        return axios.delete(`schools/${schoolId}/students/${ID}`)
    }
})