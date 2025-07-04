const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const auth = require('./routes/auth');
require('dotenv').config();
const app = express();
app.use(cors());
// app.use(express.json());  
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))  
app.use('/auth', auth);


const mongoose = require('mongoose');
require('dotenv').config(); 

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('Splitwise API is running');
});
 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 
