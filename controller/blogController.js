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

// GET all blogs for portfolio owner
export const getBlogs = async (req, res, next) => {
  try {
    const userid = req.user.userid;
    const findportfolio = await portfolio.findOne({ userid });

    if (!findportfolio) {
      return res
        .status(400)
        .json({ success: false, message: "Portfolio not found" });
    }

    const blogs = await blog
      .find({ portfolioid: findportfolio._id })
      .sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: blogs });
  } catch (error) {
    console.log("Error in getBlogs");
    return res
      .status(400)
      .json({ success: false, message: "Error fetching blogs" });
  }
};

// GET blogs by portfolio ID (public route)
export const getBlogsByPortfolioId = async (req, res, next) => {
  try {
    const { portfolioid } = req.params;
    const blogs = await blog
      .find({ portfolioid, published: true })
      .sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: blogs });
  } catch (error) {
    console.log("Error in getBlogsByPortfolioId");
    return res
      .status(400)
      .json({ success: false, message: "Error fetching blogs" });
  }
};

// GET single blog by ID (public route)
export const getBlogById = async (req, res, next) => {
  try {
    const { blogid } = req.params;
    const blogData = await blog.findById(blogid);

    if (!blogData) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    return res.status(200).json({ success: true, data: blogData });
  } catch (error) {
    console.log("Error in getBlogById");
    return res
      .status(400)
      .json({ success: false, message: "Error fetching blog" });
  }
};

// DELETE blog
export const deleteBlog = async (req, res, next) => {
  try {
    const { blogid } = req.body;
    const userid = req.user.userid;
    const findportfolio = await portfolio.findOne({ userid });

    if (!findportfolio) {
      return res
        .status(400)
        .json({ success: false, message: "Portfolio not found" });
    }

    const blogData = await blog.findOne({
      _id: blogid,
      portfolioid: findportfolio._id,
    });
    if (!blogData) {
      return res
        .status(400)
        .json({ success: false, message: "Blog not found" });
    }

    await blog.findByIdAndDelete(blogid);
    return res
      .status(200)
      .json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    console.log("Error in deleteBlog");
    return res
      .status(400)
      .json({ success: false, message: "Error deleting blog" });
  }
};

// PUBLISH/UNPUBLISH blog
export const publishBlog = async (req, res, next) => {
  try {
    const { blogid, published } = req.body;
    const userid = req.user.userid;
    const findportfolio = await portfolio.findOne({ userid });

    if (!findportfolio) {
      return res
        .status(400)
        .json({ success: false, message: "Portfolio not found" });
    }

    const blogData = await blog.findOne({
      _id: blogid,
      portfolioid: findportfolio._id,
    });
    if (!blogData) {
      return res
        .status(400)
        .json({ success: false, message: "Blog not found" });
    }

    await blog.findByIdAndUpdate(blogid, { published }, { new: true });
    return res
      .status(200)
      .json({
        success: true,
        message: `Blog ${published ? "published" : "unpublished"} successfully`,
      });
  } catch (error) {
    console.log("Error in publishBlog");
    return res
      .status(400)
      .json({ success: false, message: "Error updating blog" });
  }
};
