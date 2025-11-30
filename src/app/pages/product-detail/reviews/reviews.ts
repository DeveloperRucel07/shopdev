import { Component, computed, inject, input } from '@angular/core';
import { Product } from '../../../models/product';
import { ViewPanel } from "../../../directives/view-panel";
import { RatingSummary } from "../rating-summary/rating-summary";
import { ReviewItem } from "./review-item/review-item";
import { MatAnchor } from "@angular/material/button";
import { EcommerceStore } from '../../../store';
import { WriteReview } from "./write-review/write-review";

@Component({
  selector: 'app-reviews',
  imports: [ViewPanel, RatingSummary, ReviewItem, MatAnchor, WriteReview],
  templateUrl: './reviews.html',
  styleUrl: './reviews.scss'
})
export class Reviews {
  product = input.required<Product>();
  store = inject(EcommerceStore)

  sortedReviews = computed(()=>{
    return [...this.product().reviews].sort((a,b)=>b.reviewDate.getTime() - a.reviewDate.getTime());
  })


 

}
