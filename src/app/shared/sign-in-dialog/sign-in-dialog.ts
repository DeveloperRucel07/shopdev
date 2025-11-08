import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import { MatIcon } from "@angular/material/icon";
import { EcommerceStore } from '../../store';
import { UserSignIn } from '../../models/user';

@Component({
  selector: 'app-sign-in-dialog',
  imports: [MatDialogModule, MatFormFieldModule, MatError, ReactiveFormsModule, MatInput, MatButton, MatIcon],
  templateUrl: './sign-in-dialog.html',
  styleUrl: './sign-in-dialog.scss'
})
export class SignInDialog {
  store = inject(EcommerceStore);
  data = inject<{checkout: boolean}>(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef);

 signInForm: FormGroup = new FormGroup({
    email : new FormControl('user@email.com', [Validators.email, Validators.required]),
    password: new FormControl('test12345', [Validators.required]),
  });



  type:string = 'password';
  hide = signal(true);

  onSubmit(){
    if(!this.signInForm.valid){
        this.signInForm.markAllAsTouched();
        return;
    }

    const {email, password} = this.signInForm.value;
    this.store.signIn({email, password, checkout: this.data.checkout, dialogId: this.dialogRef.id} as UserSignIn);

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
