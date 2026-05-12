import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiurl ="http://localhost:5169/api/Employee";
  constructor(private http:HttpClient) { 

  }

  getallemp():Observable<Employee[]>{
    return this.http.get<Employee[]> (`${this.apiurl}/Getallemp`)
  }
  getempbyid(id:number):Observable<Employee>{
    return this.http.get<Employee>(`${this.apiurl}/getempbyid/${id}`)
  }
  addemployee(employee:Employee):Observable<any>{
    return this.http.post(`${this.apiurl}/CreateEmployee`,employee,{responseType:'text'});
  }

  updateemployee(id:number,employee:Employee):Observable<any>{
    return this.http.put(`${this.apiurl}/updateemp/${id}`,employee,{responseType:'text'})
  }

  deleteemp(id:number):Observable<any>{
    return this.http.delete(`${this.apiurl}/Deleteemp/${id}`,{responseType:'text'})
  }
}
