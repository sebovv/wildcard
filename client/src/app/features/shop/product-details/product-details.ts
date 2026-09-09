import { Component, inject, OnInit, signal } from '@angular/core';
import { ShopService } from '../../../core/services/shop.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../shared/models/product';
import { CurrencyPipe } from '@angular/common';
import { MatAnchor } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { MatFormField, MatLabel } from "@angular/material/select";
import { MatDivider } from "@angular/material/divider";
import { MatInputModule } from '@angular/material/input';

@Component({
  imports: [CurrencyPipe, MatAnchor, MatIcon, MatFormField, MatLabel, MatDivider, MatInputModule],
  selector: 'app-product-details',
  styleUrl: './product-details.css',
  templateUrl: './product-details.html',
})
export class ProductDetails implements OnInit {
  private shopService: ShopService = inject(ShopService)
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute)
  protected product = signal<Product>({
    id: 0,
    name: "string",
    description: "string",
    price: 0,
    pictureUrl: "string",
    type: "string",
    brand: "string",
    quantityInStock: 0,
  });

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (!id) {
      return;
    }
    this.shopService.getProduct(+id).subscribe({
      next: product => this.product.set(product),
      error: error => console.log(error),
    })
  }
}
