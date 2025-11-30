import { Component, computed, inject, input, output } from '@angular/core';
import { Product } from '../../models/product';
import { MatAnchor } from "@angular/material/button";
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink } from "@angular/router";
import { EcommerceStore } from '../../store';
import { StarRating } from "../star-rating/star-rating";
import { ClickStopPropagation } from "../../directives/stop-propagation";

@Component({
  selector: 'app-product-card',
  imports: [MatAnchor, MatIconModule, MatButtonModule, RouterLink, StarRating, ClickStopPropagation],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss'
})
export class ProductCard {
  product = input.required<Product>();
  addToCardInfo = output<Product>();
  addedToWishlist:boolean = false;
  store = inject(EcommerceStore);

}
