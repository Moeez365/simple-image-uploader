import express from "express";
import { upload } from "./multer.js";
import { fileController, fileDownload } from "./fileController.js";

import dotenv from "dotenv";
import { cloudinaryConfig } from "./cloudinary.js"; 
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.post("/api/upload", upload.single("image"), fileController);
app.get("/api/downloads", fileDownload)

cloudinaryConfig();
app.listen(PORT, () => {
  console.log(`your app is running on port http://localhost:${PORT}`);
});
