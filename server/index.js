import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import cors from "cors";
import goodsRoutes from "./routes/goodsRoutes.js";
import productsRoutes from "./routes/productsRoutes.js";

const port = process.env.PORT;
const uri = process.env.MONGO_URI;
const githubRepoLink = "https://github.com/traez/organogram-ltd-backend-developer-test";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/goods", goodsRoutes);
app.use("/api/products", productsRoutes);

app.get("/", (req, res) => {
  res.send(`
    <h1>Hello World from Trae Zeeofor. Visit link for App info</h1>
    <h2><a href="${githubRepoLink}" target="_blank">${githubRepoLink}</a></h2>
  `);
});

async function connectToMongoDB() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB using Mongoose");
    app.listen(port, () => {
      console.log(`App is listening on port: ${port}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

connectToMongoDB();