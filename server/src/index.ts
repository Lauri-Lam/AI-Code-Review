import express from "express";
import reviewRoutes from "./routes/reviewRoutes.js";
import "dotenv/config";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);
app.use("/api", reviewRoutes);

const port = Number(process.env.PORT ?? 8080);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
