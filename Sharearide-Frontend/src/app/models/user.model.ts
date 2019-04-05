import { Ride } from './ride.model';

export class User {
    constructor(
        private _id : number,
        private _firstName: string,
        private _lastName: string,
        private _dateOfBirth: Date,
        private _email: string,
        private _phonenumber: string,
        private _gender: string,
        private _rides: Ride[],
        private _token : string,
        private _nrOfParticipatedRides : number,
    ) { }

    static fromJSON(json: any): User {
        const ride = new User(json.userId,json.firstName, json.lastName, json.dateOfBirth, json.email, json.phoneNumber, json.gender, json.rides,json.token,json.nrOfParticipatedRides);
        return ride;
    }

    get firstName(): string {
        return this._firstName;
    }
    get lastName(): string {
        return this._lastName;
    }
    get dateOfBirth(): Date {
        return this._dateOfBirth;
    }
    get email(): string {
        return this._email;
    }
    get phonenumber(): string {
        return this._phonenumber;
    }
    get gender(): string {
        return this._gender;
    }
    get rides(): Ride[] {
        return this._rides;
    }
    get token(): string {
        return this._token;
    }
    get id(): number {
        return this._id;
    }
    get nrOfParticipatedRides() : number{
        return this._nrOfParticipatedRides;
    }
}