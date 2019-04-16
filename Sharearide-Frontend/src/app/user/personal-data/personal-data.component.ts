import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { SharearideDataService } from 'src/app/dataservice/sharearide-data.service';
import { Gender } from 'src/app/account/account.component';
import { User } from 'src/app/models/user.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.scss']
})
export class PersonalDataComponent implements OnInit {
  genders: Gender[] = [
    { value: 0, viewValue: 'Man' },
    { value: 1, viewValue: 'Vrouw' },
    { value: 2, viewValue: 'Transgender' },
    { value: 3, viewValue: 'Onzijdig' },
  ];
  public userEdit: FormGroup;
  private user: User = JSON.parse(localStorage.getItem('currentUser'));
  public errorMsg: string;

  constructor(
    private editfb: FormBuilder,
    private _dataService: SharearideDataService,
    private router: Router) {
  }

  ngOnInit() {
    this.userEdit = this.editfb.group({
      firstname: new FormControl(this.user.firstName, [Validators.required]),
      lastname: new FormControl(this.user.lastName, [Validators.required]),
      gender: new FormControl(this.user.gender, [Validators.required]),
      telnr: new FormControl(this.user.phoneNumber, [Validators.required, Validators.pattern('^[0-9]{10,}')]),
      borndate: new FormControl(this.user.dateOfBirth, [Validators.required]),
      email: new FormControl(this.user.email, [Validators.required, Validators.email]),
    });
  }

  edit() {
    this._dataService.edit(this.user.id, this.userEdit.value.email, this.userEdit.value.firstname, this.userEdit.value.lastname,
      this.userEdit.value.gender, this.userEdit.value.borndate, this.userEdit.value.telnr
    ).pipe()
      .subscribe(
        val => {
          if (val) {
            if (this._dataService.redirectUrl) {
              this.router.navigateByUrl(this._dataService.redirectUrl);
              this._dataService.redirectUrl = undefined;
            } else {
              this.router.navigate(['/home']);
              location.reload();
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
          console.log(this.errorMsg);
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
    else if (errors.email) {
      return `Dit veld bevat geen geldig e-mailadres`;
    } else if (errors.pattern) {
      return `Geen geldig telefoonnummer`;
    }
  }

}
