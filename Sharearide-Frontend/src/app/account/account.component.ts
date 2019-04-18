import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder, AbstractControl, ValidatorFn } from '@angular/forms';
import { first, map } from 'rxjs/operators';
import { SharearideDataService } from '../dataservice/sharearide-data.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material';

export interface Gender {
  value: number;
  viewValue: string;
}

function comparePasswords(control: AbstractControl): { [key: string]: any } {
  const password = control.get('password');
  const confirmPassword = control.get('passwordConfirm');
  return password.value === confirmPassword.value
    ? null
    : { passwordsDiffer: true };
}
function serverSideValidateUsername(
  checkAvailabilityFn: (n: string) => Observable<boolean>
): ValidatorFn {
  return (control: AbstractControl): Observable<{ [key: string]: any }> => {
    return checkAvailabilityFn(control.value).pipe(
      map(available => {
        if (available) {
          return null;
        }
        return { userAlreadyExists: true };
      })
    );
  };
}


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  genders: Gender[] = [
    { value: 0, viewValue: 'Man' },
    { value: 1, viewValue: 'Vrouw' },
    { value: 2, viewValue: 'Transgender' },
    { value: 3, viewValue: 'Onzijdig' },
  ];
  public userLogin: FormGroup;
  public userRegister: FormGroup;
  public errorMsg: string;

  constructor(
    private ulfb: FormBuilder,
    private urfb: FormBuilder,
    private _dataService: SharearideDataService,
    private router: Router,
    private snackBar: MatSnackBar) {
  }
  login() {
    this._dataService
      .login(this.userLogin.value.email, this.userLogin.value.password)
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
            this.openSnackBar("Logingegevens zijn niet correct!");
            this.errorMsg = `Could not login`;
          }
          location.reload();
        },
        (err: HttpErrorResponse) => {

          if (err.error instanceof Error) {
            this.openSnackBar("Logingegevens zijn niet correct!");
            this.errorMsg = `Error while trying to login user ${
              this.userLogin.value.firstname
              }: ${err.error.message}`;
          } else {
            this.openSnackBar("Logingegevens zijn niet correct!");
            this.errorMsg = `Error ${err.status} while trying to login user ${
              this.userLogin.value.firstname
              }: ${err.error}`;
          }
          console.log(this.errorMsg);
        }
      );
  }
  register() {
    this._dataService.register(this.userRegister.value.email, this.userRegister.value.passwordGroup.password,
      this.userRegister.value.firstname, this.userRegister.value.lastname, this.userRegister.value.passwordGroup.passwordConfirm,
      this.userRegister.value.gender, this.userRegister.value.borndate,"+"+this.userRegister.value.telnr)
      .pipe()
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
            this.openSnackBar("Er is een fout opgetreden!");
            this.errorMsg = `Could not register`;
          }
          location.reload();
        },
        (err: HttpErrorResponse) => {

          if (err.error instanceof Error) {
            this.openSnackBar("Er is een fout opgetreden!");
            this.errorMsg = `Error while trying to register user ${
              this.userRegister.value.firstname
              }: ${err.error.message}`;
          } else {
            this.openSnackBar("Er is een fout opgetreden!");
            this.errorMsg = `Error ${err.status} while trying to register user ${
              this.userRegister.value.firstname
              }: ${err.error}`;
          }
          console.log(this.errorMsg);
        }
      );
  }
  ngOnInit() {
    this.userLogin = this.ulfb.group({
      email: new FormControl('',
        [Validators.required, Validators.email]),
      password: new FormControl('',
        [Validators.required])
    });
    this.userRegister = this.urfb.group({
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      telnr: new FormControl('', [Validators.required,Validators.pattern('^[0-9]{10,}')]),
      borndate: new FormControl('', [Validators.required]),
      email: ['', [Validators.required, Validators.email],
      serverSideValidateUsername(this._dataService.checkUserNameAvailability)],
      passwordGroup: this.urfb.group(
        {
          password: ['', [Validators.required, Validators.minLength(8),]],
          passwordConfirm: ['', Validators.required]
        },
        { validator: comparePasswords }
      )
    });
  }

  getErrorMessage(errors: any) {
    if (!errors) {
      return null;
    }

    if (errors.required) {
      return 'Dit veld is verplicht';
    }
    else if (errors.minlength) {
      return `Dit veld moet minstens ${errors.minlength.requiredLength} 
        karakters bevatten (nu ${errors.minlength.actualLength})`;
    } else if (errors.email) {
      return `Dit veld bevat geen geldig e-mailadres`;
    }else if (errors.pattern) {
      return `Geen geldig telefoonnummer`;
    }
     else if (errors.passwordsDiffer) {
      return `Wachtwoorden zijn niet hetzelfde`;
    }else if (errors.userAlreadyExists) {
      return `Er bestaat al een gebruiker met dit E-mailadres`;
    }
  }
  openSnackBar(message: string) {
    this.snackBar.open(message,"OK", {
      duration: 5000,
    });
  }

}
