import { Component, OnInit} from '@angular/core';
import { Ride } from '../models/ride.model';
import { Observable } from 'rxjs';
import { SharearideDataService } from '../dataservice/sharearide-data.service';

@Component({
  selector: 'app-search-ride',
  templateUrl: './search-ride.component.html',
  styleUrls: ['./search-ride.component.scss']
})
export class SearchRideComponent implements OnInit {

  private _fetchRides$: Observable<Ride[]> = this._dataService.rides$;

  constructor(private _dataService: SharearideDataService) { }

  ngOnInit() {
  }

  get rides$(): Observable<Ride[]> {
    return this._fetchRides$;
  }

}
