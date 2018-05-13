class Checkout {
    constructor(prices) {
        this.prices = prices;
        this.basket = {};
        this.subtotal = 0;
    }
    addItem(item) {
        this.basket[item] ? this.basket[item]++ : this.basket[item] = 1;

        this.subtotal += this.prices[item].price;

        if (this.prices[item].discount) {
            if (this.basket[item] % this.prices[item].discountQuantity === 0) this.subtotal += this.prices[item].discount;
        }
        return this.basket;
    }
    removeItem(item) {
        if (this.basket[item] % this.prices[item].discountQuantity === 0) this.subtotal -= this.prices[item].discount;
        this.basket[item]--;
        this.subtotal -= this.prices[item].price;
    }
    viewBasket() {
        return Object.keys(this.basket).reduce((acc, item) => {
            acc.push(`${this.basket[item]} ${item}`);
            return acc;
        }, []).join(', ');
    }
    getSubtotal() {
        return `£${this.subtotal}`;
    }
}

module.exports = Checkout;
