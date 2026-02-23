import AgentAPI from "apminsight";
AgentAPI.config();
import cors from "cors";
import express from "express";
import { auth } from "./lib/auth.js";
import { usersRouter } from "./routes/users.js";
import { toNodeHandler } from "better-auth/node";
import { classesRouter } from "./routes/classes.js";
import { subjectsRouter } from "./routes/subjects.js";
import securityMiddleware from "./middleware/security.js";

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

app.all("/api/auth/*splat", toNodeHandler(auth));

app.get("/", (req, res) => {
    res.send("Hello, welcome to the Classroom API!");
});

app.use(securityMiddleware);

app.use("/api/subjects", subjectsRouter);
app.use("/api/users", usersRouter);
app.use("/api/classes", classesRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
