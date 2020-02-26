import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FacebookAdConnectService {

  constructor(private http:HttpClient) { }

  sendTokenToServer(token:any){
    return this.http.get('http://localhost:8000/connect/' + token)
  }

}
