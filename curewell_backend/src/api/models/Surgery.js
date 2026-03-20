const mongoose = require('mongoose');
const Counter  = require('./Counter');
 
const surgerySchema = new mongoose.Schema({
    surgeryId: {
        type:   Number,
        unique: true
        
    },
    doctor: {
        type:     mongoose.Schema.Types.ObjectId,
        ref:      'Doctor',
        required: [true, 'Doctor is required']
    },
    surgeryDate: {
        type:     Date,
        required: [true, 'Surgery date is required']
    },
    startTime: {
        type:     Number,
        required: [true, 'Start time is required']
    },
    endTime: {
        type:     Number,
        required: [true, 'End time is required']
    },
    surgeryCategory: {
        type:      String,
        trim:      true,
        uppercase: true,
        maxlength: [3, 'Surgery category must be 3 characters']
    }
});
//counter for autonumbering surgeries
surgerySchema.pre('save', async function() {
    if (this.isNew) {
        const counter = await Counter.findByIdAndUpdate(
            "surgery",
            { $inc: { seq: 1 } },
            { returnDocument: 'after', upsert: true }
        );
        this.surgeryId = counter.seq + 4999;
    }
    
});
module.exports = mongoose.model('Surgery', surgerySchema);
