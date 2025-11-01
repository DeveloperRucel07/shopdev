import { Component, computed, inject } from '@angular/core';
import { BackButton } from "../../layout/back-button/back-button";
import { ViewCart } from "./view-cart/view-cart";
import { ViewPanel } from "../../directives/view-panel";
import { MatIcon } from "@angular/material/icon";
import { EcommerceStore } from '../../store';
import { RouterLink } from "@angular/router";
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-cart-list',
  imports: [BackButton, ViewCart, ViewPanel, MatIcon, RouterLink, MatButtonModule],
  templateUrl: './cart-list.html',
  styleUrl: './cart-list.scss'
})
export class CartList {
  taxPercentage:number = 0.005;
  store = inject(EcommerceStore);
  subTotal = computed<number>(()=> Number((this.store.cartItems().reduce((acc, item) => acc + (item.product.price * item.quantity), 0)).toFixed(2)));
  tax = computed<number>(()=> Number((this.subTotal() * this.taxPercentage).toFixed(2)));

  total = computed(()=> (this.subTotal() - this.tax()).toFixed(2));

}
