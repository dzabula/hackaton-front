import { ImplicitReceiver } from '@angular/compiler';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHandlerComponent } from 'src/app/shared/components/jwt-handler/jwt-handler.component';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements AfterViewInit {


  constructor(private jwtHandler :JwtHandlerComponent,private router: Router){

  }
  ngAfterViewInit(): void {
    this.jwtHandler.RemoveTokenAndUser();    
    this.router.navigate(['/']);

  }

}
