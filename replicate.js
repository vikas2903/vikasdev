import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
import Replicate from "replicate";

dotenv.config();

if (!process.env.REPLICATE_API_TOKEN) {
  throw new Error("Missing REPLICATE_API_TOKEN in .env");
}

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

const app = express();
app.use(cors());
app.use(express.json());

const port = Number(process.env.PORT) || 3000;
const upload = multer({ storage: multer.memoryStorage() });
const supportedGarmentTypes = new Set(["upper_body", "lower_body", "full_body"]);

// Community model on Replicate. Note: this specific model is marked non-commercial by the model author.
const REPLICATE_TRY_ON_MODEL =
  "cuuupid/idm-vton:0513734a452173b8173e907e3a59d19a36266e55b48528559432bd21c7d7e985";

const normalizeCategory = (garmentType = "upper_body") => {
  if (garmentType === "full_body") {
    return "dresses";
  }

  return garmentType;
};

app.get("/", (req, res) => {
  res.json({
    ok: true,
    provider: "replicate",
    model: REPLICATE_TRY_ON_MODEL,
    endpoint: "/api/tryon",
  });
});

app.post(
  "/api/tryon",
  upload.fields([
    { name: "userImage", maxCount: 1 },
    { name: "garmentImage", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const userImageFile = req.files?.userImage?.[0];
      const garmentImageFile = req.files?.garmentImage?.[0];
      const garmentImageUrl = req.body?.garmentImageUrl;
      const garmentDescription = req.body?.garmentDescription || "fashion garment";
      const garmentType = req.body?.garmentType || "upper_body";

      if (!userImageFile) {
        return res.status(400).json({
          error: "Missing uploaded user image",
          message: "Send multipart/form-data with a 'userImage' file field.",
          receivedFields: Object.keys(req.files || {}),
        });
      }

      if (!garmentImageFile && !garmentImageUrl) {
        return res.status(400).json({
          error: "Missing garment image",
          message: "Send either 'garmentImage' as a file or 'garmentImageUrl' as text.",
          receivedFields: Object.keys(req.files || {}),
        });
      }

      if (!supportedGarmentTypes.has(garmentType)) {
        return res.status(400).json({
          error: "Invalid garmentType",
          message: "Use one of: upper_body, lower_body, full_body.",
        });
      }

      const input = {
        human_img: userImageFile.buffer,
        garm_img: garmentImageFile?.buffer || garmentImageUrl,
        garment_des: garmentDescription,
        category: normalizeCategory(garmentType),
        crop: false,
        force_dc: garmentType === "full_body",
        mask_only: false,
        steps: 30,
        seed: 42,
      };

      const output = await replicate.run(REPLICATE_TRY_ON_MODEL, { input });
      const imageUrl =
        typeof output?.url === "function"
          ? output.url()
          : Array.isArray(output)
            ? output[0]
            : output;

      if (!imageUrl) {
        throw new Error("No try-on image returned from Replicate");
      }

      res.json({
        message: "Try-on generated successfully",
        provider: "replicate",
        model: REPLICATE_TRY_ON_MODEL,
        image: imageUrl,
      });
    } catch (error) {
      console.error("Replicate try-on error:", error);
      res.status(500).json({
        error: "Failed to generate try-on image",
        message: error?.message || "Unknown error",
      });
    }
  }
);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
