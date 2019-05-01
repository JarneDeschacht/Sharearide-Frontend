import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DATE_LOCALE } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AccountComponent} from './account/account.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchRideComponent } from './search-ride/search-ride.component';
import { PersonalDataComponent } from './user/personal-data/personal-data.component';
import { OfferedRidesComponent } from './user/offered-rides/offered-rides.component';
import { ParticipatedRidesComponent } from './user/participated-rides/participated-rides.component';
import { RideComponent } from './ride/ride.component';
import { LocationComponent } from './location/location.component';
import { CityComponent } from './location/city/city.component';
import { httpInterceptorProviders } from './interceptors';
import { RideSmallComponent } from './ride-small/ride-small.component';
import { OfferRideComponent } from './offer-ride/offer-ride.component';
import { RegisterDialogComponent } from './account/register-dialog/register-dialog.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RideFilterPipe } from './dataservice/ride-filter.pipe';
import { MaterialModule } from './material/material.module';
import { SearchRidesModule } from './search-rides/search-rides.module';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    HomeComponent,
    AccountComponent,
    SearchRideComponent,
    RideComponent,
    LocationComponent,
    CityComponent,
    PersonalDataComponent,
    OfferedRidesComponent,
    ParticipatedRidesComponent,
    RideSmallComponent,
    OfferRideComponent,
    RegisterDialogComponent,
    PageNotFoundComponent,
    RideFilterPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    SearchRidesModule,
  ],
  entryComponents: [
    RegisterDialogComponent
  ],

  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'nl-NL' }, httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
