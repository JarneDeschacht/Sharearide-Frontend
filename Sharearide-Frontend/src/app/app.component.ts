import { Component } from '@angular/core';
import { User } from './models/user.model';
import { SharearideDataService } from './dataservice/sharearide-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  private user : User = JSON.parse(localStorage.getItem('currentUser')); 
  public loggedin : boolean = this.user != null ? true : false;
  constructor(private _dataService: SharearideDataService,){
    
  }
  logout()
  {
    this._dataService.logout();
    location.reload();
  
  }

  ngOnInit(){
  }
  
}
