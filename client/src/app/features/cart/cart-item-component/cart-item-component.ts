import { Component, inject, input, Pipe } from '@angular/core';
import { CartItem } from '../../../shared/models/cart';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { CurrencyPipe } from '@angular/common';
import { MatButton, MatIconButton } from '@angular/material/button';
import { CartService } from '../../../core/services/cart.service';

@Component({
  imports: [RouterLink, MatIconButton, MatIcon, CurrencyPipe, MatButton],
  selector: 'app-cart-item-component',
  styleUrl: './cart-item-component.css',
  templateUrl: './cart-item-component.html',
})
export class CartItemComponent {
  item = input.required<CartItem>();
  cartService = inject(CartService);

  incremetQuantity() {
    this.cartService.addItemToCart(this.item(), 1);
  }

  decrementQuantity() {
    this.cartService.removeItemFromCart(this.item().productId, 1);
  }

  removeItemFromCart() {
    this.cartService.removeItemFromCart(this.item().productId, this.item().quantity);
  }
}
