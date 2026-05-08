const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const authRoutes = require("./routes/authRoutes");
const prescriptionRoutes = require("./routes/prescriptionRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/prescriptions", prescriptionRoutes);

app.get("/", (req, res) => {
    res.send("HealthTech Prescription Management System API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});