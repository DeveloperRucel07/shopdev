import { Component, computed, input, signal, EventEmitter, inject} from '@angular/core';
import { Product } from '../../models/product';
import { ProductCard } from '../../shared/product-card/product-card';
import {MatSidenavModule, MatSidenavContainer, MatSidenavContent, MatSidenav } from '@angular/material/sidenav';
import {MatNavList, MatListModule  } from '@angular/material/list';
import { RouterLink } from "@angular/router";
import { TitleCasePipe } from '@angular/common';
import { EcommerceStore } from '../../store';
import { ToggleWishlistButton } from "../../layout/toggle-wishlist-button/toggle-wishlist-button";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-products',
  imports: [ProductCard, MatSidenavModule, MatSidenavContainer, MatSidenavContent, MatSidenav, MatNavList, RouterLink, TitleCasePipe, MatListModule, ToggleWishlistButton, MatIcon],
  templateUrl: './products.html',
  styleUrl: './products.scss'
})
export class Products {
  category = input<string>('All');
  store = inject(EcommerceStore)
  categories = signal<string[]>([
    'All',
    'Electronics',
    'Beauty & Personal Care',
    'Fashion',
    'Home & Living',
    'Gaming & Accessories'
  ])

  constructor(){
    this.store.setCategory(this.category)
  }

  addToCart(){

  }

}
