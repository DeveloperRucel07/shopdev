import { Component, inject, signal } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { MatDialogContent } from "@angular/material/dialog";
import { MatError, MatFormFieldModule } from "@angular/material/form-field";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { EcommerceStore } from '../../store';

@Component({
  selector: 'app-sign-up-dialog',
  imports: [MatIcon, MatDialogContent, MatFormFieldModule, MatError, ReactiveFormsModule, MatInput, MatButton],
  templateUrl: './sign-up-dialog.html',
  styleUrl: './sign-up-dialog.scss'
})
export class SignUpDialog {
  store = inject(EcommerceStore);
   signUpForm: FormGroup = new FormGroup({
    name: new FormControl('test12345', [Validators.required]),
    email : new FormControl('user@email.com', [Validators.email, Validators.required]),
    password: new FormControl('test12345', [Validators.required]),
  });

  type:string = 'password';
  hide = signal(true);

  onSubmit(){
    if(this.signUpForm.valid){
      // Handle sign-in logic here
      console.log('Form Submitted', this.signUpForm.value);
    }
  }

  clickEvent(event: MouseEvent) {
    if(this.type === 'password'){
      this.type = 'text'
    }else{
      this.type = 'password';
    }
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

}
