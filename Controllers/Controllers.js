
const { BlogModel,ContactModel,AdminModel }=require('../Model/Model')
const JWT = require('jsonwebtoken')
const bcrypt=require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')

// Display Blog Controller

exports.DisplayBlog = async (req, res) => {
    BlogModel.find({}, (result, error) => {
        if (result) {
            res.send(result)
        } else {
            res.send(error)
        }
    })
}

// Display Single Blog Controller  

exports.DisplayOneBlog = async (req,res) => {
    const id = req.params.id;
    BlogModel.findOne(id, (result, error) => {
        if (result) {
            res.send(result)
        } else {
            res.send(error)            
        }
    })
}
// Save Blog Controller

exports.BlogSaveData = async (req, res) => {

    const Title=req.body.Title;
   
    const Paragraph = req.body.Paragraph;
    const id = req.params.id;
    const slug = id
    const BlogDataBase= new BlogModel({Title:Title,Paragraph:Paragraph,slug:slug});
    await
    BlogDataBase.save();
    res.send("Your Data has been saved");
    
}

// Upadate Blog Controller

exports.UpdateBlog = async (req,res) => {
    const newTitle = req.body.newTitle;
    
    const newSlug = req.body.newSlug;
    const newParagraph = req.body.newParagraph;
    const id = req.body.id;
    try {
        await BlogModel.findById(id, (error, BlogUpdate) => {
            BlogUpdate.Title = newTitle
            
            BlogUpdate.slug = newSlug
            BlogUpdate.Paragraph = newParagraph
        })
    } catch (error) {
        console.log(error)
    }
    res.send('Send')
}

// Delete Blog Controller

exports.DeleteBlog = async (req, res) => {
    const id=req.params.id
    await BlogModel.findByIdAndRemove(id).exec()
    res.send('Deleted')
}

// Save Contact Controller

exports.ContactSaveData = async (req, res) => {

    const name=req.body.name;
    const email=req.body.email;
    const subject = req.body.subject;
    const detail=req.body.detail;
    const ContactDatabase= new ContactModel({name:name,email:email,subject:subject,detail:detail});
    await
    ContactDatabase.save();
    res.send("Your Data has been saved");
    
}
exports.ContactUpdate = async (req, res) => {
    const newName = req.body.newName;
    const newEmail = req.body.newEmail;
    const newSubject = req.body.newSubject;
    const newDetails = req.body.newDetails;
    const id = req.body.id;
    
      
  
    await ContactModel.findOne(id, (error, DataUpdate) => {
        if (DataUpdate) {
              
          
            DataUpdate.name = newName
            DataUpdate.email = newEmail
            DataUpdate.subject = newSubject
            DataUpdate.detail = newDetails
            DataUpdate.save();
            res.send("Send")
        }
    else {
        console.log(error)    
    }
    })

}
   
    

        ;

    exports.DisplayBlog = async (req, res) => {
        BlogModel.find({}, (result, error) => {
            if (result) {
                res.send(result)
            } else {
                res.send(error)
            }
        })
    }

    exports.DisplayContact = async (req, res) => {
        ContactModel.find({}, (result, error) => {
            if (result) {
                res.send(result)
            } else {
                res.send(error)
            }
        })
    }
    exports.ContactDelete = async (req, res) => {
        const id = req.params.id
        await ContactModel.findByIdAndRemove(id).exec()
        res.send("Removed")
    }

    exports.AdminRegister = async (req, res) => {

    
        const email = req.body.email;
        const password = req.body.password;
        const SALT = await bcrypt.genSalt(Number(process.env.SALT));
        const hashpassword = await bcrypt.hash(password, SALT)
        const AdminDatabase = new AdminModel({ email: email, password: hashpassword });
        await AdminDatabase.save();
        res.send("Your Data has been saved");
    
    }




    exports.AdminLogin = async (req, res) => {
        const email = req.body.email;
        const password = req.body.password;
        const adminuser = await AdminModel.findOne({ email: email })
        const validate = await bcrypt.compare(
            password,
            adminuser.password
        )
        if (validate) {
            res.send('Login Sucessful')
        } else {
            res.send('Login Unsucessful')
        }
    }

