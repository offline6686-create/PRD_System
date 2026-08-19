class EcommerceStore {
    constructor() {
        this.products = [
            { id: 1, name: "Curso de Piano Armónico Avanzado", price: 99.00, category: "Cursos" },
            { id: 2, name: "Pack 100 Backing Tracks Pro", price: 49.00, category: "Audio" },
            { id: 3, name: "Licencia FTMO Bot Pro", price: 299.00, category: "Software" },
            { id: 4, name: "Libro Digital Armonia Moderna PDF", price: 25.00, category: "Libros" }
        ];
        this.cart = [];
    }

    addToCart(productId) {
        const product = this.products.find(p => p.id === productId);
        if (product) {
            this.cart.push(product);
        }
        return this.cart;
    }

    getCartTotal() {
        return this.cart.reduce((total, p) => total + p.price, 0.0);
    }
}

if (typeof module !== 'undefined') {
    module.exports = EcommerceStore;
}
