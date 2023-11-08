import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from 'src/app/constants/Api';
import { CONFIGURATION } from 'src/app/constants/config';
import { ApiService } from '../api.service';
import { IComment } from '../../interface/i-comment';

@Injectable({
  providedIn: 'root'
})

export class CommentsService extends ApiService<IComment> {

  constructor(client: HttpClient) {
    super(client, CONFIGURATION.APIURL + API.COMMENT);
  }

  deleteYourSelf(id:number){
    return this.client.delete(this.url+"/DeleteYourSelf/"+id,{headers: this.headers})
  }

}

