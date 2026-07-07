import blog from "../model/blog";
import portfolio from "../model/portfolio";
import UploadStreamtocloudnary from "../utils/converttostreamANDuploadtocloudnary";

export const createBlog = async (req, res, next) => {
  try {
    const { title, content, tags } = req.body;
    const coverImage = req.file?.buffer;
    const userid = req.user.userid;

    const findportfolio = await portfolio.findOne({ userid: userid });

    if (!findportfolio) {
      return res
        .status(400)
        .json({ success: false, message: "Create portfolio first" });
    } else {
      if (!title || !content) {
        return res.status(400).json({
          success: false,
          message: "Title and content are required",
        });
      }
      let secure_url;
      let public_id;
      if (coverImage) {
        const resultafteruploadtocloudnary =
          await UploadStreamtocloudnary(coverImage);
        secure_url = resultafteruploadtocloudnary.secure_url;
        public_id = resultafteruploadtocloudnary.public_id;
      }
      const uniquetags = tags ? [...new Set(tags)] : [];
      const createdBlog = await blog.create({
        title,
        content,
        coverImage: {
          secure_url: secure_url,
          public_id: public_id,
        },
        tags: uniquetags,
        portfolioid: findportfolio._id,
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
