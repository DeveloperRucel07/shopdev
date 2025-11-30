import { Component, computed, inject, input, signal } from '@angular/core';
import { EcommerceStore } from '../../store';
import { BackButton } from "../../layout/back-button/back-button";
import { MatIcon } from "@angular/material/icon";
import { QuantitySelector } from "../../shared/quantity-selector/quantity-selector";
import { MatAnchor, MatIconButton } from "@angular/material/button";
import { ToggleWishlistButton } from "../../layout/toggle-wishlist-button/toggle-wishlist-button";
import { StarRating } from "../../shared/star-rating/star-rating";
import { Reviews } from "./reviews/reviews";
import { Cart } from '../../models/cart';

@Component({
  selector: 'app-product-detail',
  imports: [BackButton, MatIcon, QuantitySelector, MatAnchor, ToggleWishlistButton, MatIconButton, StarRating, Reviews],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss'
})
export class ProductDetail {

  productId = input.required<string>();
  icon = 'favorite';
  store = inject(EcommerceStore);
  backTo = computed(()=> `/products/${this.store.category()}`);
  quantity = 1;
  selectProduct = computed(()=> this.store.cartItems().find( p => p.product.id === this.productId())) 
  constructor( ){
    this.store.setProductId(this.productId);

  }

  

}
