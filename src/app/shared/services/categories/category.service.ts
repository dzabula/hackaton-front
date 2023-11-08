import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { CONFIGURATION } from "src/app/constants/config";
import { API } from "src/app/constants/Api";
import { ICategory } from '../../interface/i-category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends ApiService<ICategory> {

  constructor(client: HttpClient) {
      super(client, CONFIGURATION.APIURL + API.CATEGORIES);
   }
}
