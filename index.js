import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import Connection from "./DataBase/MongoDB.js";
import router from "./Routes/Route.js";

const app = express();
dotenv.config();

// Server Port
const PORT = process.env.PORT || 8000;

// MongoDb URL
const user = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const URL = `mongodb+srv://${user}:${password}@tournament.k1g1ek9.mongodb.net/?retryWrites=true&w=majority`;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", router);

// MongoDb Connection
Connection(URL);

app.listen(PORT, () => {
  console.log(`Server is connected on PORT ${PORT}`);
});
