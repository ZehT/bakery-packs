const chai = require('chai');  
const expect = require('chai').expect;

const PackService = require('../lib/PackService'); 

var service;


describe('PackService', () => {
    let service;

    beforeEach(() => {
        service = new PackService();
    });

    it('should produce PackQty=10, Packs=[5, 5] given pack options [3,5] and Qty 10', () => {
        var qty = 10, packs = [3,5], resultQty = 2, resultPacks = [5, 5];
        var result = service.calcuateMinPacks(packs, qty);
        expect(result.packQty).to.equal(2);
        expect(result.packs.sort()).to.deep.equal(resultPacks);
    });

    it('should produce PackQty=4, Packs=[2, 2, 2, 8] given pack options [2,5,8] and Qty 14', () => {
        var qty = 14, packs = [2,5,8], resultQty = 4, resultPacks = [2, 2, 2, 8];
        var result = service.calcuateMinPacks(packs, qty);
        expect(result.packQty).to.equal(resultQty);
        expect(result.packs.sort()).to.deep.equal(resultPacks);
    });

    it('should produce PackQty=3, Packs=[3, 5, 5] given pack options [3,5,9] and Qty 13', () => {
        var qty = 13, packs = [3,5,9], resultQty = 3, resultPacks = [3, 5, 5];
        var result = service.calcuateMinPacks(packs, qty);
        expect(result.packQty).to.equal(resultQty);
        expect(result.packs.sort()).to.deep.equal(resultPacks);
    });

    it('should produce PackQty=4, Packs=[9, 9, 9, 9] given pack options [2,9,10] and Qty 36', () => {
        var qty = 36, packs = [2,9,10], resultQty = 4, resultPacks = [9, 9, 9, 9];
        var result = service.calcuateMinPacks(packs, qty);
        expect(result.packQty).to.equal(resultQty);
        expect(result.packs.sort()).to.deep.equal(resultPacks);
    });

    // For qty less than any of the pack size, should return -2 (unavailable)
    it('should produce PackQty=-2, Packs=[] given pack options [5,8] and Qty 3', () => {
        var qty = 3, packs = [5], resultQty = -2, resultPacks = [];
        var result = service.calcuateMinPacks(packs, qty);
        expect(result.packQty).to.equal(resultQty);
        expect(result.packs.sort()).to.deep.equal(resultPacks);
    });

    // For qty same as one of the pack size, should always return 1
    it('should produce PackQty=1, Packs=[] given pack options [5, 8] and Qty 5', () => {
        var qty = 5, packs = [5], resultQty = 1, resultPacks = [5];
        var result = service.calcuateMinPacks(packs, qty);
        expect(result.packQty).to.equal(resultQty);
        expect(result.packs.sort()).to.deep.equal(resultPacks);
    });

    it('should produce PackQty=-2, Packs=[] given empty pack options and Qty 5', () => {
        var qty = 5, packs = null, resultQty = -2, resultPacks = [];
        var result = service.calcuateMinPacks(packs, qty);
        expect(result.packQty).to.equal(resultQty);
        expect(result.packs.sort()).to.deep.equal(resultPacks);
    });

});