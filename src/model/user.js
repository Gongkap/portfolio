const mongoose =require('mongoose');
const UserSchema =new mongoose.Schema({
        name:{
            type:String,
            require:true
        },
        email:{
            type:String,
            require:true,
            unique:true
        },
        message:{
            type:String,
            require:true
            
        }
})
const registerSchema = new mongoose.Schema({

    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    phone:{
        type:Number,
        require:true
    },
    password:{
        type:String,
        require:true

    },
    cPasword:{
        type:String,
        require:true
    }
})

const UserData=new mongoose.model('UserData',UserSchema);
const registerData=new mongoose.model('registerData',registerSchema);
module.exports ={
    collection1 : UserData,
    collection2 :registerData
}