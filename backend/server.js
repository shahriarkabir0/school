import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import noticeRoutes from "./routes/noticeRoutes.js"

dotenv.config();
const app = express();

// Trust proxy (needed for correct secure cookie handling behind reverse proxies)
app.set('trust proxy', 1);

// Configure allowed origins without wildcard when using credentials
const allowedOrigins = [
  'http://localhost:5173',
  'http://103.191.51.232:3000',
  'http://103.191.51.232',
  'https://shahriarkabir.xyz',
  'https://www.shahriarkabir.xyz',
  'https://gonosvmc.vercel.app',
  'https://school-iota-eight.vercel.app',
];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "100mb" }));  
app.use(express.urlencoded({ limit: "100mb", extended: true }));  
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ MongoDB Connection Error:", err));

// ✅ Health Check Route
app.get("/", (req, res) => {
  res.send('GONOSVMC Backend is running!');
});

app.use("/api/auth", authRoutes);
app.use("/api/notices", noticeRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🔍 Health check available at: http://localhost:${PORT}/`);
});
