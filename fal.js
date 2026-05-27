import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
import { fal } from "@fal-ai/client";

dotenv.config();

if (!process.env.FAL_KEY) {
    throw new Error("Missing FAL_KEY in .env");
}

fal.config({
    credentials: process.env.FAL_KEY,
});

const app = express();
app.use(cors());
app.use(express.json());
const port = Number(process.env.PORT) || 3000;
const upload = multer();

app.get("/", (req, res) => {
    res.json({ ok: true, service: "fal-tryon-api" });
});

app.post("/api/tryon", upload.fields([ { name: "userImage" }, { name: "garmentImage" } ]), async (req, res) => {
    try {
        const userImageFile = req.files?.userImage?.[0];
        const garmentImageFile = req.files?.garmentImage?.[0];
        const garmentImageUrl = req.body?.garmentImageUrl;

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
                message: "Send either a 'garmentImage' file field or a 'garmentImageUrl' text field.",
                receivedFields: Object.keys(req.files || {}),
            });
        }

        // Upload incoming files to fal storage and use the returned CDN URLs.
        const userFile = new Blob([userImageFile.buffer], {
            type: userImageFile.mimetype || "image/jpeg",
        });

        const model_image = await fal.storage.upload(userFile);
        let garment_image = garmentImageUrl;

        if (garmentImageFile) {
            const garmentFile = new Blob([garmentImageFile.buffer], {
                type: garmentImageFile.mimetype || "image/jpeg",
            });
            garment_image = await fal.storage.upload(garmentFile);
        }
 
        const result = await fal.subscribe("fal-ai/fashn/tryon/v1.6", {
            input: {
                model_image,
                garment_image,
                category: "auto",   // "tops" | "bottoms" | "one-pieces" | "auto"
                mode: "balanced"    // "performance" | "balanced" | "quality"
            },
            logs: true,
        });

        res.json({ image: result.data.images[0].url });
    } catch (e) {
        console.error("Try-on error:", e);
        res.status(500).json({ error: e.message });
    }
});



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}
);
