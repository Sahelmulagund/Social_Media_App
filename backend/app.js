const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
const multer = require("multer");
const path = require("path");
require('dotenv').config();


//Express server
const app = express();

//MongoDB
mongoose.connect(process.env.DATABASE_LOCAL, {useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true},);

const connectionObj = mongoose.connection;
connectionObj.on('open', () =>{
    console.log('Connected to mongodb...');
});



app.use("/images", express.static(path.join(__dirname, "public/images")));


//middleware
app.use(morgan('common'));
app.use(express.json());
app.use(cookieParser());
app.use(helmet());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });
  const upload = multer({ storage: storage });
  app.post("/api/upload", upload.single("file"), (req, res) => {
    try {
      return res.status(200).json("File uploded successfully");
    } catch (error) {
      console.error(error);
    }
  });
//cors
if(process.env.NODE_ENV === 'development'){
    app.use(cors({origin: `${process.env.CLIENT_URL}`}));
}

//Bring routes
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/post');
//routes middleware
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
//Server port
const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Backend connected to server on port ${port}`);

});
