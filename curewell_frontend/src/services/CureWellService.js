import axios from "axios";
const BASE_URL = "http://localhost:5000/api";
//handling errors
const errorHandler = (error)=>{
    console.log(error);
    return null;
}

//get the list of doctors
const getDoctors = () => {
    return axios.get(`${BASE_URL}/doctors`)
        .then(response => response.data)
        .catch(errorHandler);
};

//get the list of specializations
const getAllSpecializations = () => {
    return axios.get(`${BASE_URL}/specializations`)
        .then(response => response.data)
        .catch(errorHandler);
};

//get all surgeries for today
const getSurgeriesForToday = () => {
    return axios.get(`${BASE_URL}/surgeries/today`)
        .then(response => response.data)
        .catch(errorHandler);
};

//add a new doctor
const addDoctor = (doctorData) => {
    return axios.post(`${BASE_URL}/doctors`, doctorData)
        .then(response => response.data)
        .catch(errorHandler);
};

//edit a doctor's detail
const editDoctorDetails = (doctorId, doctorData) => {
    return axios.put(`${BASE_URL}/doctors/${doctorId}`, doctorData)
        .then(response => response.data)
        .catch(errorHandler);
};

//delete a doctor
const deleteDoctor = (doctorId) => {
    return axios.delete(`${BASE_URL}/doctors/${doctorId}`)
        .then(response => response.data)
        .catch(errorHandler);
};

//edit a surgery's details
const editSurgery = (surgeryId, surgeryData) => {
    return axios.put(`${BASE_URL}/surgeries/${surgeryId}`, surgeryData)
        .then(response => response.data)
        .catch(errorHandler);
};

//get all doctors in a specialization
const getDoctorsBySpecialization = (code) => {
    return axios.get(`${BASE_URL}/specializations/${code}/doctors`)
        .then(response => response.data)
        .catch(errorHandler);
};

const CureWellService = {
    getDoctors,
    getAllSpecializations,
    getSurgeriesForToday,
    addDoctor,
    editDoctorDetails,
    deleteDoctor,
    editSurgery,
    getDoctorsBySpecialization,
    errorHandler
};
export default CureWellService;
