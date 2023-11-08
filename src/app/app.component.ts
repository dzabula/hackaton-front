import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, NavigationEnd, Router } from '@angular/router';
import { Observable, filter, map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Apartmani';
  

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {
  
      this.router.events.pipe(
        filter(x => x instanceof NavigationEnd),
        map(()=>getRouteTitle(this.activatedRoute))
      ).subscribe({
        next: fs => {
         // console.log(fs);
        },
      
      })

      function getRouteTitle(route: ActivatedRoute): Observable<Data> {
        return route.firstChild ? getRouteTitle(route.firstChild) : route.snapshot.data["title"];
      }
  }
}
