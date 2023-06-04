export default (axios)=>({
    listTrainers(){
        return axios.get(`/trainers`)
    },
    createTrainer(data){
        return axios.post(`/trainers`, data)
    },
    updateTrainer(data, ID){
        return axios.put(`/trainers/${ID}`, data)
    },
    getTrainer(ID){
        return axios.get(`/trainers/${ID}`)
    },
    deleteTrainer(ID){
        return axios.delete(`/trainers/${ID}`)
    }
})