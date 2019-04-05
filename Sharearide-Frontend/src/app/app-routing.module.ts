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


const appRoutes: Routes = [
  { path: 'searchRide', component: SearchRideComponent },
  { path: 'offerRide', component: AppComponent },
  {
    path: 'profile', component: UserComponent,
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
