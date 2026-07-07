import homepage from "../model/homepage";
import portfolio from "../model/portfolio";

export const createHomepage = async (req, res, next) => {
  try {
    const { fullName, title, introduction } = req.body;
    const profilePic = req.file?.buffer;
    const userid = req.user.userid;
    const findportfolio = await portfolio.findOne({ userid: userid });

    if (!findportfolio) {
      return res
        .status(400)
        .json({ success: false, message: "Create portfolio first" });
    } else {
      const findhomepage = await homepage.findOne({
        portfolioid: findportfolio._id,
      });
      if (!findhomepage) {
        let secure_url;
        let public_id;
        if (profilePic) {
          const resultafteruploadtocloudnary =
            await UploadStreamtocloudnary(profilePic);
          secure_url = resultafteruploadtocloudnary.secure_url;
          public_id = resultafteruploadtocloudnary.public_id;
        }
        const createhomepage = await homepage.create({
          fullName,
          title,
          introduction,
          profilePic: {
            secure_url,
            public_id,
          },
          portfolioid: findportfolio._id,
        });

        return res.status(200).json({
          success: true,
          message: "Homapage added successfully",
        });
      } else {
        let secure_url;
        let public_id;
        if (profilePic) {
          const resultafteruploadtocloudnary =
            await UploadStreamtocloudnary(profilePic);
          secure_url = resultafteruploadtocloudnary.secure_url;
          public_id = resultafteruploadtocloudnary.public_id;
        }
        const updateData = {};
        if (fullName) {
          updateData.fullName = fullName;
        }
        if (title) {
          updateData.title = title;
        }
        if (introduction) {
          updateData.introduction = introduction;
        }
        if (profilePic) {
          updateData.profilePic = {
            secure_url: secure_url,
            public_id: public_id,
          };
        }
        const updatehomepage = await homepage.findOneAndUpdate(
          {
            portfolioid: findportfolio._id,
          },
          updateData,
          { new: true },
        );
        return res.status(200).json({
          success: true,
          message: " homepage information updated successfully",
        });
      }
    }
  } catch (error) {
    console.log("error occur in homepageController");
    return res
      .status(400)
      .json({ success: false, message: "Failed to create homepage" });
  }
};
