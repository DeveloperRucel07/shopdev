import { Component, input } from '@angular/core';
import { UserReview } from '../../../../models/user-review';
import { ViewPanel } from "../../../../directives/view-panel";
import { StarRating } from "../../../../shared/star-rating/star-rating";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-review-item',
  imports: [ViewPanel, StarRating, DatePipe],
  templateUrl: './review-item.html',
  styleUrl: './review-item.scss'
})
export class ReviewItem {
  review = input.required<UserReview>();

}
