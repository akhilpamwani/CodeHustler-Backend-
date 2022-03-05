const { BlogModel,ContactModel }=require('../Model/Model')

exports.BlogSaveData = async (req, res) => {

    const Title=req.body.Title;
    const Image=req.body.Image;
    const Paragraph=req.body.Paragraph;
    const ABNData= new BlogModel({Title:Title,Image:Image,Paragraph:Paragraph});
    await
    ABNData.save();
    res.send("Your Data has been saved");
    
}
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