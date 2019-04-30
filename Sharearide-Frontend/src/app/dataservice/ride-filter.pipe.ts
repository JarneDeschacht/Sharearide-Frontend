import { Pipe, PipeTransform } from '@angular/core';
import { Ride } from '../models/ride.model';

@Pipe({
  name: 'rideFilter'
})
export class RideFilterPipe implements PipeTransform {

  transform(rides: Ride[], name: string, date: Date): Ride[] {

    if ((!name || name.length === 0) && !date)
      return rides;

    if ((!name || name.length === 0) && date) {
      return rides.filter(rec => this.sameDay(new Date(rec.travelDate),new Date(date)));
    }

    if (!date && name) {
      return rides.filter(rec => {
        var cities: string[] = [];
        rec.stopovers.forEach(stop => {
          cities.push(stop.city.name.toLowerCase());
        })
        return rec.dropOffLocation.city.name.toLowerCase().startsWith(name.toLowerCase()) 
        || cities.filter(city => city.startsWith(name.toLowerCase())).length > 0
      }
      );
    }

    return rides.filter(rec => {
      var cities: string[] = [];
      rec.stopovers.forEach(stop => {
        cities.push(stop.city.name.toLowerCase());
      })
      return this.sameDay(new Date(rec.travelDate),new Date(date)) 
      && (rec.dropOffLocation.city.name.toLowerCase().startsWith(name.toLowerCase()) 
      || cities.filter(city => city.startsWith(name.toLowerCase())).length > 0)
    }
    );
  }
  sameDay(d1, d2) {
    return d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate();
  }
}
