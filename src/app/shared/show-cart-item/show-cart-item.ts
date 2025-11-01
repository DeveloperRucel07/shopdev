import { Component, computed, inject, input } from '@angular/core';
import { Cart } from '../../models/cart';
import { QuantitySelector } from "../quantity-selector/quantity-selector";
import { EcommerceStore } from '../../store';
import { MatIcon } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: 'app-show-cart-item',
  imports: [QuantitySelector, MatIcon, MatButtonModule],
  templateUrl: './show-cart-item.html',
  styleUrl: './show-cart-item.scss'
})
export class ShowCartItem {

  item = input.required<Cart>();
  store = inject(EcommerceStore);
  totalprice = computed(()=> (this.item().product.price * this.item().quantity).toFixed(2));

}
