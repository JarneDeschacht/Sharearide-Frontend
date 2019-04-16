import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { Ride } from '../models/ride.model';

function parseJwt(token) {
  if (!token) {
    return null;
  }
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  return JSON.parse(window.atob(base64));
}

@Injectable({
  providedIn: 'root'
})
export class SharearideDataService {
  private readonly _tokenKey = 'currentUserKey';
  private readonly _userKey = 'currentUser';
  // private _currentuser$: BehaviorSubject<string>;
  public redirectUrl: string;

  constructor(private http: HttpClient) {
    let parsedToken = parseJwt(localStorage.getItem(this._tokenKey));
    if (parsedToken) {
      const expires = new Date(parseInt(parsedToken.exp, 10) * 1000) < new Date();
      if (expires) {
        localStorage.removeItem(this._tokenKey);
        parsedToken = null;
      }
    }
    // this._currentuser$ = new BehaviorSubject<string>(parsedToken && parsedToken.unique_name);
  }
  // get user$(): BehaviorSubject<string> {
  //   return this._currentuser$;
  // }


  get token(): string {
    const localToken = localStorage.getItem(this._tokenKey);
    return !!localToken ? localToken : '';
  }
  get users$(): Observable<User[]> {
    return this.http.get(`${environment.apiUrl}/user/`).pipe(
      map((list: any[]): User[] => list.map(User.fromJSON)));
  }
  get rides$(): Observable<Ride[]> {
    return this.http.get(`${environment.apiUrl}/ride/`).pipe(
      // delay(400), //moet nog weg
      map((list: any[]): Ride[] => list.map(Ride.fromJSON)));
  }
  ridesByUser$(id: number): Observable<Ride[]> {
    return this.http.get(`${environment.apiUrl}/user/${id}/rides`).pipe(
      // delay(400), //moet nog weg
      map((list: any[]): Ride[] => list.map(Ride.fromJSON)));
  }
  login(email: string, password: string): Observable<boolean> {
    return this.http
      .post(
        `${environment.apiUrl}/Account`,
        { email, password }
      )
      .pipe(
        map((user: any) => {
          if (user) {
            console.log(user);
            localStorage.setItem(this._tokenKey,user.token);
            // this._currentuser$.next(user);
            // console.log(this._currentuser$);
            localStorage.setItem(this._userKey,JSON.stringify(user))
            return true;
          } else {
            return false;
          }
        })
      );
  }
  logout() {
    if (localStorage.getItem(this._userKey)) {
      localStorage.removeItem(this._tokenKey);
      localStorage.removeItem(this._userKey);
    }
  }
  edit(id : number,email: string, firstName: string, lastName: string,gender: number,
     dateOfBirth: Date, phoneNumber: string) : Observable<boolean>{
    return this.http.put(`${environment.apiUrl}/user/${id}`,
    {
      id,email,firstName,lastName,gender,dateOfBirth,phoneNumber
    }).pipe(
      map((user: any) => {
        if (user) {
          localStorage.setItem(this._userKey,JSON.stringify(user))
          return true;
        } else {
          return false;
        }
      })
    );
  }

  register(email: string, password: string, firstName: string, lastName: string,
    passwordConfirmation: string, gender: number, dateOfBirth: Date, phoneNumber: string
  ): Observable<boolean> {
    return this.http
      .post(
        `${environment.apiUrl}/account/register`,
        {
          email, password, firstName,
          lastName, passwordConfirmation, gender, dateOfBirth, phoneNumber
        },
      )
      .pipe(
        map((user: any) => {
          if (user) {
            console.log(user);
            localStorage.setItem(this._tokenKey,user.token);
            // this._currentuser$.next(user);
            // console.log(this._currentuser$);
            localStorage.setItem(this._userKey,JSON.stringify(user))
            return true;
          } else {
            return false;
          }
        })
      );
  }
}
