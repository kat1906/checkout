const { expect } = require('chai');
const Checkout = require('./main');

let prices = {
    A: {
        price: 50,
        discountQuantity: 3,
        discount: -10
    },
    B: {
        price: 35,
        discountQuantity: 2,
        discount: -10
    },
    C: {
        price: 25
    },
    D: {
        price: 12
    }
}

describe('Checkout', () => {
    it('Makes new object', () => {
        let checkout1 = new Checkout();
        expect(checkout1).to.be.an('object');
    });
    it('Adds one item to the basket', () => {
        let checkout1 = new Checkout(prices);
        checkout1.addItem('A');
        expect(checkout1.subtotal).to.equal(50);
        expect(Object.keys(checkout1.basket).length).to.equal(1);
        expect(Object.keys(checkout1.basket)[0]).to.equal('A');
        expect(checkout1.basket.A).to.equal(1);
    });
});