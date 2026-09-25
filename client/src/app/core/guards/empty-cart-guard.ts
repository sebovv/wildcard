import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { SnackbarService } from '../services/snackbar.service';

export const emptyCartGuard: CanActivateFn = (route, state) => {
  const cartService = inject(CartService);
  const snack = inject(SnackbarService);
  const router = inject(Router);

  const itemsInCart = cartService.itemCount();
  if (itemsInCart && itemsInCart > 0) {
    return true;
  } else {
    snack.error('Cart is empty');
    router.navigateByUrl('/cart');
    return false;
  }
};
