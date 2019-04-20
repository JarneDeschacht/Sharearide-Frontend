import { User } from './user.model';
import {Location} from'./location.model';
    import { from } from 'rxjs';

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
    ) { }

    static fromJSON(json : any) : Ride{
        const ride = new Ride(json.rideId,Location.fromJson(json.pickUpLocation),Location.fromJson(json.dropOffLocation),
        json.stopovers.map(Location.fromJson),json.travelDate,json.passengerContribution,
            json.totalAvailableSeats,json.availableSeats,json.isSoldOut,User.fromJSON(json.owner));
        return ride;
    }
    toJSON() : any{
        return {
            PickUpLocation: this.pickUpLocation.toJSON(),
            DropOffLocation: this.dropOffLocation.toJSON(),
            Stopovers: this.stopovers.map(stop => stop.toJSON()),
            TravelDate: this.travelDate,
            passengerContribution: this.passengerContribution,
            totalAvailableSeats: this.totalAvailableSeats,
            availableSeats:this._availableSeats,
            isSoldOut: this.isSoldOut,
            owner: this.owner.toJSON(),
        };
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
    get id() : number{
        return this._id;
    }
}