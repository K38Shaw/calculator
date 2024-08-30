// calculate-services.test.js
const { evaluateExpression } = require('../src/services/calculate-service');

describe('Calculator Service', () => {
    it('should return 4 for 2+2', () => {
        expect(evaluateExpression('2+2')).toBe(4);
    });

    it('should return 0 for 2-2', () => {
        expect(evaluateExpression('2-2')).toBe(0);
    });

    it('should return 4 for 2*2', () => {
        expect(evaluateExpression('2*2')).toBe(4);
    });

    it('should return 2 for 4/2', () => {
        expect(evaluateExpression('4/2')).toBe(2);
    });

    it('should throw error for division by zero', () => {
        expect(() => evaluateExpression('10/0')).toThrow('Division by zero is not allowed');
    });

    it('should return 1 for 5%2', () => {
        expect(evaluateExpression('5%2')).toBe(1);
    });

    it('should return 16 for 4**2', () => {
        expect(evaluateExpression('4**2')).toBe(16);
    });

    it('should return 10 for (2+3)*2', () => {
        expect(evaluateExpression('(2+3)*2')).toBe(10);
    });

    it('should return -1 for -1+0', () => {
        expect(evaluateExpression('-1+0')).toBe(-1);
    });

    it('should return 3.5 for 7/2', () => {
        expect(evaluateExpression('7/2')).toBe(3.5);
    });

    it('should handle decimal calculations correctly for 2.5*2', () => {
        expect(evaluateExpression('2.5*2')).toBe(5);
    });

    it('should handle negative number calculations for -3+7', () => {
        expect(evaluateExpression('-3+7')).toBe(4);
    });

    it('should handle multiple operator expressions correctly for 3+5*2', () => {
        expect(evaluateExpression('3+5*2')).toBe(13); // Ensures multiplication precedes addition.
    });

    it('should handle complex expressions with all operators for 3*(2+5)-10/2', () => {
        expect(evaluateExpression('3*(2+5)-10/2')).toBe(16);
    });
});
