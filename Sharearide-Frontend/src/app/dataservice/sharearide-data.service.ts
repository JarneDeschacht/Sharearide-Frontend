import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
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
  private _currentuser$: BehaviorSubject<string>;
  public redirectUrl: string;

  constructor(private http: HttpClient) {
    let parsedToken = parseJwt(localStorage.getItem(this._tokenKey));
    if (parsedToken) {
      const expires = new Date(parseInt(parsedToken.exp, 10) * 1000) < new Date();
      if (expires) {
        localStorage.removeItem(this._tokenKey);
        localStorage.removeItem(this._userKey);
        parsedToken = null;
        location.reload();
      }
    }
    this._currentuser$ = new BehaviorSubject<string>(parsedToken && parsedToken.unique_name);
  }
  get user$(): BehaviorSubject<string> {
    return this._currentuser$;
  }
  get token(): string {
    const localToken = localStorage.getItem(this._tokenKey);
    return !!localToken ? localToken : '';
  }
  rides$(id: number): Observable<Ride[]> {
    return this.http.get(`${environment.apiUrl}/ride/user/${id}`).pipe(
      map((list: any[]): Ride[] => list.map(Ride.fromJSON)));
  }
  participatedRidesByUser$(id: number): Observable<Ride[]> {
    return this.http.get(`${environment.apiUrl}/user/${id}/participatedrides`).pipe(
      map((list: any[]): Ride[] => list.map(Ride.fromJSON)));
  }
  offeredRidesByUser$(id: number): Observable<Ride[]> {
    return this.http.get(`${environment.apiUrl}/user/${id}/offeredrides`).pipe(
      map((list: any[]): Ride[] => list.map(Ride.fromJSON)));
  }

  checkUserNameAvailability = (email: string): Observable<boolean> => {
    return this.http.get<boolean>(
      `${environment.apiUrl}/account/checkusername`,
      {
        params: { email }
      }
    );
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
            localStorage.setItem(this._tokenKey, user.token);
            this._currentuser$.next(user.firstName);
            localStorage.setItem(this._userKey, JSON.stringify(User.fromJSON(user)));
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
      this._currentuser$.next(null);
    }
  }
  edit(id: number, email: string, firstName: string, lastName: string, gender: number,
    dateOfBirth: Date, phoneNumber: string): Observable<boolean> {
    return this.http.put(`${environment.apiUrl}/user/${id}`,
      {
        id, email, firstName, lastName, gender, dateOfBirth, phoneNumber
      }).pipe(
        map((user: any) => {
          if (user) {
            this._currentuser$.next(user.firstName);
            localStorage.setItem(this._userKey, JSON.stringify(User.fromJSON(user)));
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
            localStorage.setItem(this._tokenKey, user.token);
            this._currentuser$.next(user.firstName);
            console.log(this._currentuser$);
            localStorage.setItem(this._userKey, JSON.stringify(User.fromJSON(user)));
            return true;
          } else {
            return false;
          }
        })
      );
  }
  addUserToRide(rideId: number, userId: number) {
    return this.http.post(`${environment.apiUrl}/ride/${rideId}/adduser/${userId}`, { rideId, userId });
  }
  addRide(ride: Ride) {
    return this.http.post(`${environment.apiUrl}/ride`, ride.toJSON());
  }
  removeUserFromRide(rideId: number, userId: number) {
    return this.http.post(`${environment.apiUrl}/ride/${rideId}/removeuser/${userId}`, { rideId, userId });
  }
  removeRide(rideid: number) {
    return this.http.request('delete', `${environment.apiUrl}/ride/${rideid}`, { body: rideid });
  }
  editPassword(email: string, oldpass: string, newpass: string) {
    return this.http.put(`${environment.apiUrl}/account/changepassword/${email}/${oldpass}/${newpass}`, { email, oldpass, newpass });
  }


  public upload = (files) => {
    if (files.length === 0) {
      return;
    }

    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    return this.http.post(`${environment.apiUrl}/upload`, formData, {
      reportProgress: true,
      observe: "events"
    });
  }

  addUrlToUser(id:number,url : string){
    return this.http.post(`${environment.apiUrl}/upload/addUrlToUser`,{id,url});
  }
}
