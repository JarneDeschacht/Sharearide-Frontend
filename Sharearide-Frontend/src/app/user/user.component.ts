import { Component, OnInit, Input } from '@angular/core';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { SharearideDataService } from '../dataservice/sharearide-data.service';
import { Ride } from '../models/ride.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  private user : User = JSON.parse(localStorage.getItem('currentUser')); 
  public pRides : number = this.user.nrOfParticipatedRides;

  constructor() { }

  ngOnInit() {
  }
}
