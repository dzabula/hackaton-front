import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogoutComponent } from './components/logout/logout.component';



const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: LogoutComponent,
    data: { title: "Log Out" }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogoutRoutingModule { }
