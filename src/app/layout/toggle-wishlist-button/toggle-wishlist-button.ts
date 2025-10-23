import { Component, computed, inject, input } from '@angular/core';
import { EcommerceStore } from '../../store';
import { Product } from '../../models/product';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-toggle-wishlist-button',
  imports: [MatIcon],
  templateUrl: './toggle-wishlist-button.html',
  styleUrl: './toggle-wishlist-button.scss'
})
export class ToggleWishlistButton {
  product = input.required<Product>();
  iconBtn = input<string>();
  addedToWishlist:boolean = false;
  store = inject(EcommerceStore);


  isInWishList = computed(()=>{
    if(this.store.wishlistItems().find(p => p.id === this.product().id)){
      return true
    }else{
      return false
    }
  })

  toggleWishList(product:Product){
    if(this.isInWishList()){
      this.addedToWishlist = false;
      this.store.removeFromWishList(product);
    }else{
      this.addedToWishlist = true;
      this.store.addTowishList(product);
    }
  }

}
