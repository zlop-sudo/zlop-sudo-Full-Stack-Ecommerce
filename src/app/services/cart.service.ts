import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];

  // save data in session storage
  storage: Storage = sessionStorage;
  // another option: local storage (save according to url&port)
  // storage: Storage = localStorage;

  // ReplaySubject(All previous messages) -- BehaviorSubject(latest message)
  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);
  shipping: Subject<number> = new BehaviorSubject<number>(0);

  constructor() {
    // read data from storage
    let data = JSON.parse(this.storage.getItem('cartItems'));

    if (data != null) {
      this.cartItems = data;

      // compute and public date
      this.computeCartTotals();
    }
  }

  addToCart(theCartItem: CartItem) {
    
    // check if we already have the item
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem | undefined;

    // find the item based id
    existingCartItem = this.cartItems.find(item => item.id === theCartItem.id);

    alreadyExistsInCart = (existingCartItem != undefined);

    // update this item
    if (alreadyExistsInCart) {
      existingCartItem!.quantity++;
    }
    else {
      this.cartItems.push(theCartItem);
    }
    
    // compute
    this.computeCartTotals();
  }

  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;
    let shippingValue: number = 0;

    for (let Item of this.cartItems) {
      totalPriceValue += Item.unitPrice * Item.quantity;
      totalQuantityValue += Item.quantity;
    }

    if (totalPriceValue >= 50 || totalPriceValue == 0) {
      shippingValue = 0;
    }
    else {
      shippingValue = 5;
    }

    // publish the new total values to all subscribers
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
    this.shipping.next(shippingValue);

    this.persistCartItems();
  }

  decrementQuantity(theCartItem: CartItem) {
    theCartItem.quantity--;

    if (theCartItem.quantity == 0) {
      this.remove(theCartItem);
    }
    else {
      this.computeCartTotals();
    }
  }

  remove(theCartItem: CartItem) {
    const itemIndex = this.cartItems.findIndex(item => item.id == theCartItem.id);

    if (itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1);

      this.computeCartTotals();
    }
  }

  // save cart data to session storage
  persistCartItems() {
    this.storage.setItem('cartItems', JSON.stringify(this.cartItems));
  }
}
