import { Component, OnInit } from '@angular/core';

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
    {value: 0, viewValue: 'Man'},
    {value: 1, viewValue: 'Vrouw'},
    {value: 2, viewValue: 'Transgender'},
    {value: 3, viewValue: 'Onzijdig'},
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
