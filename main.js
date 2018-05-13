class Checkout {
    constructor(prices) {
        this.prices = prices;
        this.basket = {};
        this.subtotal = 0;
    }
    addItem(item) {
        if(this.basket[item]) this.basket[item]++;
        else this.basket[item] = 1;

        this.subtotal += this.prices[item].price;
        return this.basket;
    }
}

module.exports = Checkout;

// class Checkout {
//     constructor() {}
// }