import express from 'express'
import authRoutes from './routes/authRoutes'
import adminRoutes from "./routes/adminRoutes";
import userRoutes from "./routes/userRoutes"
const app = express()
app.use(express.json());

app.use("/auth", authRoutes);
app.use('/api', adminRoutes);
app.use("/api", userRoutes);

app.listen(3000);