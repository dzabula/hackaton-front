import { Component, OnInit } from '@angular/core';
import { CONTACT } from 'src/app/constants/contact';
import { JwtHandlerComponent } from 'src/app/shared/components/jwt-handler/jwt-handler.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  firstWord: string = "Budimo";
  smallText: string = "U Kontaktu";
  bigText: string = "Budimo Povezani";
  fullName: string ="";
  email: string = "";



  constructor(private jwtHandler: JwtHandlerComponent){

  }

  ngOnInit(): void {
     if(this.jwtHandler.IsValidToken()){
      var user = this.jwtHandler.GetUser();  
      this.email = user.Email;
      this.fullName = user.FirstName + " " + user.LastName; 
     } 
  }


}
