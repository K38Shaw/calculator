// calculator-services.js
const safeEval = require('safe-eval');

/**
 * Evaluates a mathematical expression safely.
 * @param {string} expression - The expression to evaluate.
 * @returns {number|string} - The evaluated result.
 * @throws {Error} - Throws an error if the expression is invalid or if there's a division by zero.
 */
function evaluateExpression(expression) {
    if (!expression || typeof expression !== 'string') {
        throw new Error('Invalid expression');
    }

    // Check for division by zero
    if (/\/\s*0/.test(expression)) {
        throw new Error('Division by zero is not allowed');
    }

    // Perform the evaluation using safeEval
    return safeEval(expression);
}

module.exports = {
    evaluateExpression,
};
