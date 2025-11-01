import { Component, input, output } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-quantity-selector',
  imports: [MatIconButton, MatIcon],
  templateUrl: './quantity-selector.html',
  styleUrl: './quantity-selector.scss'
})
export class QuantitySelector {

  quantity = input(0);
  quantityUpdated = output<number>();


}
