import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AccountComponent } from './account/account.component';
import { SearchRideComponent } from './search-ride/search-ride.component';
import { UserComponent } from './user/user.component';
import { PersonalDataComponent } from './user/personal-data/personal-data.component';
import { OfferedRidesComponent } from './user/offered-rides/offered-rides.component';
import { ParticipatedRidesComponent } from './user/participated-rides/participated-rides.component';
import { AuthGuard } from './dataservice/auth-guard.service';
import { OfferRideComponent } from './offer-ride/offer-ride.component';


const appRoutes: Routes = [
  { path: 'searchRide', component: SearchRideComponent,canActivate: [ AuthGuard ], },
  { path: 'offerRide', component: OfferRideComponent,canActivate: [ AuthGuard ], },
  {
    path: 'profile', component: UserComponent,canActivate: [ AuthGuard ],
    children: [
      { path: '', component: PersonalDataComponent, pathMatch: 'full' },
      { path: 'personaldata', component: PersonalDataComponent },
      { path: 'participatedRides', component: ParticipatedRidesComponent },
      { path: 'offeredRides', component: OfferedRidesComponent },
    ]
  },
  { path: 'account', component: AccountComponent },
  {
    path: '',
    redirectTo: "/home",
    pathMatch: 'full'
  },
  { path: 'home', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
