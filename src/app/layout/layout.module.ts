import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './main/Components/header/header.component';
import { FooterComponent } from './main/Components/footer/footer.component';
import { NavService } from './main/service/nav/nav.service';
import { LogoComponent } from './main/Components/header/logo/logo.component';
import { NavComponent } from './main/Components/header/nav/nav.component';
import { HeaderTopComponent } from './main/Components/header/header-top/header-top.component';
import { PreloaderComponent } from './main/Components/header/preloader/preloader.component';
import { StickyComponent } from './main/Components/header/sticky/sticky.component';
import { HttpClientModule } from '@angular/common/http';
import { FooterBottomComponent } from './main/Components/footer/footer-bottom/footer-bottom.component';
import { FooterNavComponent } from './main/Components/footer/footer-nav/footer-nav.component';
import { FooterLogoComponent } from './main/Components/footer/footer-logo/footer-logo.component';
import { FooterShapeComponent } from './main/Components/footer/footer-shape/footer-shape.component';
import { FooterContactComponent } from './main/Components/footer/footer-contact/footer-contact.component';
import { LoginModule } from '../login/login.module';





@NgModule({
  declarations: [
    MainComponent,
    HeaderComponent,
    FooterComponent,
    LogoComponent,
    NavComponent,
    HeaderTopComponent,
    PreloaderComponent,
    StickyComponent,
    FooterBottomComponent,
    FooterContactComponent,
    FooterNavComponent,
    FooterLogoComponent,
    FooterShapeComponent,
  ],
  providers:[NavService],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    HttpClientModule
    ]
})
export class LayoutModule { }
