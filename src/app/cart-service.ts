import { Injectable, signal, computed, effect } from '@angular/core';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  cart = signal<CartItem[]>(this.loadCart()); // Create a signal named cart const count = signal(0)
  totalPrice = computed(() =>
    this.cart().reduce((acc, item) => acc + item.price * item.qty, 0)
  );//computed Whenever its dependent signals change, it recalculates.

  constructor() {
    effect(() => {
      localStorage.setItem('cart', JSON.stringify(this.cart()));
    }); // effect() “Whenever my signals change, run this function.”
  }

  
  private loadCart(): CartItem[] {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  }

  addToCart(item: CartItem) {
    const items = this.cart();
    const existing = items.find(i => i.id === item.id);
    if (existing) {
      existing.qty++;
      this.cart.set([...items]); // set() update the signal value
    } else {
      this.cart.set([...items, { ...item, qty: 1 }]);
    }
  }

  removeFromCart(id: number) {
    this.cart.set(this.cart().filter(i => i.id !== id));
  }

  increaseQty(id: number) {
    const items = this.cart();
    const it = items.find(i => i.id === id);
    if (it) { it.qty++; this.cart.set([...items]); }
  }

  decreaseQty(id: number) {
    const items = this.cart();
    const it = items.find(i => i.id === id);
    if (it && it.qty > 1) {
      it.qty--;
      this.cart.set([...items]);
    } else {
      this.removeFromCart(id);
    }
  }

  clearCart() {
    this.cart.set([]);
  }
}
