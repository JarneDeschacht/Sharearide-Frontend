export class Ride {
    constructor(
        private _pickUpLocation: Location,
        private _dropOffLocation: Location,
        private _stopovers: Location[],
        private _travelDate: Date,
        private _returnDate: Date,
        private _isRoundTrip: boolean,
        private _passengerContribution: number,
        private _totalAvailableSeats: number,
        private _availableSeats: number,
        private _isSoldOut: boolean,
    ) { }

    static fromJSON(json : any) : Ride{
        const ride = new Ride(json.pickUpLocation,json.dropOffLocation,
            json.stopovers,json.travelDate,json.returnDate,json.isRoundTrip,
            json.passengerContribution,json.totalAvailableSeats,json.availableSeats,
            json.isSoldOut);
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
    get returnDate(): Date {
        return this._returnDate;
    }
    get isRoundTrip(): boolean{
        return this._isRoundTrip;
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
}