import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';



const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: AboutUsComponent,
    data: { title: "O Nama" }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutUsRoutingModule { }
