const mongoose = require('mongoose');
 
const specializationSchema = new mongoose.Schema({
    specializationCode: {
        type:      String,
        required:  [true, 'Specialization code is required'],
        unique:    true,
        trim:      true, //helps to remove spaces
        uppercase: true,
        maxlength: [3, 'Specialization code must be 3 characters'],
        minlength: [3, 'Specialization code must be 3 characters']
    },
    specializationName: {
        type:      String,
        required:  [true, 'Specialization name is required'],
        maxlength: [20, 'Specialization name cannot exceed 20 characters'],
        trim:      true
    }
});
 
module.exports = mongoose.model('Specialization', specializationSchema);
