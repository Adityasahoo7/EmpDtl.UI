import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiurl ="http://localhost:5212/api/Employee";
  constructor(private http:HttpClient) { 

  }

  getallemp():Observable<Employee[]>{
    return this.http.get<Employee[]> (`${this.apiurl}/Getallemp`)
  }
  getempbyid(id:number):Observable<Employee>{
    return this.http.get<Employee>(`${this.apiurl}/getempbyid/${id}`)
  }
  getresume(id:number):Observable<Blob>{
    return this.http.get(`${this.apiurl}/GetResumebyId/${id}`,
      {
        responseType:'blob'
      }
    );
  }
  addemployee(employee:Employee):Observable<any>{
    return this.http.post(`${this.apiurl}/CreateEmployee`,employee,{responseType:'text'});
  }

  updateemployee(id:number,formdata:FormData):Observable<any>{
    return this.http.put(`${this.apiurl}/UpdateempwithResume/${id}`,formdata,{responseType:'text'})
  }

  deleteemp(id:number):Observable<any>{
    return this.http.delete(`${this.apiurl}/Deleteemp/${id}`,{responseType:'text'})
  }
}
