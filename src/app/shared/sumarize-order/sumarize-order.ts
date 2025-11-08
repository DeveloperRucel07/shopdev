import { Component, computed, inject } from '@angular/core';
import { EcommerceStore } from '../../store';

@Component({
  selector: 'app-sumarize-order',
  imports: [],
  templateUrl: './sumarize-order.html',
  styleUrl: './sumarize-order.scss'
})
export class SumarizeOrder {

  taxPercentage:number = 0.00;
  store = inject(EcommerceStore);
  subTotal = computed<number>(()=> Number((this.store.cartItems().reduce((acc, item) => acc + (item.product.price * item.quantity), 0)).toFixed(2)));
  tax = computed<number>(()=> Number((this.subTotal() * this.taxPercentage).toFixed(2)));

  total = computed(()=> (this.subTotal() - this.tax()).toFixed(2));

}
