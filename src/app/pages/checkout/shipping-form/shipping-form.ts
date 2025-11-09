import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-shipping-form',
  imports: [ReactiveFormsModule, MatIcon, MatButton],
  templateUrl: './shipping-form.html',
  styleUrl: './shipping-form.scss'
})
export class ShippingForm {

  shippingForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    zip: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    postalCode: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    if (this.shippingForm.valid) {
      console.log('Shipping Information:', this.shippingForm.value);
      // Here you can handle the form submission, e.g., send data to the server or update the store
    } else {
      console.log('Form is invalid');
    }
  }

}
