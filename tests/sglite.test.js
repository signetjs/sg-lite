const { assert } = require('chai');

const sgliteFactory = require('../index');

describe("SG-Lite core functionality", function(){
   
    let sglite;

    before(function(){
        sglite = sgliteFactory();
    });

    describe('isTypeOf', function() {

        it('returns true when called with any and a value', function () {
            const anyCheckResult = sglite.isTypeOf(sglite.types.any)('This is a string');

            assert.isTrue(anyCheckResult, 'Any check failed to return true');
        });

        it('returns false when called with number and a value which is not a number', function () {
            const numberCheckResult = sglite.isTypeOf(sglite.types.number)('not a number');

            assert.isFalse(numberCheckResult, 'Number check passed when it should have failed');
        });

    });

    describe('subtype', function () {
        it('defines a new type as a subtype of another', function () {
            sglite.subtype('number')('positiveNumber', function(value) {
                return !(value < 0);
            });

            const valueTest = sglite.isTypeOf(sglite.types.positiveNumber)(-1);
            assert.isFalse(valueTest, 'Value was not properly verified against positiveNumber');
        });
    });

});