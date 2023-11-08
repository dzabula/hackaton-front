import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHandlerComponent } from '../components/jwt-handler/jwt-handler.component';
import { RefreshTokenService } from '../services/auth/refresh-token.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RefreshTokenGuard implements CanActivate {
  constructor(private jwtHandler: JwtHandlerComponent,
              private router: Router,
              private authService: RefreshTokenService) {}

  canActivate(): boolean {
    if (this.jwtHandler.IsValidToken()) {

      var token = localStorage.getItem("token");
      this.authService.headers = new HttpHeaders().set("Authorization","Bearer " + token);

      this.authService.post({}).subscribe({
        next: response =>{
          var newToken = response.token;
          if(response.token)
            this.jwtHandler.SetTokenAndUser(newToken);
          
        },
        error: xhr =>{
          console.log("");
        }
      })

    } 
    return true;
  }
}