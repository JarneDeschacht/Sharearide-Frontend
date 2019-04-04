import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { Ride } from '../models/ride.model';

@Injectable({
  providedIn: 'root'
})
export class SharearideDataService {

  constructor(private http: HttpClient) { }

  get users$(): Observable<User[]> {
    return this.http.get(`${environment.apiUrl}/user/`).pipe(
      map((list: any[]): User[] => list.map(User.fromJSON)));
  }
  get rides$(): Observable<Ride[]> {
    return this.http.get(`${environment.apiUrl}/ride/`).pipe(
      delay(400), //moet nog weg
      map((list: any[]): Ride[] => list.map(Ride.fromJSON)));
  }
  login(email: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/Account`, { email, password })
      .pipe(map(user => {
        if (user && user.token) {
          //user en jwt-token in localstorage steken
          localStorage.setItem('currentUser', JSON.stringify(user))
        } return user;
      }));
  }
  register(email: string, password: string, firstName: string, lastName: string,
    passwordConfirmation: string, gender: number, dateOfBirth: Date, phoneNumber: string) {
    return this.http.post<any>(`${environment.apiUrl}/Account/register`, {
      email, password, firstName,
      lastName, passwordConfirmation, gender, dateOfBirth, phoneNumber
    })
      .pipe(map(user => {
        if (user && user.token) {
          //nieuwe user en jwt-token in localstorage steken
          localStorage.setItem('currentUser', JSON.stringify(user))
        } return user;
      }));
  }
}
