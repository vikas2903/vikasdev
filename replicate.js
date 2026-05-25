import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
import { Client, handle_file } from "@gradio/client";
import { promises as fs } from "fs";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const port = Number(process.env.PORT) || 3000;
const upload = multer({ dest: "uploads/" });
const hfSpaceId = "yisol/IDM-VTON";
const supportedGarmentTypes = new Set(["upper_body", "lower_body", "full_body"]);

app.get("/", (req, res) => {
  res.json({
    message: "Free virtual try-on API is running",
    provider: "huggingface-space",
    space: hfSpaceId,
    endpoint: "/try-on",
  });
});

app.post("/try-on", upload.single("image"), async (req, res) => {
  let localFilePath;

  try {
    if (!req.file) {
      return res.status(400).json({
        error: "Image file is required",
        message: "Send a file in the 'image' field.",
      });
    }

    const clothImage = req.body.clothImage;
    const garmentDescription = req.body.garmentDescription || "fashion garment";
    const garmentType = req.body.garmentType || "upper_body";
    const gender = req.body.gender || "women";
    const category = req.body.category || "fashion";
    const productName = req.body.productName || "Product";

    if (!clothImage) {
      return res.status(400).json({
        error: "clothImage is required",
        message: "Send the garment image URL in the 'clothImage' field.",
      });
    }

    if (!supportedGarmentTypes.has(garmentType)) {
      return res.status(400).json({
        error: "Invalid garmentType",
        message: "Use one of: upper_body, lower_body, full_body.",
      });
    }

    localFilePath = req.file.path;

    const client = await Client.connect(hfSpaceId);
    const result = await client.predict("/tryon", [
      {
        background: await handle_file(localFilePath),
        layers: [],
        composite: null,
      },
      await handle_file(clothImage),
      garmentDescription,
      true,
      false,
      30,
      42,
    ]);

    const output = result?.data || [];
    const outputUrl = Array.isArray(output) ? output[0]?.url || "" : "";
    const maskedImageUrl = Array.isArray(output) ? output[1]?.url || "" : "";

    if (!outputUrl) {
      throw new Error("No try-on image returned from Hugging Face Space");
    }

    res.json({
      message: "Try-on generated successfully",
      provider: "huggingface-space",
      space: hfSpaceId,
      input: {
        productName,
        gender,
        category,
        garmentType,
        clothImage,
        garmentDescription,
      },
      output,
      outputUrl,
      maskedImageUrl,
    });
  } catch (error) {
    console.error("Error in /try-on:", error);
    res.status(500).json({
      error: "Failed to generate try-on image",
      message: error?.message || "Unknown error",
    });
  } finally {
    if (localFilePath) {
      await fs.unlink(localFilePath).catch(() => { });
    }
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
