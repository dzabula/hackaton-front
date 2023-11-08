import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutUsComponent } from './about-us/about-us.component';
import { EmployesComponent } from './about-us/components/employes/employes.component';
import { GeneralInfoComponent } from './about-us/components/general-info/general-info.component';
import { AboutUsRoutingModule } from './about-us-routing.module';
import { EmployesService } from './about-us/services/employes.service';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    AboutUsComponent,
    EmployesComponent,
    GeneralInfoComponent
  ],
  providers:[EmployesService],
  imports: [
    AboutUsRoutingModule,
    CommonModule,
    SharedModule,
    HttpClientModule
  ]
})
export class AboutUsModule { }
