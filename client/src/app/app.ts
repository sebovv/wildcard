import { Component, inject, OnInit, signal } from '@angular/core';
import { Header } from "./layout/header/header";
import { Product } from './shared/models/product';
import { ShopService } from './core/services/shop.service';
import { Shop } from "./features/shop/shop";

@Component({
  imports: [Header, Shop],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})

export class App {
  protected readonly title = signal('WildCard');
}
