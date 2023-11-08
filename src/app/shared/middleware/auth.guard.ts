import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHandlerComponent } from '../components/jwt-handler/jwt-handler.component';
import { RefreshTokenService } from '../services/auth/refresh-token.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private jwtHandler: JwtHandlerComponent, private router: Router, private authService: RefreshTokenService) {}

  canActivate(): boolean {
    if (this.jwtHandler.IsValidToken()) {
      let token = localStorage.getItem("token");
      this.authService.headers = new HttpHeaders().set("Authorization","Bearer " + token);
      this.authService.post({}).subscribe({
        next:reponse=>{},
        error:xhr=>{
          this.router.navigate(['/login']);
        }
      })
      return true;
    } else {
      this.router.navigate(['/login']); // Preusmeravanje na login stranicu ako korisnik nije ulogovan
      return false;
    }
  }
}
