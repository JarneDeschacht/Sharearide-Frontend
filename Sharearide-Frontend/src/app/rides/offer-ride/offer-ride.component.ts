import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { SharearideDataService } from 'src/app/dataservice/sharearide-data.service';
import { City } from 'src/app/models/city.model';
import { Ride } from 'src/app/models/ride.model';
import { Location} from 'src/app/models/location.model';

export interface Country {
  value: number;
  viewValue: string;
}
export const isValidDate = (c: FormControl) => {
  const date = new Date(c.value);
  return date > new Date()
    ? null
    : { InvalidTravelDate: true };
};
@Component({
  selector: 'app-offer-ride',
  templateUrl: './offer-ride.component.html',
  styleUrls: ['./offer-ride.component.scss']
})
export class OfferRideComponent implements OnInit {
  countries: Country[] = [
    { value: 15,  viewValue: 'België' },
    { value: 127, viewValue: 'Nederland' },
    { value: 48,  viewValue: 'Denemarken' },
    { value: 61,  viewValue: 'Frankrijk' },
    { value: 168, viewValue: 'Spanje'},
    { value: 175, viewValue: "Zweden"},
    { value: 176, viewValue: "Zwitserland"},
    { value: 145, viewValue: "Portugal"},
    { value: 112, viewValue: "Malta"},
    { value: 87,  viewValue: "Italië"},
    { value: 60, viewValue: "finland"},
    { value: 104, viewValue: "Luxenburg"},
    //...
  ];
  isLinear = true;
  locationsGroup: FormGroup;
  stopoverLocations: FormGroup;
  details: FormGroup;
  public errorMsg: string;
  private user: User = JSON.parse(localStorage.getItem('currentUser'));

  constructor(private _formBuilder: FormBuilder
    , private _dataService: SharearideDataService,
    private snackBar: MatSnackBar,
    private router: Router, ) { }

  createRide() {
    let stopovers = this.stopoverLocations.value.stopovers.map(stop =>
      new Location(stop.number, stop.companyName, stop.street,
        new City(stop.postalcode, stop.city, stop.country)));
    stopovers = stopovers.filter(stop => stop.city.postalCode != "");
    let start = new Location(this.locationsGroup.value.numberStart,
      this.locationsGroup.value.companyNameStart, this.locationsGroup.value.streetStart,
      new City(this.locationsGroup.value.postalcodeStart,
        this.locationsGroup.value.cityStart, this.locationsGroup.value.countryStart));
    let end = new Location(this.locationsGroup.value.numberEnd,
      this.locationsGroup.value.companyNameEnd, this.locationsGroup.value.streetEnd,
      new City(this.locationsGroup.value.postalcodeEnd, this.locationsGroup.value.cityEnd,
        this.locationsGroup.value.countryEnd));
    let newRide = new Ride(0, start, end, stopovers,this.details.value.travelDate,
      this.details.value.price, this.details.value.seats,
      this.details.value.seats, false, User.fromJSON(this.user));
      
    this._dataService.addRide(newRide).subscribe(
      val => {
        if (val) {
          this.user.nrOfOfferedRides++;
          localStorage.setItem("currentUser", JSON.stringify(this.user));
          this.router.navigateByUrl("/profile/offeredRides");
        }
      },
      (err: HttpErrorResponse) => {

        this.openSnackBar("Gegevens zijn niet correct!");
      }
    );
  }
  openSnackBar(message: string) {
    this.snackBar.open(message, "OK", {
      duration: 5000,
    });
  }

  ngOnInit() {
    this.locationsGroup = this._formBuilder.group({
      streetStart: ['', Validators.required],
      numberStart: ['', Validators.required],
      cityStart: ['', Validators.required],
      postalcodeStart: ['', Validators.required],
      companyNameStart: ['',],
      countryStart: ['', Validators.required],
      streetEnd: ['', Validators.required],
      numberEnd: ['', Validators.required],
      cityEnd: ['', Validators.required],
      postalcodeEnd: ['', Validators.required],
      companyNameEnd: ['',],
      countryEnd: ['', Validators.required],
    });
    this.stopoverLocations = this._formBuilder.group({
      stopovers: this._formBuilder.array([this.createStopovers()])
    });
    this.stopovers.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe(stpList => {
        const lastElement = stpList[stpList.length - 1];
        if (lastElement.postalcode) {
          this.stopovers.push(this.createStopovers());
        } else if (stpList.length >= 2) {
          const secondToLast = stpList[stpList.length - 2];

          if (!lastElement.postalcode &&
            !lastElement.city &&
            !lastElement.companyName &&
            !lastElement.street &&
            !lastElement.number &&
            !lastElement.country &&
            (!secondToLast.postalcode)
          ) {
            this.stopovers.removeAt(this.stopovers.length - 1);
          }
        }
      });
    this.details = this._formBuilder.group({
      travelDate: new FormControl('', [Validators.required,isValidDate]),
      price: ['', Validators.required],
      seats: ['', Validators.required]
    });
  }
  getErrorMessage(errors: any) {
    if (!errors) {
      return null;
    }

    if (errors.required) {
      return 'Dit veld is verplicht';
    } else if (errors.pattern) {
      return 'Dit veld mag enkel nummers bevatten';
    }else if(errors.InvalidTravelDate){
      return 'Een rit moet minstens 1 dag voor vertrek worden vastgelegd';
    }
  }
  createStopovers(): FormGroup {
    return this._formBuilder.group(
      {
        street: ['',],
        number: ['',],
        city: ['',],
        postalcode: ['',],
        companyName: ['',],
        country: ['',],
      },
    );
  }
  get stopovers(): FormArray {
    return <FormArray>this.stopoverLocations.get('stopovers');
  }
}
