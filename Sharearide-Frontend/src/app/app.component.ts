import { Component } from '@angular/core';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  private user : User = JSON.parse(localStorage.getItem('currentUser')); 
  public loggedin : boolean = this.user != null ? true : false;
  public userName : string = this.user != null ? this.user.firstName : "";
  constructor(){}

  logout()
  {
    localStorage.removeItem("currentUser");
    location.reload();
  }
}
