import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharearideDataService } from 'src/app/dataservice/sharearide-data.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

export interface DialogData {
  firstname: string;
  lastname: string;
  email: string;
  id: string;
}
export interface Gender {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.scss']
})
export class RegisterDialogComponent implements OnInit {
  genders: Gender[] = [
    { value: 0, viewValue: 'Man' },
    { value: 1, viewValue: 'Vrouw' },
    { value: 2, viewValue: 'Transgender' },
    { value: 3, viewValue: 'Onzijdig' },
  ];
  public userData: FormGroup;
  public errorMsg: string;
  ngOnInit() {
    this.userData = this.fb.group({
      gender: ['', Validators.required],
      telnr: ['', [Validators.required, Validators.pattern('^[0-9]{10,}')]],
      borndate: ['', Validators.required],
    });
  }

  constructor(
    public dialogRef: MatDialogRef<RegisterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
     private fb: FormBuilder,
     private _dataService : SharearideDataService,
     private router: Router,
     private snackBar: MatSnackBar) {
  }

  confirm(): void {
    this._dataService
      .register(this.data.email, this.data.id+"Fb@",
        this.data.firstname, this.data.lastname, this.data.id+"Fb@",
        this.userData.value.gender, this.userData.value.borndate, "+" + this.userData.value.telnr)
      .subscribe(
        val => {
          if (val) {
            if (this._dataService.redirectUrl) {
              this.router.navigateByUrl(this._dataService.redirectUrl);
              this._dataService.redirectUrl = undefined;
            } else {
              this.router.navigate(['/home']);
            }
          } else {
            this.openSnackBar("Er is iets misgelopen!");
            this.errorMsg = `Could not login`;
          }
          location.reload();
        },
        (err: HttpErrorResponse) => {

          if (err.error instanceof Error) {
            this.openSnackBar("Er is iets misgelopen!");
            this.errorMsg = `Error while trying to login user ${
              this.data.firstname
              }: ${err.error.message}`;
          } else {
            this.openSnackBar("Er is iets misgelopen!");
            this.errorMsg = `Error ${err.status} while trying to login user ${
              this.data.firstname
              }: ${err.error}`;
          }
          console.log(this.errorMsg);
        }
      );
    this.dialogRef.close();
  }
  getErrorMessage(errors: any) {
    if (!errors) {
      return null;
    }

    if (errors.required) {
      return 'Dit veld is verplicht';
    }
    else if (errors.pattern) {
      return `Geen geldig telefoonnummer`;
    }
  }
  openSnackBar(message: string) {
    this.snackBar.open(message, "OK", {
      duration: 5000,
    });
  }

}
