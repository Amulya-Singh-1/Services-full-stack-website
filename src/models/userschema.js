const mongoose=require('mongoose');
const validator=require('validator');

const Uschema=mongoose.Schema({
    name:{
        required:true,
        minLength:4,
        type:String
    },
    email:{
        required:true,
        type:String,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("invalid email");
            }
        }
    },
    phone:{
        type:Number,
        required:true,
        min:10,
    },
    message:{
        required:true,
        minlength:4,
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    }
});

const Umodel=mongoose.model("Umodel", Uschema);

module.exports=Umodel;