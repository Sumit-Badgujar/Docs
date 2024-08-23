// backend-docs/models/db.js
const mongoose = require('mongoose'); 

// schema for docs
const docsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// model for the schema 
const docsModel = mongoose.model('docsModel', docsSchema); 

module.exports = docsModel; 