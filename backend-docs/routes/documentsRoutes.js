const express = require('express'); 
const router = express.Router(); 
const docsModel = require('../models/db');
const z = require('zod'); 

// Zod schema to validate the input data
const docsSchemaBody = z.object({
    title: z.string().min(1, "Title can not be empty") ,
    content: z.string().min(1 , "Content can not be empty")
})

// create new docs 
router.post("/create", async (req, res) => {
    console.log('Request received:', req.body);
    try {
        // Validate the request body using Zod
        const validation = docsSchemaBody.safeParse(req.body);

        if (!validation.success) {
            return res.status(400).json({ errors: validation.error.errors });
        }

        // Create a new document with the validated data
        const newDocs = new docsModel(validation.data);

        // Save the document to the database
        await newDocs.save();

        // Send the newly created document as the response
        res.status(201).json({
            newDocs,
            message:"Docs created successfully"
        });

    } catch (error) {
        console.error('Error:', error); 
        // Handle any other errors
        res.status(500).json({ message: 'Internal Server Error while creating doc' });
    }
});

// get all docs 
router.get("/getall", async (req, res) => {
    try {
        const docs = await docsModel.find();

        res.status(200).json({
            docs,
            message:"Docs fetched successfully"
        });
    } catch (err) {
        console.error("there is error while fetching all the Docs" + err);
        res.status(500).json({
            message: "Internal server Error while fetching the all the Docs"
        })
    }
});

// update a docs : id 

router.put("/update/:id",async (req, res) => {
    try {
        const validatedData = docsSchemaBody.safeParse(req.body); 

        if (!validatedData.success) {
            return res.status(400).json({
                errors: validatedData.error.errors, 
                message:"please provide the correct data"
            });
        }
        
        const updatedDoc = await docsModel.findByIdAndUpdate(req.params.id ,validatedData.data,  { new: true } );


        if (!updatedDoc) {
            return res.status(404).json({
                message: 'Failed to update the docs'
            });
        }

        res.status(200).json({
            updatedDoc ,
            message:"Docs updated successfully"
        });


    }catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error while updating Doc' });
    }

});

// delete a docs : id 
router.delete("/delete/:id",async (req, res) => {
    try {

            
            const deletedDoc = await docsModel.findByIdAndDelete(req.params.id );



            if (!deletedDoc) {
                return res.status(404).json({ message: 'Document not found' });
            }

        res.status(200).json({
            message:"the doc is successFully deleted"
        });


        }catch (error) {
            console.error('Error:', error); 
            res.status(500).json({ message: 'Error while deleting Doc' });
        }

});

module.exports = router;