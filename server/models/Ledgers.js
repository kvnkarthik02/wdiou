const mongoose = require('mongoose');

const ledgerSchema = new mongoose.Schema({
    Name: {type:String, required: true},
    ledgerDescription: {type:String},
    createdBy: {type:mongoose.Schema.Types.ObjectId, ref:'User', required:true}, 
    members: [{
        type:mongoose.Schema.Types.ObjectId, 
        ref:'User', 
        required: true
    }]
}, {timestamps: true});

module.exports = mongoose.model('Ledger', userSchema); 