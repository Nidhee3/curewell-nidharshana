const mongoose = require('mongoose');
const Counter  = require('./Counter');
 
const doctorSchema = new mongoose.Schema({
    doctorId: {
        type:   Number,
        unique: true
    },
    doctorName: {
        type:      String,
        required:  [true, 'Doctor name is required'],
        maxlength: [25, 'Doctor name cannot exceed 25 characters'],
        trim:      true
    }
});
//counter for auto numbering doctors
doctorSchema.pre('save', async function() {
    if (this.isNew) {
        const counter = await Counter.findByIdAndUpdate(
            'doctor',
            { $inc: { seq: 1 } },
            { returnDocument: 'after', upsert: true }
        );
        this.doctorId = counter.seq + 1000;
    }
});
module.exports = mongoose.model('Doctor', doctorSchema);
