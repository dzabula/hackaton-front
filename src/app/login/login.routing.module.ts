import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/log-in/log-in.component';
import { ActivateUserComponent } from '../activateUser/activate-user/activate-user.component';



const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: LoginComponent,
    data: { title: "Log In" }
  },
  {
    path: ":code",
    component: ActivateUserComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogInRoutingModule { }
