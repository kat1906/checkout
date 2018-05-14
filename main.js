class Checkout {
    constructor(prices) {
        this.prices = prices;
        this.basket = {};
        this.subtotal = 0;
    }
    addItem(item) {
        if (!this.prices[item]) return { error: 'This item does not have a price'};
        const discount = this.prices[item].discount;
        this.basket[item] ? this.basket[item]++ : this.basket[item] = 1;

        this.subtotal += this.prices[item].price;

        if (discount && this.basket[item] % this.prices[item].discountQuantity === 0) this.subtotal += discount;
        return this.basket;
    }
    removeItem(item) {
        if (!this.basket[item]) return { error: 'This item cannot be removed - it is not in the basket' };
        if (this.basket[item] % this.prices[item].discountQuantity === 0) this.subtotal -= this.prices[item].discount;
        this.basket[item] === 1 ? delete this.basket[item] : this.basket[item]--;
        this.subtotal -= this.prices[item].price;
    }
    viewBasket() {
        return this.basket;
    }
    getSubtotal() {
        return { subtotal: this.subtotal };
    }
}

module.exports = Checkout;
