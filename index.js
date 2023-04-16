import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import Connection from "./DataBase/MongoDB.js";
import router from "./Routes/Route.js";

const PORT = process.env.PORT || 8000;

const user = process.env.DB_PASSWORD;
const password = process.env.DB_PASSWORD;

// MongoDb 
const URL = `mongodb+srv://${user}:${password}@tournament.k1g1ek9.mongodb.net/?retryWrites=true&w=majority`;

const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", router);

Connection(URL);

app.listen(PORT, () => {
  console.log(`Server is connected on PORT ${PORT}`);
});
