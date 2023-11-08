import { Component, OnInit } from '@angular/core';
import { ILink } from 'src/app/shared/interface/i-link';
import { NavService } from './service/nav/nav.service';
import { ContentObserver } from '@angular/cdk/observers';
import { filter } from 'rxjs/operators';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { JwtHandlerComponent } from 'src/app/shared/components/jwt-handler/jwt-handler.component';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{
  links: ILink[];

  anonimoLinks: ILink[];
  adminLinks: ILink[];
  userLinks: ILink[];

  activeRoute: string;
  private routerSub: any;


  constructor(private jwtHandler :JwtHandlerComponent, private router :Router,private route: ActivatedRoute){
    this.activeRoute = "/" + this.router.url.split("/")[1];
    this.routerSub = this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(() => {
      this.loadLinks();
    });
  }

  ngOnInit(): void {
    this.fillAllLinks();
    this.loadLinks();
  }

  loadLinks(){

    if(this.jwtHandler.IsValidToken())
    {
        if(this.jwtHandler.GetUser().UseCases.indexOf(39) != -1)
        {
          this.links = this.adminLinks;
        }
        else
        {
          this.links = this.userLinks;
        }
    }
    else
    {
      this.links = this.anonimoLinks;
    }
  }
  
  fillAllLinks(){
    this.anonimoLinks = [
      {
        "name":"Pocetna",
        "link":"home"
      },
      {
          "name":"Svi apartmani",
          "link":"/apartments"
      },
      {
          "name":"Kontakt",
          "link":"/contact"
      },
      {
          "name":"O nama",
          "link":"/aboutus"
      },
      {
          "name":"Log In",
          "link":"/login"
      },
      {
          "name":"Registracija",
          "link":"/registration"
      }
    ];
    this.adminLinks = [
      {
        "name":"Apartmani",
        "link":"/apartments"
      },
      {
          "name":"Upravljanje Apartmanima",
          "link":"/admin/apartments"
      },
      {
          "name":"Rezervacije",
          "link":"/admin/reservations"
      },
      {
          "name":"Kategorije",
          "link":"/admin/category"
      },
      {
          "name":"Gradovi",
          "link":"/admin/city"
      },
      {
          "name":"Korisnici",
          "link":"/admin/user"
      },
      {
          "name":"Logout",
          "link":"/logout"
      }
    ]
    this.userLinks = [
      {
        "name":"Pocetna",
        "link":"/home"
      },
      {
          "name":"Svi apartmani",
          "link":"/apartments"
      },
      {
          "name":"Kontakt",
          "link":"/contact"
      },
      {
          "name":"O nama",
          "link":"/aboutus"
      },
      {
          "name":"Moje Rezervacije",
          "link":"/reservations"
      },
      {
          "name":"Log Out",
          "link":"/logout"
      }
    ]
  }
}
