import { Component, Input } from '@angular/core';
import { Product } from '../../../shared/models/product';
import { MatCard, MatCardContent, MatCardActions } from '@angular/material/card';
import { CurrencyPipe } from '@angular/common';
import { MatAnchor } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { RouterLink } from "@angular/router";

@Component({
  imports: [MatCard, MatCardContent, CurrencyPipe, MatCardActions, MatAnchor, MatIcon, RouterLink],
  selector: 'app-product-item',
  styleUrl: './product-item.css',
  templateUrl: './product-item.html',
})
export class ProductItem {
  @Input() product?: Product;
}
