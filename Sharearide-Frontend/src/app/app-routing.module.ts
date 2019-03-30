import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AccountComponent } from './account/account.component';
import { SearchRideComponent } from './search-ride/search-ride.component';

const appRoutes: Routes = [
  { path: 'searchRide', component: SearchRideComponent },
  { path: 'offerRide', component: AppComponent },
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
