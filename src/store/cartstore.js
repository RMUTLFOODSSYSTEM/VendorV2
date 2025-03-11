// src/store/cartstore.js
import { makeAutoObservable } from "mobx";

class CartStore {
  cart = [];

  constructor() {
    makeAutoObservable(this);
  }

  addToCart(item) {
    this.cart.push(item);
  }

  removeFromCart(itemId) {
    this.cart = this.cart.filter((item) => item.id !== itemId);
  }

  clearCart() {
    this.cart = [];
  }
}

export const cartStore = new CartStore();
