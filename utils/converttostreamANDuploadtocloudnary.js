import cloudinary from "../config/cloudinaryconfig";
import streamifier from "streamifier";

export default UploadStreamtocloudnary = (imageBuffer) => {
  return new Promise((resolve, reject) => {
    const cloudinaryStream = cloudinary.uploader.upload_stream(
      { folder: "portfolioCMS" },
      (error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      },
    );
    const convertfrombuffertostream = streamifier.createReadStream(imageBuffer);
    convertfrombuffertostream.pipe(cloudinaryStream);
  });
};
