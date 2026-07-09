import resume from "../model/resume";
import portfolio from "../model/portfolio";
import UploadStreamtocloudnary from "../utils/converttostreamANDuploadtocloudnary";

export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a resume image",
      });
    }

    const resumePic = req.file.buffer;
    const userid = req.user.userid;

    const findportfolio = await portfolio.findOne({ userid });

    if (!findportfolio) {
      return res.status(400).json({
        success: false,
        message: "Create portfolio first",
      });
    }

    const result = await UploadStreamtocloudnary(resumePic);

    const resumeData = {
      resumePic: {
        public_id: result.public_id,
        secure_url: result.secure_url,
      },
    };

    const findresume = await resume.findOne({
      portfolioid: findportfolio._id,
    });

    if (!findresume) {
      await resume.create({
        ...resumeData,
        portfolioid: findportfolio._id,
      });

      return res.status(201).json({
        success: true,
        message: "Resume uploaded successfully",
      });
    }

    await resume.findOneAndUpdate(
      { portfolioid: findportfolio._id },
      resumeData,
      { new: true },
    );

    return res.status(200).json({
      success: true,
      message: "Resume updated successfully",
    });
  } catch (error) {
    console.error("error occur in resumeController" + error);

    return res.status(500).json({
      success: false,
      message: "Error occurred while uploading resume",
    });
  }
};

// GET resume for portfolio owner
export const getResume = async (req, res) => {
  try {
    const userid = req.user.userid;
    const findportfolio = await portfolio.findOne({ userid });

    if (!findportfolio) {
      return res
        .status(400)
        .json({ success: false, message: "Portfolio not found" });
    }

    const resumeData = await resume.findOne({ portfolioid: findportfolio._id });
    return res.status(200).json({ success: true, data: resumeData });
  } catch (error) {
    console.log("Error in getResume");
    return res
      .status(400)
      .json({ success: false, message: "Error fetching resume" });
  }
};

// GET resume by portfolio ID (public route)
export const getResumeByPortfolioId = async (req, res) => {
  try {
    const { portfolioid } = req.params;
    const resumeData = await resume.findOne({ portfolioid });
    return res.status(200).json({ success: true, data: resumeData });
  } catch (error) {
    console.log("Error in getResumeByPortfolioId");
    return res
      .status(400)
      .json({ success: false, message: "Error fetching resume" });
  }
};

// DELETE resume
export const deleteResume = async (req, res) => {
  try {
    const userid = req.user.userid;
    const findportfolio = await portfolio.findOne({ userid });

    if (!findportfolio) {
      return res
        .status(400)
        .json({ success: false, message: "Portfolio not found" });
    }

    await resume.findOneAndDelete({ portfolioid: findportfolio._id });
    return res
      .status(200)
      .json({ success: true, message: "Resume deleted successfully" });
  } catch (error) {
    console.log("Error in deleteResume");
    return res
      .status(400)
      .json({ success: false, message: "Error deleting resume" });
  }
};
