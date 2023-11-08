import { Component, Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { IApplicationUser } from 'src/app/shared/interface/i-application-user';
import { RefreshTokenService } from '../../services/auth/refresh-token.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

@Component({
  providers: [JwtHandlerComponent],
  selector: 'app-jwt-handler',
  templateUrl: './jwt-handler.component.html',
  styleUrls: ['./jwt-handler.component.css']
})
export class  JwtHandlerComponent {

  token:string;
  applicationUser: IApplicationUser;
  constructor(private authService: RefreshTokenService ){}


  IsValidToken(): boolean{
    this.token = localStorage.getItem("token");
    if(!this.token) return false;
    if(this.token == undefined) return false;
    if(this.token == null) return false;
    
    try {
      this.applicationUser = jwt_decode(this.token);
      const currentTimestamp = Math.floor(Date.now() / 1000); // Trenutno vreme u sekundama
      return this.applicationUser.exp > currentTimestamp;
    }catch{
      console.log("Niste Autorizovani!!!");
      return false;
    }

  }

  GetUser(): IApplicationUser{
    this.token = localStorage.getItem("token");
    this.applicationUser = jwt_decode(this.token);
    return this.applicationUser;
  }

  SetTokenAndUser(token:string){
      this.applicationUser = jwt_decode(token);
      localStorage.setItem('token',token );
      localStorage.setItem('user',JSON.stringify(this.applicationUser));
  }

  RemoveTokenAndUser(){
    localStorage.clear();
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }

}
