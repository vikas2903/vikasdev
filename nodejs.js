import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import connectToDatabase from './database/connect.js';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
dotenv.config();

// Cloudinary configuration
const cloudinaryConfig = cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });


fs.writeFile('notes/logs.text', 'vikas', (err) => {
    if (err) {
        console.log(err);
    }
    console.log('Logs file created successfully');
});

fs.readFile('notes/logs.text', 'utf-8', (err, data) => {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
    }
})

const filepath = path.join('notes', 'logs.text');
console.log("filepath", filepath);


const app = express();

app.use(cors());
app.use(express.json());

connectToDatabase()
    .then(() => {
        console.log('Database connected');
    })
    .catch((err) => {
        console.log(err);
    });


const noteSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        required: true,
        trim: true
    },

    color: {
        type: String,
        default: 'white'
    },

    pinned: {
        type: Boolean,
        default: false
    },

    labels: {
        type: [String],
        default: []
    }

}, { timestamps: true }
);

const imageSchemea = new mongoose.Schema({
    url: { type: String },
    public_id: { type: String }
}, { timestamps: true }
);

const Note = mongoose.models.Note || mongoose.model('Note', noteSchema);
const Image = mongoose.models.Image || mongoose.model('Image', imageSchemea);

const createNote = async (req, res) => {
    try {
        const note = await Note.create(req.body);
        res.status(201).json({
            success: true,
            message: 'Note created successfully',
            note
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Failed to create note'
        });

    }
};

const getNotes = async (req, res) => {

    try {

        const notes = await Note.find();

        res.json({
            success: true,
            notes
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch notes'
        });
    }
};

const updateNote = async (req, res) => {
    try {
        const { id } = req.params;
        const note = await Note.findByIdAndUpdate(id, req.body, { new: true });

        if (!note) {
            return res.status(404).json({
                success: false,
                message: 'Note not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Note updated successfully',
            note
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: 'Failed to update note'
        });
    }
}

const deleteNote = async (req, res) => {
    try {

        const { id } = req.params;
        const note = await Note.findByIdAndDelete(id);
        if (!note) {
            return res.status(404).json({
                success: false,
                message: 'Note not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Note deleted successfully'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete note'
        });
    }
}

app.get('/api/images', async (req, res) => {
    try {
        const images = await Image.find();
        res.json({
            success: true,
            images
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch images'
        });
    }
});

app.post('/api/upload', upload.single('image'), async (req, res) => {
    try{
        const filePath = req.file.path;
        const result = await cloudinary.uploader.upload(filePath, {
            folder: 'google-keep-clone'
        });
        await Image.create({
            url: result.secure_url,
            public_id: result.public_id
        });
    
        fs.unlinkSync(filePath);
        res.status(200).json({
            success: true,
            message: 'Image uploaded successfully',
            imageUrl: result.secure_url
        });

        console.log("Image uploaded successfully", result.secure_url);

    }catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Failed to upload image'
        });
    }
});


app.post('/api/notes', createNote);
app.get('/api/notes', getNotes);
app.put('/api/notes/:id', updateNote);
app.delete('/api/notes/:id', deleteNote);

app.get('/', (req, res) => {
    res.json({ message: 'Google Keep Backend Running' });

});


// SERVER
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
