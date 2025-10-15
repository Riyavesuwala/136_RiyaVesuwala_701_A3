const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const JWT_SECRET = "your_secret_key"; // Replace with env variable in production

// Connect MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/employees")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// Employee Schema
const employeeSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String
});
const Employee = mongoose.model("Employee", employeeSchema);

// Leave Schema
const leaveSchema = new mongoose.Schema({
  employeeId: mongoose.Schema.Types.ObjectId,
  date: Date,
  reason: String,
  grant: { type: String, enum: ["Yes", "No"], default: "No" }
});
const Leave = mongoose.model("Leave", leaveSchema);

// --- Routes ---

// Register (for testing)
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const emp = new Employee({ name, email, password: hashedPassword });
    await emp.save();
    res.json({ message: "Registered successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const emp = await Employee.findOne({ email });
  if (!emp) return res.status(400).json({ error: "Invalid credentials" });

  const valid = await bcrypt.compare(password, emp.password);
  if (!valid) return res.status(400).json({ error: "Invalid credentials" });

  const token = jwt.sign({ id: emp._id }, JWT_SECRET, { expiresIn: "1h" });
  res.json({ token, name: emp.name, email: emp.email });
});

// Auth middleware
const auth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Forbidden" });
    req.user = user;
    next();
  });
};

// Get employee profile
app.get("/profile", auth, async (req, res) => {
  const emp = await Employee.findById(req.user.id).select("-password");
  res.json(emp);
});

// Leave CRUD
app.post("/leave", auth, async (req, res) => {
  const { date, reason, grant } = req.body;
  const leave = new Leave({ employeeId: req.user.id, date, reason, grant });
  await leave.save();
  res.json(leave);
});

app.get("/leave", auth, async (req, res) => {
  const leaves = await Leave.find({ employeeId: req.user.id });
  res.json(leaves);
});

const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
