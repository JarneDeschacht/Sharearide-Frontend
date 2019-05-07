import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { SharearideDataService } from 'src/app/dataservice/sharearide-data.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public user : User = JSON.parse(localStorage.getItem('currentUser')); 
  public pRides : number = this.user.nrOfParticipatedRides;
  public oRides : number = this.user.nrOfOfferedRides;

  constructor(private _dataService : SharearideDataService) { }

  ngOnInit() {
  }
}
