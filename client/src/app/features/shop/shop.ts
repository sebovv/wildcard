import { Component, inject, OnInit, signal } from '@angular/core';
import { Product } from '../../shared/models/product';
import { ShopService } from '../../core/services/shop.service';
import { ProductItem } from "./product-item/product-item";
import { MatDialog } from '@angular/material/dialog';
import { FiltersDialog } from './filters-dialog/filters-dialog';
import { MatAnchor, MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { MatListOption, MatSelectionList, MatSelectionListChange } from '@angular/material/list';
import { ShopParams } from '../../shared/models/shopParams';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Pagination } from '../../shared/models/pagination';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shop',
  imports: [
    ProductItem,
    MatAnchor,
    MatIcon,
    MatMenu,
    MatSelectionList,
    MatListOption,
    MatMenuTrigger,
    MatPaginator,
    FormsModule,
    MatIconButton
  ],
  styleUrl: './shop.css',
  templateUrl: './shop.html',
})
export class Shop implements OnInit {
  private shopService = inject(ShopService);
  private dialog = inject(MatDialog)
  protected sortOptions = signal([
    { name: 'Alfabetical', value: 'name' },
    { name: 'Price: Low-High', value: 'priceAsc' },
    { name: 'Price: High-Low', value: 'priceDesc' },
  ])

  protected shopParams: ShopParams = new ShopParams();
  protected pageSizeOptions = [5, 10, 15, 20];

  protected products = signal<Pagination<Product>>({
    pageIndex: 1,
    pageSize: 0,
    count: 0,
    data: []
  });

  ngOnInit(): void {
    this.initializeShop();
  }

  initializeShop() {
    this.shopService.getBrands();
    this.shopService.getTypes();
    this.getProducts();
  }

  getProducts() {
    this.shopService.getProducts(this.shopParams).subscribe({
      next: response => this.products.set(response),
      error: error => console.log(error),
    })
  }

  openFiltersDialog() {
    const dialogRef = this.dialog.open(FiltersDialog, {
      minWidth: '500px',
      data: {
        selectedBrands: this.shopParams.brands,
        selectedTypes: this.shopParams.types,
      }
    });

    dialogRef.afterClosed().subscribe({
      next: result => {
        if (result) {
          this.shopParams.brands = result.selectedBrands;
          this.shopParams.types = result.selectedTypes;
          this.shopParams.pageNumber = 1;
          this.getProducts();
        }
      }
    });
  }

  onSortChange($event: MatSelectionListChange) {
    const selectedOption = $event.options[0];
    if (selectedOption) {
      this.shopParams.sort = selectedOption.value;
      this.shopParams.pageNumber = 1;
      this.getProducts();
    }
  }

  onSearchChange() {
    this.shopParams.pageNumber = 1;
    this.getProducts();

  }

  handlePageEvent($event: PageEvent) {
    this.shopParams.pageNumber = $event.pageIndex + 1;
    this.shopParams.pageSize = $event.pageSize;
    this.getProducts();
  }

}
