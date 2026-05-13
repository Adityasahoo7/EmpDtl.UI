import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee.model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit{

  employees:Employee[] =[];

  employee:Employee={
    name:'',
    phone:'',
    email:'',
    department:'',
    designation:'',
    salary:0,
    managerid:0
  };

  isEdit = false;
  /**
   *
   */
  constructor() {
    
  }


}
