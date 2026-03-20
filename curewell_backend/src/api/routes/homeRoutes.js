const express = require('express');
const router  = express.Router();

const {
    getDoctors,
    addDoctor,
    updateDoctorDetails,
    deleteDoctor,
    getSpecializations,
    addSpecialization,
    getDoctorsBySpecialization,
    addDoctorSpecialization,
    getAllSurgeryTypeForToday,
    addSurgery,
    updateSurgery
} = require('../controllers/homeController');


// Doctor routes
router.route('/doctors')
    .get(getDoctors)
    .post(addDoctor);

router.route('/doctors/:doctorId')
    .put(updateDoctorDetails)
    .delete(deleteDoctor);

// Specialization routes
router.route('/specializations')
    .get(getSpecializations)
    .post(addSpecialization);

router.route('/specializations/:code/doctors')
    .get(getDoctorsBySpecialization);

// DoctorSpecialization routes
router.route('/doctorspecializations')
    .post(addDoctorSpecialization);

// Surgery routes
router.route('/surgeries')
    .post(addSurgery);

router.route('/surgeries/today')
    .get(getAllSurgeryTypeForToday);

router.route('/surgeries/:surgeryId')
    .put(updateSurgery);

module.exports = router;
