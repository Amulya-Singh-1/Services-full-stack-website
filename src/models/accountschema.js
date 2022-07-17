const mongoose=require('mongoose');
const validator=require('validator');
const accountschema=mongoose.Schema({
    fn:{
        required:true,
        minLength:3,
        type:String
    },
    ln:{
        required:true,
        minLength:4,
        type:String
    },
    city:{
        required:true,
        minLength:4,
        type:String
    },
    state:{
        required:true,
        minLength:2,
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
    username:{
        type:String,
        required:true,
        min:10,
    },
    password:{
        minLength:8,
        required:true,
        type:String
    }
});

const accountmodel=mongoose.model("accountmodel" , accountschema);

module.exports=accountmodel;