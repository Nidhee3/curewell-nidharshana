const Doctor                = require('../models/Doctor');
const Specialization        = require('../models/Specialization');
const DoctorSpecialization  = require('../models/DoctorSpecialization');
const Surgery               = require('../models/Surgery');

//get all doctors
exports.getDoctors = async (req, res) => {
    const doctors = await Doctor.find();
    res.status(200).json({
        error:   false,
        message: 'Doctors retrieved successfully',
        data:    doctors
    });
};

//add a new doctor
exports.addDoctor = async (req, res) => {
    const { doctorName } = req.body;
    const doctor = new Doctor({ doctorName });
    await doctor.save();
    res.status(201).json({
        error:   false,
        message: 'Doctor added successfully',
        data:    true
    });
};

//update a doctor's details
exports.updateDoctorDetails = async (req, res) => {
    const { doctorName } = req.body;
    const doctor = await Doctor.findOneAndUpdate(
        { doctorId: req.params.doctorId },
        { doctorName },
        { new: true }
    );
    if (!doctor) {
        return res.status(404).json({
            error:   true,
            message: 'Doctor not found',
            data:    false
        });
    }
    res.status(200).json({
        error:   false,
        message: 'Doctor updated successfully',
        data:    true
    });
};
//delete a doctor
exports.deleteDoctor = async (req, res) => {
    const doctor = await Doctor.findOneAndDelete({ doctorId: req.params.doctorId });
    if (!doctor) {
        return res.status(404).json({
            error:   true,
            message: 'Doctor not found',
            data:    false
        });
    }
    res.status(200).json({
        error:   false,
        message: 'Doctor deleted successfully',
        data:    true
    });
};

//get all specializations
exports.getSpecializations = async (req, res) => {
    const specializations = await Specialization.find();
    res.status(200).json({
        error:   false,
        message: 'Specializations retrieved successfully',
        data:    specializations
    });
};

//add a specialization 
exports.addSpecialization = async (req, res) => {
    const { specializationCode, specializationName } = req.body;
    const specialization = new Specialization({
        specializationCode,
        specializationName
    });
    await specialization.save();
    res.status(201).json({
        error:   false,
        message: 'Specialization added successfully',
        data:    true
    });
};

//get doctors by specialization
exports.getDoctorsBySpecialization = async (req, res) => {
    const records = await DoctorSpecialization.find({
        specializationCode: req.params.code.toUpperCase()
    }).populate('doctor');
    const doctors = records.map(record => record.doctor);
    res.status(200).json({
        error:   false,
        message: 'Doctors retrieved successfully',
        data:    doctors
    });
};

//add a doctor's specialization
exports.addDoctorSpecialization = async (req, res) => {
    const { doctorId, specializationCode, specializationDate } = req.body;

    const doctor = await Doctor.findOne({ doctorId: doctorId });
    if (!doctor) {
        return res.status(404).json({
            error:   true,
            message: 'Doctor not found',
            data:    false
        });
    }

    const record = new DoctorSpecialization({
        doctor:             doctor._id,
        specializationCode: specializationCode,
        specializationDate: specializationDate
    });
    await record.save();
    res.status(201).json({
        error:   false,
        message: 'Doctor specialization added successfully',
        data:    true
    });
};

//get all surgeries for today
exports.getAllSurgeryTypeForToday = async (req, res) => {
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfDay   = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    const surgeries = await Surgery.find({
        surgeryDate: { $gte: startOfDay, $lt: endOfDay }
    }).populate('doctor', 'doctorId doctorName');
    res.status(200).json({
        error:   false,
        message: "Today's surgeries retrieved successfully",
        data:    surgeries
    });
};

//add a surgery
exports.addSurgery = async (req, res) => {
    const { doctorId, surgeryDate, startTime, endTime, surgeryCategory } = req.body;
    const doctor = await Doctor.findOne({ doctorId: doctorId });
    if (!doctor) {
        return res.status(404).json({
            error:   true,
            message: 'Doctor not found',
            data:    false
        });
    }

    const surgery = new Surgery({
        doctor:          doctor._id,
        surgeryDate:     surgeryDate,
        startTime:       startTime,
        endTime:         endTime,
        surgeryCategory: surgeryCategory
    });
    await surgery.save();
    res.status(201).json({
        error:   false,
        message: 'Surgery added successfully',
        data:    true
    });
};

//update a surgery
exports.updateSurgery = async (req, res) => {
    const { startTime, endTime } = req.body;
    const surgery = await Surgery.findOneAndUpdate(
        { surgeryId: req.params.surgeryId },
        { startTime, endTime },
        { new: true }
    );
    if (!surgery) {
        return res.status(404).json({
            error:   true,
            message: 'Surgery not found',
            data:    false
        });
    }
    res.status(200).json({
        error:   false,
        message: 'Surgery updated successfully',
        data:    true
    });
};