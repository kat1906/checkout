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
    describe('addItem', () => {
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
        it('Takes into account any discount for items', () => {
            let checkout1 = new Checkout(prices);
            checkout1.addItem('A');
            checkout1.addItem('A');
            checkout1.addItem('A');
            expect(checkout1.subtotal).to.equal(140);
            expect(Object.keys(checkout1.basket).length).to.equal(1);
            expect(checkout1.basket.A).to.equal(3);
            checkout1.addItem('A');
            checkout1.addItem('A');
            checkout1.addItem('A');
            expect(checkout1.subtotal).to.equal(280);
            expect(Object.keys(checkout1.basket).length).to.equal(1);
            expect(checkout1.basket.A).to.equal(6);

            let checkout2 = new Checkout(prices);
            checkout2.addItem('B');
            checkout2.addItem('B');
            expect(checkout2.subtotal).to.equal(60);
            expect(Object.keys(checkout2.basket).length).to.equal(1);
            expect(checkout2.basket.B).to.equal(2);
            checkout2.addItem('B');
            checkout2.addItem('B');
            expect(checkout2.subtotal).to.equal(120);
            expect(Object.keys(checkout2.basket).length).to.equal(1);
            expect(checkout2.basket.B).to.equal(4);

            let checkout3 = new Checkout(prices);
            checkout3.addItem('C');
            checkout3.addItem('C');
            checkout3.addItem('C');
            checkout3.addItem('C');
            expect(checkout3.subtotal).to.equal(100);
            expect(Object.keys(checkout3.basket).length).to.equal(1);
            expect(checkout3.basket.C).to.equal(4);
        });
    });
    describe('viewBasket', () => {
        it('Shows current basket when queried', () => {
            let checkout1 = new Checkout(prices);
            checkout1.addItem('A');
            checkout1.addItem('B');
            checkout1.addItem('C');
            checkout1.addItem('D');
            let currentBasket = checkout1.viewBasket();
            expect(currentBasket).to.be.a.toString('string');
            expect(currentBasket).to.equal('1 A, 1 B, 1 C, 1 D');
        });
    });
    describe('getSubtotal', () => {
        it('Returns subtotal when queried', () => {
            let checkout1 = new Checkout(prices);
            checkout1.addItem('A');
            checkout1.addItem('B');
            checkout1.addItem('C');
            checkout1.addItem('D');
            let subtotal = checkout1.getSubtotal();
            expect(subtotal).to.be.a('string');
            expect(subtotal).to.equal('£122');
        });
    });
    describe('removeItem', () => {
        it('Removes an item from the basket', () => {
            let checkout1 = new Checkout(prices);
            checkout1.addItem('A');
            checkout1.addItem('B');
            checkout1.addItem('C');
            checkout1.addItem('D');
            checkout1.removeItem('A');
            let subtotal = checkout1.getSubtotal();
            expect(subtotal).to.equal('£72');
            expect(checkout1.basket.A).to.equal(0);
        });
        it('Takes into account discount previously applied when item is removed from the basket', () => {
            let checkout1 = new Checkout(prices);
            checkout1.addItem('A');
            checkout1.addItem('A');
            checkout1.addItem('A');
            checkout1.removeItem('A');
            let subtotal = checkout1.getSubtotal();
            expect(subtotal).to.equal('£100');
            expect(checkout1.basket.A).to.equal(2);
        });
    });
});