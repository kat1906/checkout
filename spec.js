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
            expect(checkout1.basket).to.eql({A: 1});
        });
        it('Adds multiple items to the basket', () => {
            let checkout1 = new Checkout(prices);
            checkout1.addItem('A');
            checkout1.addItem('B');
            checkout1.addItem('C');
            checkout1.addItem('D');
            expect(checkout1.subtotal).to.equal(122);
            expect(checkout1.basket).to.eql({A: 1, B: 1, C: 1, D:1});
        });
        it('Takes into account any discount for items', () => {
            let checkout1 = new Checkout(prices);
            checkout1.addItem('A');
            checkout1.addItem('A');
            checkout1.addItem('A');
            expect(checkout1.subtotal).to.equal(140);
            expect(checkout1.basket).to.eql({A: 3});
            checkout1.addItem('A');
            checkout1.addItem('A');
            checkout1.addItem('A');
            expect(checkout1.subtotal).to.equal(280);
            expect(checkout1.basket).to.eql({A: 6});

            let checkout2 = new Checkout(prices);
            checkout2.addItem('B');
            checkout2.addItem('B');
            expect(checkout2.subtotal).to.equal(60);
            expect(checkout2.basket).to.eql({B: 2});
            checkout2.addItem('B');
            checkout2.addItem('B');
            expect(checkout2.subtotal).to.equal(120);
            expect(checkout2.basket).to.eql({B: 4});

            let checkout3 = new Checkout(prices);
            checkout3.addItem('C');
            checkout3.addItem('C');
            checkout3.addItem('C');
            checkout3.addItem('C');
            expect(checkout3.subtotal).to.equal(100);
            expect(checkout3.basket).to.eql({C: 4});
        });
        it('Returns error if the item is not in the price list', () => {
            let checkout1 = new Checkout(prices);
            let addItemE = checkout1.addItem('E');
            expect(addItemE).to.eql({error: 'This item does not have a price'});
        });
        it('Returns error if no item is specified', () => {
            let checkout1 = new Checkout(prices);
            let addItemE = checkout1.addItem();
            expect(addItemE).to.eql({error: 'No item specified'});
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
            expect(currentBasket).to.be.an('object');
            expect(currentBasket).to.eql({A: 1, B: 1, C: 1, D: 1});
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
            expect(subtotal).to.be.an('object');
            expect(subtotal).to.eql({subtotal: 122});
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
            expect(subtotal).to.eql({subtotal: 72});
            expect(checkout1.basket).to.eql({B: 1, C: 1, D: 1});
        });
        it('Takes into account discount previously applied when item is removed from the basket', () => {
            let checkout1 = new Checkout(prices);
            checkout1.addItem('A');
            checkout1.addItem('A');
            checkout1.addItem('A');
            checkout1.removeItem('A');
            let subtotal = checkout1.getSubtotal();
            expect(subtotal).to.eql({subtotal: 100});
            expect(checkout1.basket).to.eql({A: 2});
        });
        it('Returns error if the item is not in the basket when using removeItem', () => {
            let checkout1 = new Checkout(prices);
            let removeItemE = checkout1.removeItem('E');
            expect(removeItemE).to.eql({error: 'This item cannot be removed - it is not in the basket'});
        });
    });
});