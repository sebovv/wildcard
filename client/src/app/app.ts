import { Component, inject, OnInit, signal } from '@angular/core';
import { Header } from "./layout/header/header";
import { HttpClient } from '@angular/common/http';
import { Product } from './shared/models/product';
import { Pagination } from './shared/models/pagination';

@Component({
  imports: [Header],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})

export class App implements OnInit {
  baseUrl: string = 'https://localhost:5001/api/'
  products: Product[] = [];
  private http = inject(HttpClient);
  protected readonly title = signal('WildCard');

  ngOnInit(): void {
    this.http.get<Pagination<Product>>(this.baseUrl + 'products').subscribe({
      next: response => { this.products = response.data, console.log(response); },
      error: error => console.log(error),
      complete: () => console.log('Ok!'),
    })
  }
}
