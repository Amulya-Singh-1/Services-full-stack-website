const mongoose=require('mongoose');
const validator=require('validator');

const consultschema=mongoose.Schema({
    fullname:{
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
    problem:{
        type:String,
        required:true,
        min:10,
    },
    mediatype:{
        required:true,
        type:String
    }
});

const consultmodel=mongoose.model("consultmodel", consultschema);

module.exports=consultmodel;