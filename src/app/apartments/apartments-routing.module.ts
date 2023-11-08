import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from '../home/home/Components/contact/contact.component';
import { ApartmentsComponent } from './components/apartments/apartments.component';
import { ApartmentDetailComponent } from './apartment-detail/apartment-detail.component';


const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: ApartmentsComponent,
    data: { title: "Svi apartmani" },
  },
  {
    path: "category/:id",
    component: ApartmentsComponent
  },
  {
    path: "free/:start/:end/:numPerson",
    component: ApartmentsComponent
  },
  {
    path: "free/:start/:end",
    component: ApartmentsComponent
  },
  {
    path: ":id",
    component: ApartmentDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApartmentsRoutingModule { }
