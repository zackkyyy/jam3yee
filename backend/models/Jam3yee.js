'use strict'
const mongoose = require('mongoose')

var jam3yeeSchema = new mongoose.Schema({
    ownerName: { type: String,ref : 'users', required: true },
    ownerID:{type:String , required :true},
    name : {type:String , require : true},
    participants: { type: Array, required: true },
    monthlyPayment: { type: Number, required: true },
    startDate: { type: Date , required:true},
    endDate : {type:Date  },
    totalAmount: {type: Number}
}, { timestamps: true })
let Jam3yee = mongoose.model('jam3yee', jam3yeeSchema)
module.exports = Jam3yee