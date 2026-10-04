import "dotenv/config";
import express from "express";
import cors from "cors";
import reviewRoutes from "./routes/reviewRoutes.js";

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
