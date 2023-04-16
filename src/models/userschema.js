const mongoose = require('mongoose');
const Schema= mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    fn:{
        minLength:3,
        type:String
    },
    ln:{
        minLength:4,
        type:String
    },
    city:{
        minLength:4,
        type:String
    },
    state:{
        minLength:2,
        type:String
    },
    email:{
        type:String,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("invalid email");
            }
        }
    }
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
