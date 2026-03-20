const express = require('express');
const dotenv  = require('dotenv');
const colors  = require('colors');
const path    = require('path');
const cors    = require('cors');
 
// ── Step 1: Load config FIRST ───────────────────────────────────────────
// __dirname = src/
// path.join builds: src/config/config.env
dotenv.config({ path: path.join(__dirname, 'config', 'config.env') });
 
// ── Step 2: Connect to database ─────────────────────────────────────────
// Must be AFTER dotenv so process.env.MONGO_URI is populated
const connectDB = require('./config/db');
connectDB();
 
// ── Step 3: Create the Express app ──────────────────────────────────────
const app = express();
 
// ── Step 4: Register middleware ─────────────────────────────────────────
// Parses incoming request body as JSON
// Without this, req.body is undefined in every controller
app.use(express.json());
 
// Allows requests from the React frontend on port 3000
app.use(cors({ origin: 'http://localhost:3000' }));
 
// ── Step 5: Mount routes ────────────────────────────────────────────────
const homeRoutes = require('./api/routes/homeRoutes');
// All routes in homeRoutes.js are prefixed with /api
// So '/doctors' in homeRoutes becomes GET /api/doctors
app.use('/api', homeRoutes);
 
// ── Step 6: Start listening ──────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    // .yellow.bold = colors package: prints this text in yellow bold
    console.log(
        `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
    );
});
