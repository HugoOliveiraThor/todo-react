const restful = require('node-restful')
const mongoose = restful.mongoose

const todoSchema = mongoose.Schema({
    description: {type:String, required:true},
    done: {type:Boolean, required:true, default:false}
})