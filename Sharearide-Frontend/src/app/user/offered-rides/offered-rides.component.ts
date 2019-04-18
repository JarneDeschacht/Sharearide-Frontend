import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Observable } from 'rxjs';
import { Ride } from 'src/app/models/ride.model';
import { SharearideDataService } from 'src/app/dataservice/sharearide-data.service';

@Component({
  selector: 'app-offered-rides',
  templateUrl: './offered-rides.component.html',
  styleUrls: ['./offered-rides.component.scss']
})
export class OfferedRidesComponent implements OnInit {

  private user : User = JSON.parse(localStorage.getItem('currentUser')); 
  private _fetchRidesByUser$: Observable<Ride[]> = this._dataService.offeredRidesByUser$(this.user.id);

  constructor(private _dataService: SharearideDataService) { }

  ngOnInit() {
  }

  get offeredRidesByUser$(): Observable<Ride[]> {
    return this._fetchRidesByUser$;
  }

}
