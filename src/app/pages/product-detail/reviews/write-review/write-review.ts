import { Component, inject, signal } from '@angular/core';
import { ViewPanel } from "../../../../directives/view-panel";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import {MatSelectModule} from '@angular/material/select';
import { EcommerceStore } from '../../../../store';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { OptionItem } from '../../../../models/option-item';
import { MatAnchor } from "@angular/material/button";
import { AddReviewParams } from '../../../../models/user-review';

@Component({
  selector: 'app-write-review',
  imports: [ViewPanel, MatFormField, MatLabel, MatInput, MatSelectModule, ReactiveFormsModule, MatAnchor],
  templateUrl: './write-review.html',
  styleUrl: './write-review.scss'
})
export class WriteReview {
  fb = inject(NonNullableFormBuilder);
  store = inject(EcommerceStore);
  ratingOptions = signal<OptionItem[]>([
    {label: '5 Stars - Excellent', value: 5},
    {label: '4 Stars - Good', value: 4},
    {label: '3 Stars - Average', value: 3},
    {label: '2 Stars - Poor', value: 2},
    {label: '1 Star - Terrible', value: 1},
  ])

  reviewForm = this.fb.group({
    title: ['', Validators.required],
    comment: ['', Validators.required],
    rating: [5, Validators.required],
  })

  saveReview(){

    if(!this.reviewForm.valid){
      this.reviewForm.markAllAsTouched;
      return
    }
    const {title, comment, rating}  = this.reviewForm.value;
    this.store.addReview({title, comment, rating} as AddReviewParams);

  }

}
