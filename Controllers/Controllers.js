
const { BlogModel,ContactModel,AdminModel }=require('../Model/Model')
const JWT = require('jsonwebtoken')
const bcrypt=require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const sgTransport = require('nodemailer-sendgrid-transport');
const {default:slugify}=require('slugify')
// Display Blog Controller

const transporter = nodemailer.createTransport(sgTransport({
    auth: {
        api_key:"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",
    }
}))
exports.DisplayBlog = async (req, res) => {
    BlogModel.find({}, (result, error) => {
        if (result) {
            res.json({data: result })
        } else {
            res.send(error)
        }
    })
}

// Display Single Blog Controller  

exports.DisplayOneBlog = async (req,res) => {
    const { slug } = req.params;
    BlogModel.findOne({ slug }).exec((error, result) => {
        if (error) {
            res.json(error)
        } else {
           return res.json(result)
        }
       
    }) 
}
// Save Blog Controller

exports.BlogSaveData = async (req, res) => {
    const Title=req.body.Title;
    const Paragraph = req.body.Paragraph;
    const Description = req.body.Description;
    // const slug = id
    if (!Title || !Paragraph) {
        res.status(403).json({error: "Please Fill The Tilte or Paragraph "})
    }
    else {
        const slug = slugify(Title)
        const BlogDataBase = new BlogModel({ Title: Title, Paragraph: Paragraph, slug:slug,Description:Description });
       const data =await BlogDataBase.save();
        res.json({message: "Your Data has been saved",data:data});
    }
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

    const name = req.body.name;
    const email = req.body.email;
    const subject = req.body.subject;
    const detail = req.body.detail;
    const ContactDatabase = new ContactModel({ name: name, email: email, subject: subject, detail: detail });
    await
    
        ContactDatabase.save().then(() => {
            
            transporter.sendMail({
                to: ContactDatabase.email && 'aryanpamwani123@gmail.com',
                from: 'codehustleres@gmail.com',
                subject: "Thank you for contacting us",
                text: "We will response you as soon as possible",
                
            })
        
    res.send("Your Data has been saved");
        }).catch((error) => {
            console.log(error);
        })
    // apikey
        // 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
    
}
exports.ContactUpdate = async (req, res) => {
    const newName = req.body.newName;
    const newEmail = req.body.newEmail;
    const newSubject = req.body.newSubject;
    const newDetails = req.body.newDetails;
    const id = req.body.id;
    try {
        await ContactModel.findById(id, (error, DataUpdate) => {
            DataUpdate.name = newName
            DataUpdate.email = newEmail
            DataUpdate.subject = newSubject
            DataUpdate.detail = newDetails
            DataUpdate.save();
        })
    } catch (error) {
        console.log(error)
    }
              
          
           
    res.send("Send")
       
    

};
   
    

       

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

