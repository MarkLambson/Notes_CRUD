const express = require("express");
const cors = require("cors"); //allows cross origin talk, front end talking to back end

require("dotenv").config();

const app = express();
const port = process.env.ATLAS_PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));//can accept form data
app.use(cors());

require("./configs/mongoose.config");

const Routes = require("./routes/note.routes");
Routes(app);

app.listen(port, () => console.log(`You are being hailed by the Death Star, transmit your codes to: ${port} immediately`));