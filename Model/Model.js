// Imported

const mongoose = require("mongoose");

// Creating Schema

const Schema = mongoose.Schema;

// Creating Model Schema

const BlogData = Schema({
    Title: { type: String, required: true },
  
    Paragraph: { type: String, required: true },
    Description: { type: String, required: true },
     slug: { type: String, unique: true, index: true, lowercase: true,required:true },
},
 {timestamps:true}

);


const ContactData = Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    detail: { type: String, required: true },
  
    

});
const AdminData = Schema({
    email: { type: String, required: true },
    password:{type:String, required: true},
})
// Creating Model

const BlogModel = mongoose.model("BlogData", BlogData);
const ContactModel = mongoose.model("ContactData", ContactData);
const AdminModel= mongoose.model('AdminData',AdminData)
// Exporting Model
 
module.exports = { BlogModel, ContactModel,AdminModel } 