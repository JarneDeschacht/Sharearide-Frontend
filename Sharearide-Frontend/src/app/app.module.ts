import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule, MatCardModule, MatIconModule, MatFormFieldModule, MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AccountComponent} from './account/account.component';
import { MatButtonModule, MatCheckboxModule, MatTabsModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchRideComponent } from './search-ride/search-ride.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatBadgeModule } from '@angular/material/badge';
import { PersonalDataComponent } from './user/personal-data/personal-data.component';
import { OfferedRidesComponent } from './user/offered-rides/offered-rides.component';
import { ParticipatedRidesComponent } from './user/participated-rides/participated-rides.component';
import { RideComponent } from './ride/ride.component';
import { LocationComponent } from './location/location.component';
import { CityComponent } from './location/city/city.component';
import { httpInterceptorProviders } from './interceptors';
import { RideSmallComponent } from './ride-small/ride-small.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { OfferRideComponent } from './offer-ride/offer-ride.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDialogModule} from '@angular/material/dialog';
import { RegisterDialogComponent } from './account/register-dialog/register-dialog.component';


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
    RegisterDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatListModule,
    MatCardModule,
    MatIconModule,
    AppRoutingModule,
    HttpClientModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatBadgeModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatStepperModule,
    MatDialogModule,
  ],
  entryComponents: [
    RegisterDialogComponent
  ],

  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'nl-NL' }, httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
