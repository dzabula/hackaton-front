import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './components/registration/registration.component';



const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: RegistrationComponent,
    data: { title: "Registracija" }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrationRoutingModule { }
