import { Injectable } from '@angular/core';
import { User } from './user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  constructor(private http: HttpClient) { }

  get users$(): Observable<User[]> {
    return this.http.get(`${environment.apiUrl}/user/`).pipe(
      map((list: any[]): User[] => list.map(User.fromJSON)));
  }
}
