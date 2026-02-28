const mongoose = require('mongoose');

const ledgerSchema = new mongoose.Schema({
    name: {type:String, required: true},
    ledgerDescription: {type:String},
    createdBy: {type:mongoose.Schema.Types.ObjectId, ref:'User', required:true}, 
    members: [{
        type:mongoose.Schema.Types.ObjectId, 
        ref:'User', 
        required: true
    }],
    transactions: [{
        entryTitle: {type: String, required: true},
        entryDescription: {type:String},
        entryCreatedBy: {type:mongoose.Schema.Types.ObjectId, ref:'User', required: true},
        entrySplitBetween: [{
            users: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
            amount: Number
        }],
        date: Date
    }]
}, {timestamps: true});

module.exports = mongoose.model('Ledger', userSchema); 