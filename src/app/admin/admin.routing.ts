import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagmentComponent } from './apartments/components/managment/managment.component';
import { CategoryComponent } from './category/components/category/category.component';
import { CityComponent } from './city/components/city/city.component';
import { UserComponent } from './user/components/user/user.component';
import { AuthGuard } from '../shared/middleware/auth.guard';
import { ReservationComponent } from './reservation/components/reservation/reservation.component';




const routes: Routes = [
    {
      path: 'apartments',
      canActivate:[AuthGuard],
      component: ManagmentComponent
    },
    {
      path: 'category',
      canActivate:[AuthGuard],
      component: CategoryComponent
    },
    {
      path: 'city',
      canActivate:[AuthGuard],
      component: CityComponent
    },
    {
      path: 'user',
      canActivate:[AuthGuard],
      component: UserComponent
    },
    {
      path: 'reservations',
      canActivate:[AuthGuard],
      component: ReservationComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
