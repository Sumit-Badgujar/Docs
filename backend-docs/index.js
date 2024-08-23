const express = require('express')
const cors = require('cors'); 
const rootRouter = require("./routes/index"); 

const app = express()

app.use(cors()); 
app.use(express.json())      //body parsor - middleware
const mongoose = require('mongoose'); 
require('dotenv').config()

const PORT = process.env.PORT || 3000;


mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDb connected"))
    .catch((err) => {
        console.log("Error while connecting to Db" + err); 
    })



app.use('/docs/v1', rootRouter)     // directing all request of v1 to the main index.js in routes i.e.( rootRouter )

app.post('/test', (req, res) => {
    console.log('Direct test route hit');
    res.send('Test route works!');
});


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})