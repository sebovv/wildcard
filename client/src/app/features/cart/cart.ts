import { Component, inject } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { CartItemComponent } from './cart-item-component/cart-item-component';
import { OrderSummary } from '../../shared/components/order-summary/order-summary';
import { EmptyStateComponent } from '../../shared/components/empty-state.component/empty-state.component';

@Component({
  imports: [CartItemComponent, OrderSummary, EmptyStateComponent],
  selector: 'app-cart',
  styleUrl: './cart.css',
  templateUrl: './cart.html',
})
export class Cart {
  cartService = inject(CartService);
}
