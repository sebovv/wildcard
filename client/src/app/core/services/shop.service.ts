import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Pagination } from '../../shared/models/pagination';
import { Product } from '../../shared/models/product';
import { ShopParams } from '../../shared/models/shopParams';

@Service()
export class ShopService {
    private baseUrl: string = 'https://localhost:5001/api/'
    private http = inject(HttpClient);

    public brands: string[] = [];
    public types: string[] = [];

    getProducts(shopParams: ShopParams) {
        let params = new HttpParams();

        if (shopParams.brands.length > 0) {
            params = params.append('brands', shopParams.brands.join(','))
        }

        if (shopParams.types.length > 0) {
            params = params.append('types', shopParams.types.join(','))
        }

        if (shopParams.sort) {
            params = params.append('sort', shopParams.sort)
        }

        params = params.append('pageSize', shopParams.pageSize);
        params = params.append('pageIndex', shopParams.pageNumber);
        if (shopParams.search) {
            params = params.append('search', shopParams.search);
        }

        return this.http.get<Pagination<Product>>(this.baseUrl + 'products', { params });
    }

    getProduct(id: number) {
        return this.http.get<Product>(this.baseUrl + 'products/' + id);
    }

    getBrands() {
        if (this.brands.length > 0) {
            return;
        }

        return this.http.get<string[]>(this.baseUrl + 'products/brands').subscribe({
            next: response => this.brands = response,
            error: error => console.log(error),
        })
    }

    getTypes() {
        if (this.types.length > 0) {
            return;
        }

        return this.http.get<string[]>(this.baseUrl + 'products/types').subscribe({
            next: response => this.types = response,
            error: error => console.log(error),
        })
    }
}
