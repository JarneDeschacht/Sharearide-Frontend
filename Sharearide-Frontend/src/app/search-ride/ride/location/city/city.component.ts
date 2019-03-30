import { Component, OnInit, Input } from '@angular/core';
import { City } from 'src/app/search-ride/city.model';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit {

  @Input() public city : City;
  constructor() { }

  ngOnInit() {
  }

}
