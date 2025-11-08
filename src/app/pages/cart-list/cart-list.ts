import { Component, computed, inject } from '@angular/core';
import { BackButton } from "../../layout/back-button/back-button";
import { ViewCart } from "./view-cart/view-cart";
import { ViewPanel } from "../../directives/view-panel";
import { MatIcon } from "@angular/material/icon";
import { EcommerceStore } from '../../store';
import { RouterLink } from "@angular/router";
import { MatButtonModule } from '@angular/material/button';
import { SumarizeOrder } from "../../shared/sumarize-order/sumarize-order";

@Component({
  selector: 'app-cart-list',
  imports: [BackButton, ViewCart, ViewPanel, MatIcon, RouterLink, MatButtonModule, SumarizeOrder],
  templateUrl: './cart-list.html',
  styleUrl: './cart-list.scss'
})
export class CartList {
  store = inject(EcommerceStore);

}
