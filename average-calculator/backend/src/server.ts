import express from "express";
import cors from "cors";
import numberRoutes from "./routes/numberRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", numberRoutes); // Register routes

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
