import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';

@Component({
  selector: 'app-payement-form',
  imports: [ReactiveFormsModule, MatRadioModule, MatButton],
  templateUrl: './payement-form.html',
  styleUrl: './payement-form.scss'
})
export class PayementForm {

  paymentForm: FormGroup = new FormGroup({
    cardHolderName: new FormControl('', [Validators.required]),
    cardNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{16}$')]),
    expiryDate: new FormControl('', [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])\\/([0-9]{2})$')]),
    cvv: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{3}$')]),
  });

  onSubmit() {
    if (this.paymentForm.valid) {
      console.log('Payment Information:', this.paymentForm.value);
      // Here you can handle the form submission, e.g., send data to the server or update the store
    } else {
      console.log('Form is invalid');
    }
  }

}
