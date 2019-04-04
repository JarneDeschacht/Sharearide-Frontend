import { Component, OnInit, Input } from '@angular/core';
import { Ride } from 'src/app/models/ride.model';

@Component({
  selector: 'app-ride',
  templateUrl: './ride.component.html',
  styleUrls: ['./ride.component.scss']
})
export class RideComponent implements OnInit {

  @Input() public ride: Ride;

  constructor() { }

  ngOnInit() {
  }

}
