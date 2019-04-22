import { Component, OnInit, Input } from '@angular/core';
import { Ride } from 'src/app/models/ride.model';
import { SharearideDataService } from '../dataservice/sharearide-data.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ride',
  templateUrl: './ride.component.html',
  styleUrls: ['./ride.component.scss']
})
export class RideComponent implements OnInit {

  @Input() public ride: Ride;
  private user: User = JSON.parse(localStorage.getItem('currentUser'));


  addUserToRide() {
    this._dataservice.addUserToRide(this.ride.id, this.user.id).subscribe(); //TODO
    this.user.nrOfParticipatedRides++;
    localStorage.setItem("currentUser", JSON.stringify(this.user));
    location.reload(); //TODO
    this.router.navigateByUrl("/profile/participatedRides");
  }

  constructor(private _dataservice: SharearideDataService, private router: Router) { }

  isSoldOut(): boolean {
    return this.ride.availableSeats <= 0;
  }
  ngOnInit() {
  }

}
