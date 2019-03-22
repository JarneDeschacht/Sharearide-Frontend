import { Component } from '@angular/core';
import { UserDataService } from './user-data.service'
import { User } from './user.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private _fetchUsers$: Observable<User[]> = this._userDataService.users$;
  title = 'Sharearide-Frontend';

  constructor(private _userDataService: UserDataService) { }

  get users$(): Observable<User[]> {
    return this._fetchUsers$;
  }
}
