export class User {
    constructor(
        private _firstName: string,
        private _lastName: string,
        private _dateOfBirth: Date,
        private _email: string,
        private _phonenumber: string,
        private _gender: string,
        private _rides: Object[]
    ) { }

    static fromJSON(json: any): User {
        const ride = new User(json.firstName, json.lastName, json.dateOfBirth, json.email, json.phoneNumber, json.gender, json.rides);
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
    get rides(): Object[] {
        return this._rides;
    }
}