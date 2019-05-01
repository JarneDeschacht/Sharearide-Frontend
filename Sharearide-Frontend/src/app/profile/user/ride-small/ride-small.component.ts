import { Component, OnInit, Input } from '@angular/core';
import { Ride } from '../models/ride.model';
import { User } from '../models/user.model';

@Component({
  selector: 'app-ride-small',
  templateUrl: './ride-small.component.html',
  styleUrls: ['./ride-small.component.scss']
})
export class RideSmallComponent implements OnInit {

  @Input() public ride: Ride;
  private user : User = JSON.parse(localStorage.getItem('currentUser')); 
  constructor() { }
  isSoldOut() : boolean{
    return this.ride.availableSeats <= 0;
  }
  ngOnInit() {
  }

}
