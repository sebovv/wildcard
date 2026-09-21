import { Component, inject, Pipe } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatAnchor, MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/select';
import { MatInput } from '@angular/material/input';
import { CartService } from '../../../core/services/cart.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  imports: [RouterLink, MatAnchor, MatButton, MatFormField, MatLabel, MatInput, CurrencyPipe],
  selector: 'app-order-summary',
  styleUrl: './order-summary.css',
  templateUrl: './order-summary.html',
})
export class OrderSummary {
  cartService = inject(CartService);
}
