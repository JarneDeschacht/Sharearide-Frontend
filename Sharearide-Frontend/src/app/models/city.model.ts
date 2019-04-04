export class City {
    constructor(
        private _postalCode: string,
        private _name: string,
        private _country: string,
    ) { }

    static fromJSON(json: any): City {
        const city = new City(json.postalCode, json.name, json.country);
        return city;
    }
    get postalCode(): string {
        return this._postalCode;
    }
    get name(): string {
        return this._name;
    }
    get country(): string {
        return this._country;
    }
}