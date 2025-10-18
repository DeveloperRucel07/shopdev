import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo : 'products'
    },
    { path: 'products', loadComponent: () => import('./pages/products/products').then(m => m.Products) },
    { path: 'wishlist', loadComponent: () => import('./pages/wish-list/wish-list').then(m => m.WishList) },

];
