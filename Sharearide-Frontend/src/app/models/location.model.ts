import { City } from './city.model';

export class Location{
    constructor(
        private _number : string,
        private _companyName : string,
        private _street : string,
        private _city : City,
    ){}

    static fromJson(json : any) : Location{
        const location = new Location(json.number,json.companyName,json.street,
            City.fromJSON(json.city));
        return location;
    }
    toJSON() : any{
        return {
            Number: this.number,
            CompanyName: this.companyName,
            Street: this.street,
            City: this.city.toJSON()
        }
    }
    get number() : string{
        return this._number;
    }
    get companyName() : string{
        return this._companyName;
    }
    get street() : string{
        return this._street;
    }
    get city() : City{
        return this._city
    }
}