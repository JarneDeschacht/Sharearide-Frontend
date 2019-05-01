import { Component, OnInit} from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { map } from 'rxjs/operators';
import { SharearideDataService } from '../dataservice/sharearide-data.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { MatDialog,} from '@angular/material';
import { RegisterDialogComponent } from './register-dialog/register-dialog.component';
//MomentJS library
import * as moment from 'moment';
//facebook login
declare var FB: any;
declare var name: string;

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
export const isValidDate = (c: FormControl) => {
  const date = new Date(c.value);
  const age = moment().diff(date, 'years');
  return age >= 18
    ? null
    : { InvalidBirthDate: true };
};
export const isValidPassword = (c: FormControl) => {
  const password = c.value;
  var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/;

  return regex.test(password)
    ? null
    : { InvalidPassword: true };
}


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  genders: Gender[] = [
    { value: 0, viewValue: 'Man' },
    { value: 1, viewValue: 'Vrouw' }
  ];
  public userLogin: FormGroup;
  public userRegister: FormGroup;
  public errorMsg: string;


  constructor(
    private ulfb: FormBuilder,
    private urfb: FormBuilder,
    private _dataService: SharearideDataService,
    private router: Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog) {
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
      this.userRegister.value.gender, this.userRegister.value.borndate, "+" + this.userRegister.value.telnr)
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
      telnr: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10,}')]),
      borndate: new FormControl('', [Validators.required, isValidDate]),
      email: ['', [Validators.required, Validators.email],
        serverSideValidateUsername(this._dataService.checkUserNameAvailability)],
      passwordGroup: this.urfb.group(
        {
          password: ['', [Validators.required, Validators.minLength(8), isValidPassword]],
          passwordConfirm: ['', Validators.required]
        },
        { validator: comparePasswords }
      )
    });

    //Facebook login
    (window as any).fbAsyncInit = function () {
      FB.init({
        appId: '2615325188537680',
        cookie: true,
        xfbml: true,
        version: 'v3.2'
      });
      FB.AppEvents.logPageView();
    };

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

  }
  loginregisterFB() {
    console.log("submit login to facebook");
    // FB.login();
    FB.login((response) => {
      console.log('submitLogin', response);
      if (response.status === 'connected') {
        FB.api(
          `/me?fields=id,first_name,last_name,email`,
          function (response2) {
            if (response2 && !response2.error) {
              console.log(response2);
              this.name = response2.first_name + "§" + response2.last_name + "§" + response2.email + "§" + response2.id;
            }
            else console.log(response2.error)
          }
        );
      }
      else {

        FB.logout();
      }
      FB.logout();
    }
      ,
      { scope: 'email' });

    this._dataService.checkUserNameAvailability(name.split("§")[2]).subscribe(data => {
      if (data) {
        this.openDialog();
      } else {
        this.loginFB();
      }
    })
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
    } else if (errors.pattern) {
      return `Geen geldig telefoonnummer`;
    }
    else if (errors.passwordsDiffer) {
      return `Wachtwoorden zijn niet hetzelfde`;
    } else if (errors.userAlreadyExists) {
      return `Er bestaat al een gebruiker met dit e-mailadres`;
    } else if (errors.InvalidBirthDate) {
      return 'Je moet minstens 18 jaar oud zijn';
    } else if (errors.InvalidPassword) {
      return 'Een wachtwoord moet minsten 1 kleine letter, 1 hoofdletter, 1 nummer en 1 speciaal teken bevatten'
    }
  }
  openSnackBar(message: string) {
    this.snackBar.open(message, "OK", {
      duration: 5000,
    });
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(RegisterDialogComponent, {
      height: '450px',
      width: '500px',
      data: { firstname: name.split("§")[0], lastname: name.split("§")[1], email: name.split("§")[2], id: name.split("§")[3] },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  loginFB() {
    this._dataService
      .login(name.split("§")[2], name.split("§")[3] + "Fb@")
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
            this.openSnackBar("Er liep iets mis!");
            this.errorMsg = `Could not login`;
          }
        },
        (err: HttpErrorResponse) => {

          if (err.error instanceof Error) {
            this.openSnackBar("Er liep iets mis!");
            this.errorMsg = `Error while trying to login user ${
              this.userLogin.value.firstname
              }: ${err.error.message}`;
          } else {
            this.openSnackBar("Er liep iets mis!");
            this.errorMsg = `Error ${err.status} while trying to login user ${
              this.userLogin.value.firstname
              }: ${err.error}`;
          }
          console.log(this.errorMsg);
        }
      );
  }

}
