import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo : 'products/All'
    },
    { path: 'products/:category', loadComponent: () => import('./pages/products/products').then(m => m.Products) },
    { path: 'wishlist', loadComponent: () => import('./pages/wish-list/wish-list').then(m => m.WishList) },
    { path: 'my_cart', loadComponent: () => import('./pages/cart-list/cart-list').then(m => m.CartList) },

];
