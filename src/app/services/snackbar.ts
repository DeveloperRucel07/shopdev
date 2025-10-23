import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class Snackbar {
  private _snackBar = inject(MatSnackBar);

  public showSnackBarSucess(message: string, action: string = '', duration: number = 3000) {
    this._snackBar.open(message, action, {
      duration,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['snackbar-style'], 
    });
  }

  public showSnackBarError(message: string, action: string = '', duration: number = 2000) {
    this._snackBar.open(message, action, {
      duration,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['snackbar-style-error'], 
    });
  }

  dismiss() {
    this.dismiss();
  }
  
}
