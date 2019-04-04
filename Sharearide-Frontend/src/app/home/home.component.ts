import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private user : User = JSON.parse(localStorage.getItem('currentUser')); 
  public userName : string = this.user != null ? this.user.firstName : "";
  constructor() { }

  ngOnInit() {
  }

}
