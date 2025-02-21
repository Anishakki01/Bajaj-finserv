const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

// POST Route: /bfhl
app.post("/bfhl", (req, res) => {
    const { data } = req.body;
    if (!data || !Array.isArray(data)) {
        return res.status(400).json({ is_success: false, message: "Invalid Input" });
    }

    // Separate numbers and alphabets
    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item));
    
    // Find the highest alphabet (last in A-Z order)
    const highest_alphabet = alphabets.length ? [alphabets.sort().pop()] : [];

    res.json({
        is_success: true,
        user_id: "Anish Choudhary", 
        email: "22BCS15142@cuchd.in",
        roll_number: "22BCS15142",
        numbers,
        alphabets,
        highest_alphabet
    });
});

// GET Route: /bfhl
app.get("/bfhl", (req, res) => {
    res.json({ operation_code: 1 });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
