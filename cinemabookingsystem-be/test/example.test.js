import { assert } from 'chai';
import { myFunction } from './myFunction.js';

describe('My Function Tests', function () {
    it('should return 4 when adding 2 and 2', function () {
        const result = myFunction(2, 2);
        assert.equal(result, 4);
    });
});
