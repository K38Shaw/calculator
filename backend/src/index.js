// index.js
const express = require('express');
const app = express();
const port = 3000;
const { evaluateExpression } = require('./services/calculator-services'); 

app.use(express.json()); // Middleware to parse JSON request bodies

app.post('/calculate', (req, res) => {
    const { expression } = req.body;

    try {
        const result = evaluateExpression(expression);
        res.json({ result: result.toString() });
    } catch (error) {
        console.error(`Error calculating expression: ${expression}`, error);
        res.status(400).json({ error: error.message || 'Error occurred during calculation' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
