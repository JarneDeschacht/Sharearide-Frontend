import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { SharearideDataService } from 'src/app/dataservice/sharearide-data.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import * as moment from 'moment';

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
export const isValidDate = (c: FormControl) => {
  const date = new Date(c.value);
  const age = moment().diff(date, 'years');
  return age >= 18
    ? null
    : { InvalidBirthDate: true };
};

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.scss']
})
export class RegisterDialogComponent implements OnInit {
  genders: Gender[] = [
    { value: 0, viewValue: 'Man' },
    { value: 1, viewValue: 'Vrouw' }
  ];
  public userData: FormGroup;
  public errorMsg: string;
  ngOnInit() {
    this.userData = this.fb.group({
      gender: new FormControl('', Validators.required),
      telnr: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10,}')]),
      borndate: new FormControl('', [Validators.required,isValidDate]),
    });
  }

  constructor(
    public dialogRef: MatDialogRef<RegisterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,
    private _dataService: SharearideDataService,
    private router: Router,
    private snackBar: MatSnackBar) {
  }

  confirm(): void {
    this._dataService
      .register(this.data.email, this.data.id + "Fb@",
        this.data.firstname, this.data.lastname, this.data.id + "Fb@",
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
    }else if(errors.InvalidBirthDate){
      return 'Je moet minstens 18 jaar oud zijn';
      }
  }
  openSnackBar(message: string) {
    this.snackBar.open(message, "OK", {
      duration: 5000,
    });
  }

}
