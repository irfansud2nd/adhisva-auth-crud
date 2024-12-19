import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import blogRoutes from "./routes/blog.js";
import cookieParser from "cookie-parser";

const allowedOrigins = ["http://localhost:3000", "http://localhost:5174"];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

const port = 8800;

app.use("/auth", authRoutes);
app.use("/blog", blogRoutes);

app.listen(port, (req, res) => {
  console.log(`Server is running on port ${port}`);
});

app.get("/", (req, res) => {
  res.status(500).json({ message: "Hello from server" });
});
