import { signal, computed, effect, inject, runInInjectionContext, EnvironmentInjector, Injector } from '@angular/core';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
}

const savedCart = localStorage.getItem('cart');
export const cart = signal<CartItem[]>(savedCart ? JSON.parse(savedCart) : []);

export const totalPrice = computed(() =>
  cart().reduce((acc, item) => acc + item.price * item.qty, 0)
);

// save to localStorage on every change
// runInInjectionContext(Injector,()=>{
effect(() => {
  localStorage.setItem('cart', JSON.stringify(cart()));
});
// })



export function addToCart(product: CartItem) {
  const items = cart();
  const existing = items.find(i => i.id === product.id);
  if (existing) {
    existing.qty++;
    cart.set([...items]);
  } else {
    cart.set([...items, { ...product, qty: 1 }]);
  }
}

export function removeFromCart(id: number) {
  cart.set(cart().filter(i => i.id !== id));
}

export function increaseQty(id: number) {
  const items = cart();
  const item = items.find(i => i.id === id);
  if (item) {
    item.qty++;
    cart.set([...items]);
  }
}

export function decreaseQty(id: number) {
  const items = cart();
  const item = items.find(i => i.id === id);
  if (item && item.qty > 1) {
    item.qty--;
    cart.set([...items]);
  } else {
    removeFromCart(id);
  }
}
