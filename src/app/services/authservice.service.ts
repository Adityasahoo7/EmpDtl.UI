import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  private apiurl ='http://localhost:5212/api/Auth'
  constructor(private http:HttpClient) { }

register(user:any):Observable<any>{
  return this.http.post(`${this.apiurl}/Registeruser`,user)
}

login(user:any):Observable<any>{
  return this.http.post(`${this.apiurl}/loginuser`,user)
}

}
