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

    {
        path: 'checkout',
        loadComponent: () => import('./pages/checkout/checkout').then(m => m.Checkout)
    },
    {
        path: 'order_success',
        loadComponent: () => import('./pages/checkout-success/checkout-success').then(m => m.CheckoutSuccess)
    },
    {
        path: 'product/:productId',
        loadComponent: () => import('./pages/product-detail/product-detail').then(m => m.ProductDetail)
    },
    {
        path: 'imprint',
        loadComponent: () => import('./pages/imprint/imprint').then(m => m.Imprint)
    }


];
