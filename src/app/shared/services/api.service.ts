import {HttpClient, HttpHeaders} from "@angular/common/http";
import {  Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export abstract class ApiService<T> {

  public headers: HttpHeaders = new HttpHeaders();

  constructor(public client: HttpClient, protected url: string)
  {
  
  }

  get(): Observable<T[]>{
      return this.client.get<T[]>(this.url,{headers: this.headers});
  }


  
  getOne(id: number): Observable<T>{
    return this.client.get<T>(this.url+"/"+id,{headers: this.headers});
  }

  post(body: any): Observable<T>{
    return this.client.post<T>(this.url, body,{headers: this.headers})
  }

  put(body:any): Observable<T>{
    return this.client.put<T>(this.url, body,{headers: this.headers})
  }

  delete(id:number){
    return this.client.delete(this.url+"/"+id,{headers: this.headers})
  }

  patch(body:any){
    return this.client.patch(this.url, body,{headers:this.headers});
  }

}

