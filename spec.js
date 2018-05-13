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
    it('Adds multiple items to the basket', () => {
        let checkout1 = new Checkout(prices);
        checkout1.addItem('A');
        checkout1.addItem('B');
        checkout1.addItem('C');
        checkout1.addItem('D');
        expect(checkout1.subtotal).to.equal(122);
        expect(Object.keys(checkout1.basket).length).to.equal(4);
        expect(checkout1.basket.A).to.equal(1);
        expect(checkout1.basket.B).to.equal(1);
        expect(checkout1.basket.C).to.equal(1);
        expect(checkout1.basket.D).to.equal(1);
    });
});