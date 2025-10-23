import { Component, inject } from '@angular/core';
import { BackButton } from "../../layout/back-button/back-button";
import { EcommerceStore } from '../../store';
import { ProductCard } from "../../shared/product-card/product-card";
import { MatButton} from '@angular/material/button';
import { MatIcon } from "@angular/material/icon";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-wish-list',
  imports: [BackButton, ProductCard, MatIcon, MatButton, RouterLink],
  templateUrl: './wish-list.html',
  styleUrl: './wish-list.scss'
})
export class WishList {
  store = inject(EcommerceStore);

}
