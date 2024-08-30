const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.post('/calculate', (req, res) => {
    const { expression } = req.body;

    try {
        if (expression.includes('/0')) {
            throw new Error('Division by zero is not allowed');
        }

        const result = eval(expression);
        res.json({ result: result.toString() });
    } catch (error) {
        res.status(400).json({ error: error.message || 'Error' });
    }
});

describe('Calculator API', () => {
    it('should return 4 for 2+2', async () => {
        const response = await request(app).post('/calculate').send({ expression: '2+2' });
        expect(response.body.result).toBe('4');
    });

    it('should return 0 for 2-2', async () => {
        const response = await request(app).post('/calculate').send({ expression: '2-2' });
        expect(response.body.result).toBe('0');
    });

    it('should return 4 for 2*2', async () => {
        const response = await request(app).post('/calculate').send({ expression: '2*2' });
        expect(response.body.result).toBe('4');
    });

    it('should return 2 for 4/2', async () => {
        const response = await request(app).post('/calculate').send({ expression: '4/2' });
        expect(response.body.result).toBe('2');
    });

    it('should return error for division by zero', async () => {
        const response = await request(app).post('/calculate').send({ expression: '10/0' });
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Division by zero is not allowed');
    });

    it('should return 1 for 5%2', async () => {
        const response = await request(app).post('/calculate').send({ expression: '5%2' });
        expect(response.body.result).toBe('1');
    });

    it('should return 16 for 4**2', async () => {
        const response = await request(app).post('/calculate').send({ expression: '4**2' });
        expect(response.body.result).toBe('16');
    });

    it('should return 10 for (2+3)*2', async () => {
        const response = await request(app).post('/calculate').send({ expression: '(2+3)*2' });
        expect(response.body.result).toBe('10');
    });

    it('should return -1 for -1+0', async () => {
        const response = await request(app).post('/calculate').send({ expression: '-1+0' });
        expect(response.body.result).toBe('-1');
    });

    it('should return 3.5 for 7/2', async () => {
        const response = await request(app).post('/calculate').send({ expression: '7/2' });
        expect(response.body.result).toBe('3.5');
    });

    it('should handle decimal calculations correctly for 2.5*2', async () => {
        const response = await request(app).post('/calculate').send({ expression: '2.5*2' });
        expect(response.body.result).toBe('5');
    });

    it('should handle negative number calculations for -3+7', async () => {
        const response = await request(app).post('/calculate').send({ expression: '-3+7' });
        expect(response.body.result).toBe('4');
    });

    it('should handle multiple operator expressions correctly for 3+5*2', async () => {
        const response = await request(app).post('/calculate').send({ expression: '3+5*2' });
        expect(response.body.result).toBe('13'); // Ensures multiplication precedes addition.
    });

    it('should handle complex expressions with all operators for 3*(2+5)-10/2', async () => {
        const response = await request(app).post('/calculate').send({ expression: '3*(2+5)-10/2' });
        expect(response.body.result).toBe('16');
    });
});
