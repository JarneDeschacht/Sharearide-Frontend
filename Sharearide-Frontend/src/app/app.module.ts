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
import { AccountComponent } from './account/account.component';
import { MatButtonModule, MatCheckboxModule, MatTabsModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchRideComponent } from './search-ride/search-ride.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatBadgeModule} from '@angular/material/badge';
import { PersonalDataComponent } from './user/personal-data/personal-data.component';
import { OfferedRidesComponent } from './user/offered-rides/offered-rides.component';
import { ParticipatedRidesComponent } from './user/participated-rides/participated-rides.component';
import { RideComponent } from './ride/ride.component';
import { LocationComponent } from './ride/location/location.component';
import { CityComponent } from './ride/location/city/city.component';
import { httpInterceptorProviders } from './interceptors';


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
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'nl-NL' },httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
