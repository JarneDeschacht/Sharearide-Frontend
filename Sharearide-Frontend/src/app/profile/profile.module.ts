import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../dataservice/auth-guard.service';
import { UserComponent } from './user/user.component';
import { PersonalDataComponent } from './user/personal-data/personal-data.component';
import { ParticipatedRidesComponent } from './user/participated-rides/participated-rides.component';
import { OfferedRidesComponent } from './user/offered-rides/offered-rides.component';
import { RideSmallComponent } from './user/ride-small/ride-small.component';
import { MaterialFileInputModule } from 'ngx-material-file-input';

const routes = [
  {
    path: 'profile', component: UserComponent,canActivate: [ AuthGuard ],
    children: [
      { path: '', component: PersonalDataComponent, pathMatch: 'full' },
      { path: 'personaldata', component: PersonalDataComponent },
      { path: 'participatedRides', component: ParticipatedRidesComponent },
      { path: 'offeredRides', component: OfferedRidesComponent },
    ]
  },
];

@NgModule({
  declarations: 
  [
    UserComponent,
    PersonalDataComponent,
    OfferedRidesComponent,
    ParticipatedRidesComponent,
    RideSmallComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    MaterialFileInputModule,
    RouterModule.forChild(routes)
  ]
})
export class ProfileModule { }
