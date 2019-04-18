import { User } from './user.model';
import { Timestamp } from 'rxjs/internal/operators/timestamp';

export class Ride {
    constructor(
        private _id : number,
        private _pickUpLocation: Location,
        private _dropOffLocation: Location,
        private _stopovers: Location[],
        private _travelDate: Date,
        private _passengerContribution: number,
        private _totalAvailableSeats: number,
        private _availableSeats: number,
        private _isSoldOut: boolean,
        private _owner : User,
        private _departure : Date,
    ) { }

    static fromJSON(json : any) : Ride{
        const ride = new Ride(json.rideId,json.pickUpLocation,json.dropOffLocation,
            json.stopovers,json.travelDate,json.passengerContribution,
            json.totalAvailableSeats,json.availableSeats,json.isSoldOut,json.owner,json.departure);
        return ride;
    }

    get pickUpLocation(): Location {
        return this._pickUpLocation;
    }
    get dropOffLocation(): Location {
        return this._dropOffLocation;
    }
    get stopovers(): Location[] {
        return this._stopovers;
    }
    get travelDate(): Date {
        return this._travelDate;
    }
    get isSoldOut(): boolean{
        return this._isSoldOut;
    }
    get passengerContribution(): number{
        return this._passengerContribution;
    }
    get totalAvailableSeats(): number{
        return this._totalAvailableSeats;
    }
    get availableSeats(): number{
        return this._availableSeats;
    }
    get owner() : User{
        return this._owner;
    }
    get departure() : Date{
        return this._departure;
    }
    get id() : number{
        return this._id;
    }
}