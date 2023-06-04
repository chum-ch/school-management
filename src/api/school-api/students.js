export default (axios)=>({
    listStudents(){
        return axios.get(`/students`)
    },
    createStudent(data){
        return axios.post(`/students`, data)
    },
    updateStudent(data, ID){
        return axios.put(`/students/${ID}`, data)
    },
    getStudent(ID){
        return axios.get(`/students/${ID}`)
    },
    deleteStudent(ID){
        return axios.delete(`/students/${ID}`)
    }
})