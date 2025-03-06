const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
   userid: {
        required: true,
        type: String
    },
    donorid: {
        required: true,
        type: String
    },
    donatedate: {
        required: true,
        type: String
    },
    status: {
        required: true,
        type: String
    }
    
})

module.exports = mongoose.model('Donate', dataSchema)