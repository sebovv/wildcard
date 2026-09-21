import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Shop } from './features/shop/shop';
import { ProductDetails } from './features/shop/product-details/product-details';
import { TestError } from './features/test-error/test-error';
import { NotFound } from './shared/components/not-found/not-found';
import { ServerError } from './shared/components/server-error/server-error';
import { Cart } from './features/cart/cart';
import { CheckoutComponent } from './features/checkout.component/checkout.component';

export const routes: Routes = [
    { path: '', component: Home, },
    { path: 'shop', component: Shop, },
    { path: 'shop/:id', component: ProductDetails, },
    { path: 'cart', component: Cart, },
    { path: 'test-error', component: TestError },
    { path: 'not-found', component: NotFound },
    { path: 'server-error', component: ServerError },
    { path: 'checkout', component: CheckoutComponent },

    { path: '**', redirectTo: 'not-found', pathMatch: 'full' },

];
