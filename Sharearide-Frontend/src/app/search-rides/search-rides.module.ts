import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { SearchRideComponent } from './search-ride/search-ride.component';
import { AuthGuard } from '../dataservice/auth-guard.service';
import { RideFilterPipe } from '../dataservice/ride-filter.pipe';
import { RideComponent } from '../ride/ride.component';

const routes = [
  { path: 'searchRide', component: SearchRideComponent, canActivate: [AuthGuard], },
];

@NgModule({
  declarations:
    [
      RideComponent,
      SearchRideComponent,
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
export class SearchRidesModule { }
