import { Component, } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../cart-service';


@Component({
  selector: 'app-product',
  imports: [CurrencyPipe],
  templateUrl: './product.html',
  styleUrl: './product.css'
})
export class Product {
  products = [
    {
      id: 1,
      name: 'Dell Inspiron 3535, Windows 11 Home',
      image: "https://m.media-amazon.com/images/I/61Kfqt-h5-L._SX679_.jpg",
      description: 'laptop',
      price: 80000
    },
    {
      id: 2, name: 'HP H200 On Ear Wireless Headset, Black',
      image: 'https://m.media-amazon.com/images/I/61OGCbKb5VL._AC_UY327_FMwebp_QL65_.jpg', description: 'headphone', price: 3000
    },
    {
      id: 3, name: 'HP M190 Wireless Mouse (AB3C6AA)',
      description: 'mouse', price: 1000
    },
    {
      id: 4,
      name: 'LEOTUDE Men Polycotton  Sleeve Tshirt',
      description: 'Cool cotton t-shirt',
      price: 499,
      image: 'assets/tshirt.jpg',
    },
    {
      id: 5,
      name: 'Hoodie',
      description: 'Winter warm hoodie',
      price: 899,
      image: 'assets/hoodie.jpg',
    },
    {
      id: 6,
      name: 'Cap',
      description: 'Stylish cap',
      price: 299,
      image: 'assets/cap.jpg',
    },
  ];
  constructor(public cartService:CartService) { }


  add(item: any) {
    this.cartService.addToCart(item);
  }

}
