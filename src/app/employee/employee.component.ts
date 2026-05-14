import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee.model';
import { EmployeeService } from '../services/employee.service';

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
  constructor(private empservice:EmployeeService) {
    
  }
ngOnInit(): void {
  this.getallemp();
}
getallemp(){
  this.empservice.getallemp().subscribe({
    next:(data)=>{
      this.employees=data
    },
    error: (err)=>{
      console.log(err);
    }
         
  });
}


saveemployee(){
  if(this.isEdit){
    this.empservice.updateemployee(this.employee.id!,this.employee)
    .subscribe({
      next:()=>{
        alert("Employee Update successfully");
        this.getallemp();
        this.resetForm();
      }
    })
  }
}

resetForm(){
  this.employee={
    name:'',
    phone:'',
    email:'',
    department:'',
    designation:'',
    salary:0,
    managerid:0
  };
  this.isEdit=false;
}

}
