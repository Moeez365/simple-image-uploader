import { v2 as cloudinary } from "cloudinary";
import axios from "axios";
import fs from "fs";

export const fileController = async (req, res) => {
  const file = req.file;
  try {
    if (!file) {
      return res.status(400).json({
        data: "file is require",
      });
    }
    const upload = await cloudinary.uploader.upload(file.path, {
      folder: "FileUploader",
    });
    return res.status(200).json({
      data: "all done",
      url: upload.secure_url,
    });
  } catch (error) {
    res.status(500).json({
      error: "some error occur",
    });
    console.log(error);
  } finally {
    if (file?.path) {
      fs.unlink(file.path, () => {});
    }
  }
};

export const fileDownload = async (req, res) => {
  const imageUrl = req.query.url;
  try {
    if (!imageUrl) {
      return res.status(400).json({
        data: "Image url not found",
      });
    }
    const response = await axios({
      url: imageUrl,
      method: "GET",
      responseType: "stream",
    });

    const filename = imageUrl.split("/").pop() || "image.jpg";
    res.setHeader("Content-Disposition", `attachment; filename=${filename}`);
    res.setHeader("Content-Type", response.headers["content-type"]);
    response.data.pipe(res);
  } catch (error) {
    res.status(500).send("Error downloading image");
  }
};
