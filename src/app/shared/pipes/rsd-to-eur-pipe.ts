import { HttpHeaders } from '@angular/common/http';
import { OnInit, Pipe, PipeTransform } from '@angular/core';
import {ExchangeRate} from "src/app/constants/exchange-rate";
import {CurrencyService} from "src/app/shared/services/currency/currency.service";

@Pipe({
  name: 'RsdToEur'
})
export class RsdToEur implements PipeTransform, OnInit {

  public quota: any = 117;
  constructor(private currencyService: CurrencyService){

  }
  ngOnInit(): void {
    let username = "gwaysapps101462026";
    let password = "n8qckpuoqvtooq9c7357rim3t1";
    this.currencyService.headers = new HttpHeaders().set("Authorization","Basic " + btoa(username + ":" + password));
    this.currencyService.get().subscribe({
      next: (response: any) =>{
        console.log("Currency rate is", response)
        this.quota =  response.from[0].mid;
      },
      error: xhr=>{
        this.quota =  117;

      }
    })
  }

  transform(value: any): any {
        var x = this.quota;
        var y = value/x;
        return y.toFixed(2); 
  }
}