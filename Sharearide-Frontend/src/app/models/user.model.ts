import { Ride } from './ride.model';

export class User {
    constructor(
        private _id: number,
        private _firstName: string,
        private _lastName: string,
        private _dateOfBirth: Date,
        private _email: string,
        private _phoneNumber: string,
        private _gender: string,
        private _token: string,
        private _nrOfParticipatedRides: number,
        private _nrOfOfferedRides: number,
    ) { }

    static fromJSON(json: any): User {
        const ride = new User(json.id, json.firstName, json.lastName, json.dateOfBirth,
            json.email, json.phoneNumber, json.gender, json.token,
            json.nrOfOfferedRides, json.nrOfParticipatedRides);
        return ride;
    }
    toJSON(): any {
        return {
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            dateOfBirth: this.dateOfBirth,
            email: this.email,
            phoneNumber: this.phoneNumber,
            gender: this.gender,
            token: this.token,
            nrOfOfferedRides: this.nrOfOfferedRides,
            nrOfParticipatedRides: this.nrOfParticipatedRides,
        }
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
    get phoneNumber(): string {
        return this._phoneNumber;
    }
    get gender(): string {
        return this._gender;
    }
    get token(): string {
        return this._token;
    }
    get id(): number {
        return this._id;
    }
    get nrOfParticipatedRides(): number {
        return this._nrOfParticipatedRides;
    }
    get nrOfOfferedRides(): number {
        return this._nrOfOfferedRides;
    }
    set nrOfParticipatedRides(value) {
        this._nrOfParticipatedRides = value;
    }
    set nrOfOfferedRides(value) {
        this._nrOfOfferedRides = value;
    }
}