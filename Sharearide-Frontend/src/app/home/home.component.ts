import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { SharearideDataService } from '../dataservice/sharearide-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private user : User = JSON.parse(localStorage.getItem('currentUser')); 
  constructor(private _dataService: SharearideDataService) { }

  ngOnInit() {
  }

}
