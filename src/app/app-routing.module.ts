import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './layout/main/main.component';
import { ContactModule } from './contact/contact.module';
import { AuthGuard } from './shared/middleware/auth.guard';
import { RefreshTokenGuard } from './shared/middleware/refresh-token.guard';
import { ActivateUserComponent } from './activateUser/activate-user/activate-user.component';



const routes: Routes = [
  {
    path: "",
    component: MainComponent,
    canActivate:[RefreshTokenGuard],
    children: [
      {
        path: "",
        canActivate:[RefreshTokenGuard],
        loadChildren: () => import("./home/home.module").then(x => x.HomeModule),
      },
      {
        path: "home",
        canActivate:[RefreshTokenGuard],
        loadChildren: () => import("./home/home.module").then(x => x.HomeModule),
      },
      {
        path: "apartments",
        canActivate:[RefreshTokenGuard],
        loadChildren: () => import("./apartments/apartments.module").then(x => x.ApartmentsModule),
      },
      {
        path: "contact",
        canActivate:[RefreshTokenGuard],
        loadChildren: () => import("./contact/contact.module").then(x => x.ContactModule),
      },
      {
        path: "aboutus",
        canActivate:[RefreshTokenGuard],
        loadChildren: () => import("./about-us/about-us.module").then(x => x.AboutUsModule),
      },
      {
        path: "login",
        canActivate:[RefreshTokenGuard],
        loadChildren: () => import("./login/login.module").then(x => x.LoginModule),
      },
      {
        path: "registration",
        canActivate:[RefreshTokenGuard],
        loadChildren: () => import("./registration/registration.module").then(x => x.RegistrationModule),
      },
      {
        path: "logout",
        loadChildren: () => import("./logout/logout.module").then(x => x.LogoutModule),
      },
      {
        path: "admin",
        canActivate: [AuthGuard,RefreshTokenGuard],
        loadChildren: () => import("./admin/admin.module").then(x => x.AdminModule),
      },
      {
        path: "reservations",
        canActivate: [AuthGuard,RefreshTokenGuard],
        loadChildren: () => import("./reservation/my-reservation.module").then(x => x.MyReservationModule),
      }

    ]
  }
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
