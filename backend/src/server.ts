import express, { type Request, type Response, type Application } from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/database.js";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();

const app: Application = express();


const allowedOrigins = [
  "http://localhost:5500",
  "http://127.0.0.1:5500",
];

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
}));

app.use(express.json());


// Health check route
app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "E-commerce backend is running!",
  });
});

// Contact form API
app.use("/api/contact", contactRoutes);

// Handle unknown routes
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Start server after MongoDB connects
const PORT = Number(process.env.PORT) || 5001;

const startServer = async (): Promise<void> => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
      console.log(`Contact API: POST http://localhost:${PORT}/api/contact`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
