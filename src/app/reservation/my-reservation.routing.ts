import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyReservationComponent } from './Components/reservation/my-reservation.component';

const routes: Routes = [
  {
    path: "",
    component:MyReservationComponent,
    data: { title: "Upravljanje Rezervacijama - Korisnik" }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservationRoutingModule { }
