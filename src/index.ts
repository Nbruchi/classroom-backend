import cors from "cors";
import express from "express";
import { subjectsRouter } from "./routes/subjects";
import securityMiddleware from "./middleware/security";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

if (!process.env.FRONTEND_URL) {
    console.warn(
        "FRONTEND_URL is not set. CORS will not be configured properly.",
    );
}

app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    }),
);

app.get("/", (req, res) => {
    res.send("Hello, welcome to the Classroom API!");
});

app.use(securityMiddleware);

app.use("/api/subjects", subjectsRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
