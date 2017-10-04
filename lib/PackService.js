const env = process.env.NODE_ENV || 'dev';
const filename = '../bakery.' + env + '.json';
const bakeryData = require(filename);


const PackResult = require('./PackResult');
const log = require('debug')('PackService');


/**
 * Class handle pack related process
 */
class PackService {
    constructor() {
    }

    getBakeryMetadata(code) {
        return bakeryData[code];
    }

    getBakeryPackOptions(code) {
        let bakery = this.getBakeryMetadata(code);
        return bakery ? Object.keys(bakery.packs).map(x => { return parseInt(x); }).sort((a, b) => { return b - a; }) : null;
    }

    calculatePrice(code, packResult) {
        let bakery = this.getBakeryMetadata(code);
        let result = { code, qty: 0, totalPrice: 0, breakdown: {} };
        packResult && packResult.getPacks().forEach(p => {
            let key = '' + p;
            result.qty += p;
            result.totalPrice += bakery.packs[key];
            result.breakdown[key] = result.breakdown[key] || { qty: 0, name: key + ' $' + bakery.packs[key].toFixed(2) }, result.breakdown[key].qty++;
        });
        return result;
    }

    /**
     * Given pack options and quantity, generate the result which contains
     * number of packs, and packs used (as array)
     * @param {*} packs Pack options as array
     * @param {*} quantity Quantity as integer
     */
    calcuateMinPacks(packs, quantity) {
        log('calcuateMinPacks Start', packs, quantity);

        let result = new PackResult(), minResult, minP;
        // Loop through all the pack options
        for (let idx in (packs || [])) {
            let p = packs[idx];
            // If the given quantity is same as the pack size
            if (quantity === p) {
                // Set pack quantity to 1, add current pack to result, then return (best match)
                result.setPackQty(1), result.addPack(p);
                break;
            }
            // If the given quantity is bigger than current pack size
            else if (quantity > p) {
                // Calculate the result by passing in same pack options, and quantity - current pack size
                let subresult = this.calcuateMinPacks(packs, quantity - p);
                if (!subresult.isPackUnavailable()) {
                    // If pack can be generated, then compare with current minimum
                    // If number of packs is less than current min, then mark it as min
                    if (!minResult || minResult.getPackQty() > subresult.getPackQty())
                        minResult = subresult, minP = p;
                } else // if no pack available for quantity - current pack size then mark the current result unavailable
                    result.setPackQtyUnavailable();
            } else // quantity less than current pack size, return unavailable result
                result.setPackQtyUnavailable();
        }
        // Update current result based on sub result
        result.updateFromSub(minResult, minP);
        log('calcuateMinPacks End', packs, quantity, result);
        return result;
    }

    processOrder(code, qty) {
        let packOptions = this.getBakeryPackOptions(code);
        if (isNaN(+qty) || qty < 1) throw new Error('Invalid qty ' + qty);
        if (!packOptions || packOptions.length === 0) throw new Error('Bakery not found by code ' + code);
        let packResult = this.calcuateMinPacks(packOptions, qty);
        if (packResult.isPackUnavailable()) throw new Error('Cannot create packs for ' + qty + ', please try another quantity.');

        return this.calculatePrice(code, packResult);
    }
}

module.exports = PackService;