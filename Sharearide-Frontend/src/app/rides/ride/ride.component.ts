import { Component, OnInit, Input } from '@angular/core';
import { Ride } from 'src/app/models/ride.model';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from 'src/app/models/user.model';
import { SharearideDataService } from 'src/app/dataservice/sharearide-data.service';

@Component({
  selector: 'app-ride',
  templateUrl: './ride.component.html',
  styleUrls: ['./ride.component.scss']
})
export class RideComponent implements OnInit {

  @Input() public ride: Ride;
  private user: User = JSON.parse(localStorage.getItem('currentUser'));


  addUserToRide() {
    this._dataservice.addUserToRide(this.ride.id, this.user.id).subscribe(
      val => {
        if (val) {
          this.user.nrOfParticipatedRides++;
          localStorage.setItem("currentUser", JSON.stringify(this.user));
          this.router.navigateByUrl("/profile/participatedRides");
        }
      },
      (err: HttpErrorResponse) => {
      }
    );
  }

  constructor(private _dataservice: SharearideDataService, private router: Router) { }

  isSoldOut(): boolean {
    return this.ride.availableSeats <= 0;
  }
  ngOnInit() {
  }

}
