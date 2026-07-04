import contact from "../model/contact"

export const createContact=async(req,res,next)=>{
    const {email,phoneNo,whatsappNo}=req.body
    const userid=req.user.userid
    const portfolio = await portfolio.findOne({ userid: userid });
 try {
    if (!portfolio) {
      return res
        .status(400)
        .json({ success: false, message: "Create portfolio first" });
    } else {
      const contactInfo= await contact.findOne({portfolioid:portfolio._id})
      if(!contactInfo){
       const createContactInfo=await contact.create
      }
      else{

      }
    }
  } catch (error) {
    console.log("error occur in contactController");
    return res
      .status(400)
      .json({ success: false, message: "Failed to create contactInfo" });
  }
};

