import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { SharearideDataService } from 'src/app/dataservice/sharearide-data.service';
import { Gender } from 'src/app/account/account.component';
import { User } from 'src/app/models/user.model';
import * as moment from 'moment';
import { MatSnackBar } from '@angular/material';
import { HttpErrorResponse, HttpEventType } from '@angular/common/http';

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
function comparePasswords(control: AbstractControl): { [key: string]: any } {
  const password = control.get('newPassword');
  const confirmPassword = control.get('newPasswordConfirm');
  return password.value === confirmPassword.value
    ? null
    : { passwordsDiffer: true };
}

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.scss']
})
export class PersonalDataComponent implements OnInit {
  genders: Gender[] = [
    { value: 0, viewValue: 'Man' },
    { value: 1, viewValue: 'Vrouw' }
  ];

  public userEdit: FormGroup;
  public passwordEdit: FormGroup;
  public fileReader: FormGroup;
  private user: User = JSON.parse(localStorage.getItem('currentUser'));
  public errorMsg: string;
  public showForm = false;
  public showFileReader = false;

  private imgURL;
  private imagePath;

  constructor(
    private editfb: FormBuilder,
    private _dataService: SharearideDataService,
    private router: Router,
    private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.userEdit = this.editfb.group({
      firstname: new FormControl(this.user.firstName, [Validators.required]),
      lastname: new FormControl(this.user.lastName, [Validators.required]),
      gender: new FormControl(this.user.gender, [Validators.required]),
      telnr: new FormControl(this.user.phoneNumber.substring(1), [Validators.required, Validators.pattern('^[0-9]{10,}')]),
      borndate: new FormControl(this.user.dateOfBirth, [Validators.required, isValidDate]),
      email: new FormControl({ value: `${this.user.email}`, disabled: true }, [Validators.required, Validators.email]),
    });

    this.passwordEdit = this.editfb.group({
      oldPassword: new FormControl('', Validators.required),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(8), isValidPassword]),
      newPasswordConfirm: new FormControl('', Validators.required)
    }, { validator: comparePasswords });

    this.fileReader = this.editfb.group({
      image: ['', [Validators.required]],
    });
  }

  edit() {
    this._dataService.edit(this.user.id, this.user.email, this.userEdit.value.firstname, this.userEdit.value.lastname,
      this.userEdit.value.gender, this.userEdit.value.borndate, "+" + this.userEdit.value.telnr
    ).pipe()
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
            this.errorMsg = `Could not edit`;
          }
        },
        (err: HttpErrorResponse) => {

          if (err.error instanceof Error) {
            this.errorMsg = `Error while trying to edit user ${
              this.userEdit.value.firstname
              }: ${err.error.message}`;
          } else {
            this.errorMsg = `Error ${err.status} while trying to edit user ${
              this.userEdit.value.firstname
              }: ${err.error}`;
          }
        }
      );
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
    }
    else if (errors.email) {
      return `Dit veld bevat geen geldig e-mailadres`;
    } else if (errors.pattern) {
      return `Geen geldig telefoonnummer`;
    } else if (errors.InvalidBirthDate) {
      return 'Je moet minstens 18 jaar oud zijn';
    }
    else if (errors.passwordsDiffer) {
      return `Wachtwoorden zijn niet hetzelfde`;
    }
    else if (errors.InvalidPassword) {
      return 'Een wachtwoord moet minstens 1 kleine letter, 1 hoofdletter, 1 nummer en 1 speciaal teken bevatten'
    }
  }
  changeShowForm() {
    this.showFileReader = false;
    this.showForm = !this.showForm;
  }
  changeShowFileReader() {
    this.showForm = false;
    this.showFileReader = !this.showFileReader;
  }

  editPassword() {
    this._dataService.editPassword(this.user.email, this.passwordEdit.value.oldPassword, this.passwordEdit.value.newPasswordConfirm).subscribe(val => {
      if (val)
        this.router.navigate(['/home']);
      else
        this.openSnackBar("Je oude wachtwoord is niet correct!");
    });
  }
  openSnackBar(message: string) {
    this.snackBar.open(message, "OK", {
      duration: 5000,
    });
  }

  preview() {
    if (this.fileReader.value.image.files.length === 0) return;

    var mimeType = this.fileReader.value.image.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    this.imagePath = this.fileReader.value.image.files;
    reader.readAsDataURL(this.fileReader.value.image.files[0]);
    reader.onload = _event => {
      this.imgURL = reader.result;
    }
  }
  removeImage() {
    this.imgURL = "";
  }
  upload() {
    this._dataService.upload(this.fileReader.value.image.files).subscribe(event => {
      if (event.type === HttpEventType.Response)
      {
        this._dataService.addUrlToUser(this.user.id,this.fromJSON(event.body)).subscribe(val => {
          if (val)
          {
            this.user.url = this.fromJSON(event.body);
            localStorage.setItem('currentUser', JSON.stringify(this.user));
            this.router.navigate(['/home']);
          }
        });
      }
    });
  }
  private fromJSON(json: any): string {
    var res: string = json.dbPath;
    return res;
  }
}
