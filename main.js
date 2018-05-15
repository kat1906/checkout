class Checkout {
    constructor(prices) {
        this.prices = prices;
        this.basket = {};
        this.subtotal = 0;
    }
    addItem(item) {
        if (item === undefined) return {error: 'No item specified'};
        const itemPrice = this.prices[item];
        if (!itemPrice) return { error: 'This item does not have a price'};
        const discount = itemPrice.discount;
        this.basket[item] ? this.basket[item]++ : this.basket[item] = 1;
        this.subtotal += itemPrice.price;
        if (discount && this.basket[item] % itemPrice.discountQuantity === 0) this.subtotal += discount;
        return this.basket;
    }
    removeItem(item) {
        if (item === undefined) return {error: 'No item specified'};
        const itemPrice = this.prices[item];
        if (!this.basket[item]) return { error: 'This item cannot be removed - it is not in the basket' };
        if (this.basket[item] % itemPrice.discountQuantity === 0) this.subtotal -= itemPrice.discount;
        this.basket[item] === 1 ? delete this.basket[item] : this.basket[item]--;
        this.subtotal -= itemPrice.price;
        return this.basket;
    }
    viewBasket() {
        return this.basket;
    }
    getSubtotal() {
        return { subtotal: this.subtotal };
    }
}

module.exports = Checkout;
