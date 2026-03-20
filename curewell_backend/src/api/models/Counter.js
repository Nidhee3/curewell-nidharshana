const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
    _id:  { type: String, required: true },
    seq:  { type: Number, default: 0 }
});
//creates if it doesnt already exist or uses the one which is already there
const Counter = mongoose.models.Counter || mongoose.model("Counter", counterSchema);
module.exports = Counter;
