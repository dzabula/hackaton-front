import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { RsdToEur } from 'src/app/shared/pipes/rsd-to-eur-pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { CustomReuseStrategy } from './RouteReuseStrategy/RouteReuseStrategy';
import { ActivateUserComponent } from './activateUser/activate-user/activate-user.component';




@NgModule({
  declarations: [
    AppComponent,
    ActivateUserComponent,
      
  ],
  imports: [ 
    CommonModule,
    AppRoutingModule,
    LayoutModule,
    BrowserAnimationsModule

  ],
  // providers: [{ provide: RouteReuseStrategy, useClass: CustomReuseStrategy }],
  providers:[],
  bootstrap: [AppComponent]
})
export class AppModule { }
