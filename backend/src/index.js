const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

// Function to safely evaluate expressions
const safeEval = (expression) => {
    // Add more complex evaluation logic here if needed
    if (expression.includes('/0')) {
        throw new Error('Division by zero is not allowed');
    }

    // Use a more secure evaluation approach if needed
    return eval(expression); // Caution: 'eval' can still be risky; use a proper math parser for production.
};

app.post('/calculate', (req, res) => {
    const { expression } = req.body;

    try {
        // Validate the expression format
        if (!expression || typeof expression !== 'string') {
            throw new Error('Invalid expression');
        }

        const result = safeEval(expression);
        res.json({ result: result.toString() });
    } catch (error) {
        console.error(`Error calculating expression: ${expression}`, error);
        res.status(400).json({ error: error.message || 'Error occurred during calculation' });
    }
});

app.listen(port, () => {
    console.log(`Calculator API running on http://localhost:${port}`);
});
