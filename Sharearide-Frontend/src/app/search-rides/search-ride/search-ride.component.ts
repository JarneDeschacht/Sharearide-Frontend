import { Component, OnInit } from '@angular/core';
import { Ride } from '../../models/ride.model';
import { Observable, Subject } from 'rxjs';
import { SharearideDataService } from '../../dataservice/sharearide-data.service';
import { User } from '../../models/user.model';
import { distinctUntilChanged, debounceTime, map } from 'rxjs/operators';

@Component({
  selector: 'app-search-ride',
  templateUrl: './search-ride.component.html',
  styleUrls: ['./search-ride.component.scss']
})
export class SearchRideComponent implements OnInit {

  private user: User = JSON.parse(localStorage.getItem('currentUser'));
  private _fetchRides$: Observable<Ride[]> = this._dataService.rides$(this.user.id);
  public filterRideDestination: string = '';
  public filterRideDate: Date;
  public filterRide$ = new Subject<string>();
  public filterRideDate$ = new Subject<Date>();

  constructor(private _dataService: SharearideDataService) {
    console.log("loaded");
    this.filterRide$.pipe(
      distinctUntilChanged(),
      debounceTime(400),
      map(val => val.toLowerCase())
    ).subscribe(
      val => this.filterRideDestination = val);

    this.filterRideDate$.pipe(
      distinctUntilChanged(),
      debounceTime(400)
    ).subscribe(
      val => {
        this.filterRideDate = val;
      });
  }
  ngOnInit() {

  }
  resetfilter() {
    this.filterRide$.next("");
    this.filterRideDate$.next(null);
  }

  get rides$(): Observable<Ride[]> {
    return this._fetchRides$;
  }

}
