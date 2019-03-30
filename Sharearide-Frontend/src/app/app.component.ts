import { Component } from '@angular/core';
import { UserDataService } from './user-data.service'
import { User } from './user.model';
import { Observable } from 'rxjs';
import { Ride } from './search-ride/ride.model';
import { RideDataService } from './search-ride/ride-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
/* export class AppComponent {
  private _fetchUsers$: Observable<User[]> = this._userDataService.users$;
  title = 'Sharearide-Frontend';

  constructor(private _userDataService: UserDataService) { }

  get users$(): Observable<User[]> {
    return this._fetchUsers$;
  }

} */
export class AppComponent{
  constructor(){}
}
