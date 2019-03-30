import { Component, OnInit, Input } from '@angular/core';
import { Ride } from './ride.model';
import { Observable } from 'rxjs';
import { RideDataService } from './ride-data.service';

@Component({
  selector: 'app-search-ride',
  templateUrl: './search-ride.component.html',
  styleUrls: ['./search-ride.component.scss']
})
export class SearchRideComponent implements OnInit {

  private _fetchRides$: Observable<Ride[]> = this._rideDataService.rides$;

  constructor(private _rideDataService: RideDataService) { }

  ngOnInit() {
  }

  get rides$(): Observable<Ride[]> {
    return this._fetchRides$;
  }

}
