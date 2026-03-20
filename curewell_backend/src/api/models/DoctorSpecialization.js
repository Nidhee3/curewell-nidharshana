const mongoose = require('mongoose');
 
const doctorSpecializationSchema = new mongoose.Schema({
    doctor: {
        type:     mongoose.Schema.Types.ObjectId,
        ref:      'Doctor',
        required: true
    },
    specializationCode: {
        type:      String,
        required:  [true, 'Specialization code is required'],
        trim:      true,
        uppercase: true
    },
    specializationDate: {
        type:     Date,
        required: [true, 'Specialization date is required']
    }
});
doctorSpecializationSchema.index(
    { doctor: 1, specializationCode: 1 },
    { unique: true }
);
module.exports = mongoose.model('DoctorSpecialization', doctorSpecializationSchema);
