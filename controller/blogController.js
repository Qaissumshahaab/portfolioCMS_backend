import blog from "../model/blog";
import portfolio from "../model/portfolio";
import UploadStreamtocloudnary from "../utils/converttostreamANDuploadtocloudnary";

export const createBlog = async (req, res, next) => {
  const { title, content, tags } = req.body;
  const coverImage = req.file.buffer;
  const userid = req.user.userid;
  const portfolio = await portfolio.findOne({ userid: userid });
  const resultafteruploadtocloudanry = await UploadStream();
  try {
    if (!portfolio) {
      return res
        .status(400)
        .json({ success: false, message: "Create portfolio first" });
    } else {
      const resultafteruploadtocloudnary =
        await UploadStreamtocloudnary(coverImage);
      let secure_url = resultafteruploadtocloudnary.secure_url;
      let public_id = resultafteruploadtocloudnary.public_id;

      const createBlog = await blog.create({
        title,
        content,
        coverImage: {
          secure_url: secure_url,
          public_id: public_id,
        },
        tags,
        portfolioid: portfolio._id,
        published: false,
      });
      return res
        .status(200)
        .json({ success: true, message: "Blog created successfully" });
    }
  } catch (error) {
    console.log("error occur in blogController");
    return res
      .status(400)
      .json({ success: false, message: "Failed to create blog" });
  }
};
