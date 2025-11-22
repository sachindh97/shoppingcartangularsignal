import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../cart-service';
import { CurrencyPipe } from '@angular/common';
@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart {
 constructor(
    private router: Router,
    public cartService: CartService
  ) {}

  increase(id: number) {
    this.cartService.increaseQty(id);
  }

  decrease(id: number) {
    this.cartService.decreaseQty(id);
  }

  remove(id: number) {
    this.cartService.removeFromCart(id);
  }

  clear() {
    this.cartService.clearCart();
  }

  back() {
    this.router.navigate(['/']);
  }
}
