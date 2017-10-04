const UNKNOWN = -2;
const UNAVAILABLE = -1;
const log = require('debug')('PackService');

/**
 * Class that will hold calculate result
 * as well as handy methods
 */
class PackResult {
    constructor() {
        this.packQty = UNKNOWN;
        this.packs = [];
    }

    isPackUnknown() {
        return this.packQty === UNKNOWN;
    }

    isPackUnavailable() {
        return this.packQty === UNAVAILABLE;
    }

    setPackQtyUnavailable() {
        this.packQty = UNAVAILABLE;
    }

    setPackQty(val) {
        this.packQty = val;
    }

    getPackQty() {
        return this.packQty;
    }

    addPack(p) {
        this.packs.push(p);
    }

    setPacks(ps) {
        this.packs = (ps || []).slice();
    }

    getPacks() {
        return this.packs;
    }

    /**
     * Given sub result, update the current result
     * @param {*} another 
     * @param {*} p 
     */
    updateFromSub(another, p) {
        log('updateFromSub', another, p);
        if (another) {
            this.packQty = another.packQty + 1;
            this.packs = another.packs, this.packs.push(p);
        }
    }
}

module.exports = PackResult;