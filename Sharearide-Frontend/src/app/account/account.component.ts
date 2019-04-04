import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { first } from 'rxjs/operators';
import { SharearideDataService } from '../dataservice/sharearide-data.service';

export interface Gender {
  value: number;
  viewValue: string;
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

  constructor(private ulfb: FormBuilder, private urfb: FormBuilder, private _dataService: SharearideDataService) {
  }

  login() {
    this._dataService
      .login(this.userLogin.value.email, this.userLogin.value.password)
      .pipe(first())
      .subscribe(
        data => {
          location.reload();
        }
      )
  }
  register() {
    this._dataService.register(this.userRegister.value.email, this.userRegister.value.password,
      this.userRegister.value.firstname, this.userRegister.value.lastname, this.userRegister.value.passwordConfirm,
      this.userRegister.value.gender, this.userRegister.value.borndate, this.userRegister.value.telnr)
      .pipe(first())
      .subscribe(
        data => {
          location.reload();
        }
      )
  }

  ngOnInit() {
    this.userLogin = this.ulfb.group({
      email: new FormControl('',
        [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]),
      password: new FormControl('',
        [Validators.required, Validators.minLength(8)])
    });
    this.userRegister = this.urfb.group({
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      telnr: new FormControl('', [Validators.required]),
      borndate: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      passwordConfirm: new FormControl('', [Validators.required])
    });
  }

  getErrorMessage(errors: any) {
    if (errors.required) {
      return 'Dit veld is verplicht';
    }
    else if (errors.minlength) {
      return `Dit veld moet minstens ${errors.minlength.requiredLength} 
        karakters bevatten (nu ${errors.minlength.actualLength})`;
    } else if (errors.pattern) {
      return `Dit veld bevat geen geldig e-mailadres`;
    }

  }

}
