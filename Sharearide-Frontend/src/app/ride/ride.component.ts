import { Component, OnInit, Input } from '@angular/core';
import { Ride } from '../Ride.model';

@Component({
  selector: 'app-ride',
  templateUrl: './ride.component.html',
  styleUrls: ['./ride.component.sass']
})
export class RideComponent implements OnInit {
  @Input() public ride: Ride;

  constructor() {
  }

  ngOnInit() {
  }

}
