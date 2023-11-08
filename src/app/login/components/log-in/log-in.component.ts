import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { LogInService } from '../../service/log-in.service';
import { IApplicationUser } from 'src/app/shared/interface/i-application-user';
import { JwtHandlerComponent } from 'src/app/shared/components/jwt-handler/jwt-handler.component';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [
        style({ opacity: 0 }),
        animate(300)
      ]),
      transition(':leave', [
        animate(300, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class LoginComponent {
  email: string;
  password: string;
  isLoading = false;
  error: string;
  applicationUser: IApplicationUser;

  constructor(private logInService: LogInService, 
              private jwtHandler: JwtHandlerComponent,
              private router :Router ){
    this.email= "markodasic70@gmail.com";
    this.password = "VisokaIct1";
  }




  onSubmit() {
    this.isLoading = true;

    this.LogIn(this.email,this.password);
  }

  async LogIn(email_:string,password_:string)
  {
    const body = {
      email:email_,
      password:password_,
    };

    this.logInService.post(body).subscribe(
      response =>{
        this.isLoading = false;
        this.error = "";
        this.jwtHandler.SetTokenAndUser(response.token);
        
        if(this.jwtHandler.GetUser().UseCases.indexOf(39) != -1){
          // this.router.navigate(['/admin']);
          this.router.navigate(['/admin/apartments']);

        }else{
          this.router.navigate(['/']);
          // this.router.navigate(['/']);
        }
      },
      error =>{
        this.isLoading = false;
        if(error.status == 401) this.error = "Email ili Password nisu ispravni!";
        else this.error = "Doslo je greske na serveru pokusajte kasnije!";
      }
    );
  }

  


}
