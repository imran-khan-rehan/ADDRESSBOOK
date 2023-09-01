const express=require('express');
const mongoose=require('mongoose');

const userschema=new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true,
        
    },
    password:{
        type:String,
        required:true
    }
});
const contactschema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    number:{
        type:Number,
        required:true
    }
})
const user=mongoose.model('user',userschema);
const contacts=mongoose.model('contacts',contactschema);
console.log("in models",user);
module.exports={user,contacts}
