import { Component, OnInit, Input } from '@angular/core';
import { User } from '../models/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  private user : User = JSON.parse(localStorage.getItem('currentUser')); 

  constructor() { }

  ngOnInit() {
  }

}
