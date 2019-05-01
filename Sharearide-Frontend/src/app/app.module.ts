import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DATE_LOCALE } from '@angular/material';
import { AccountComponent } from './account/account.component';
import { httpInterceptorProviders } from './interceptors';
import { OfferRideComponent } from './offer-ride/offer-ride.component';
import { RegisterDialogComponent } from './account/register-dialog/register-dialog.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SharedModule } from './shared/shared.module';
import { SearchRidesModule } from './search-rides/search-rides.module';
import { ProfileModule } from './profile/profile.module';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AccountComponent,
    OfferRideComponent,
    RegisterDialogComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    SearchRidesModule,
    ProfileModule,
    AppRoutingModule,
  ],
  entryComponents: [
    RegisterDialogComponent
  ],

  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'nl-NL' }, httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
