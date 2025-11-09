import { Component } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { BackButton } from "../../layout/back-button/back-button";

@Component({
  selector: 'app-checkout-success',
  imports: [MatIcon, BackButton],
  templateUrl: './checkout-success.html',
  styleUrl: './checkout-success.scss'
})
export class CheckoutSuccess {

}
