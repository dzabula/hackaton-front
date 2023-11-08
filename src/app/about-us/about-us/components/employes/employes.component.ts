import { Component, OnInit } from '@angular/core';
import { EmployesService } from '../../services/employes.service';
import { IEmploye } from '../../interface/i-employe';

@Component({
  selector: 'app-employes',
  templateUrl: './employes.component.html',
  styleUrls: ['./employes.component.css']
})
export class EmployesComponent implements OnInit {
  employes: IEmploye[];
  constructor(private employeService: EmployesService){

  }


  ngOnInit(): void {
    this.employeService.get().subscribe({
      next: response =>{
          this.employes = response;
      },
      error: xhr=>{
          alert("Doslo je od greske prilikom ucitavanja zaposlenih!");
          console.log(xhr);
      }
    })
  }



}
