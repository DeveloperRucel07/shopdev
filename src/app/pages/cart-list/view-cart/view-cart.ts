import { Component, inject } from '@angular/core';
import { ViewPanel } from "../../../directives/view-panel";
import { EcommerceStore } from '../../../store';
import { ShowCartItem } from "../../../shared/show-cart-item/show-cart-item";

@Component({
  selector: 'app-view-cart',
  imports: [ViewPanel, ShowCartItem],
  templateUrl: './view-cart.html',
  styleUrl: './view-cart.scss'
})
export class ViewCart {

  store = inject(EcommerceStore);

}
