import { Component, OnInit, Input } from '@angular/core';
import { Ride } from 'src/app/models/ride.model';
import { User } from 'src/app/models/user.model';
import { SharearideDataService } from 'src/app/dataservice/sharearide-data.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-ride-small',
  templateUrl: './ride-small.component.html',
  styleUrls: ['./ride-small.component.scss']
})
export class RideSmallComponent implements OnInit {

  @Input() public ride: Ride;
  @Input() public isParticipatedRide: number;

  private user: User = JSON.parse(localStorage.getItem('currentUser'));
  constructor(private _dataservice: SharearideDataService, private router: Router) { }

  isSoldOut(): boolean {
    return this.ride.availableSeats <= 0;
  }
  ngOnInit() {
  }

  removeUserFromRide() {
    this._dataservice.removeUserFromRide(this.ride.id, this.user.id).subscribe(
      val => {
        if (val) {
          this.user.nrOfParticipatedRides--;
          localStorage.setItem("currentUser", JSON.stringify(this.user));
          this.router.navigateByUrl("/searchRide");
        }
      },
      (err: HttpErrorResponse) => {
      }
    );
  }
  removeRide() {
    this._dataservice.removeRide(this.ride.id).subscribe(
      val => {
        if (val) {
          this.user.nrOfOfferedRides--;
          localStorage.setItem("currentUser", JSON.stringify(this.user));
          this.router.navigateByUrl("/searchRide");
        }
      },
      (err: HttpErrorResponse) => {
      }
    );
  }
}
