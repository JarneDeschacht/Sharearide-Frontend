import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ride } from './ride.model';
import { environment } from 'src/environments/environment';
import { map, delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RideDataService {

  constructor(private http: HttpClient) { }

  get rides$(): Observable<Ride[]> {
    return this.http.get(`${environment.apiUrl}/ride/`).pipe(
      delay(400), //moet nog weg
      map((list: any[]): Ride[] => list.map(Ride.fromJSON)));
  }
}
