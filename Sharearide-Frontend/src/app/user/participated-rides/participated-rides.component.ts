import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Ride } from 'src/app/models/ride.model';
import { SharearideDataService } from 'src/app/dataservice/sharearide-data.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-participated-rides',
  templateUrl: './participated-rides.component.html',
  styleUrls: ['./participated-rides.component.scss']
})
export class ParticipatedRidesComponent implements OnInit {

  private user : User = JSON.parse(localStorage.getItem('currentUser')); 
  private _fetchRidesByUser$: Observable<Ride[]> = this._dataService.ridesByUser$(this.user.id);

  constructor(private _dataService: SharearideDataService) { }

  ngOnInit() {
  }

  get ridesByUser$(): Observable<Ride[]> {
    return this._fetchRidesByUser$;
  }

}
