import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from '../dataservice/auth-guard.service';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { RideFilterPipe } from '../dataservice/ride-filter.pipe';
import { SearchRideComponent } from './search-ride/search-ride.component';
import { OfferRideComponent } from './offer-ride/offer-ride.component';
import { RideComponent } from './ride/ride.component';

const routes = [
  { path: 'searchRide', component: SearchRideComponent, canActivate: [AuthGuard], },
  { path: 'offerRide', component: OfferRideComponent,canActivate: [ AuthGuard ], },
];

@NgModule({
  declarations: [
    RideComponent,
    SearchRideComponent,
    OfferRideComponent,
    RideFilterPipe,
  ],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    RouterModule.forChild(routes)
  ],
  providers: [HttpClientModule]
})
export class RidesModule { }
