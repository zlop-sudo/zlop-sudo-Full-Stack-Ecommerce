import { CartItem } from "./cart-item";

export class OrderItem {
    imageUrl: string;
    unitPrice: number;
    quanity: number;
    productId: string;

    constructor(cartItem: CartItem) {
        this.imageUrl = cartItem.imageUrl;
        this.unitPrice = cartItem.unitPrice;
        this.quanity = cartItem.quantity;
        this.productId = String(cartItem.id);
    }
}
