const express = require('express');
const notes = require('./data/notes');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routers/userRoutes');
const noteRoutes = require('./routers/noteRoutes');
const {notFound, errorHandler} = require('./middlewares/errorMiddleware');
const PORT = process.env.PORT || 8080;
connectDB();
const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());


 app.use('/api/notes', noteRoutes);
app.use('/api/users', userRoutes);


app.use(notFound);
app.use(errorHandler);


app.listen(PORT, console.log(`server is running on port ${PORT}`));
