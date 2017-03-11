const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userId:Number,
    hotelIds:[String]
}, { minimize: false });

const ModelClass = mongoose.model('user', userSchema);
module.exports = ModelClass;