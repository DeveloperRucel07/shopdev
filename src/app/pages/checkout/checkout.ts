import { Component, inject } from '@angular/core';
import { SumarizeOrder } from "../../shared/sumarize-order/sumarize-order";
import { BackButton } from "../../layout/back-button/back-button";
import { EcommerceStore } from '../../store';
import { ShippingForm } from "./shipping-form/shipping-form";
import { PayementForm } from "./payement-form/payement-form";
import { MatButton } from '@angular/material/button';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-checkout',
  imports: [SumarizeOrder, BackButton, ShippingForm, PayementForm, MatButton, DecimalPipe],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss'
})
export class Checkout {

  store = inject(EcommerceStore);

}
