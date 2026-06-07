import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee.model';
import { EmployeeService } from '../services/employee.service';
import { windowToggle } from 'rxjs';

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
    managerId:0
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
downloderesume(id:number):void{
  this.empservice.getresume(id).subscribe({
    next: (blob:Blob)=>{
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');

      link.href=url;
      link.download='Resume.pdf';
      link.click();

      window.URL.revokeObjectURL(url);

    },

    error:(err)=>{
      console.log(err);
    }
  })
}
saveemployee(){
  if(this.isEdit){
    this.empservice.updateemployee(this.employee.id!,this.employee)
    .subscribe({
      next:()=>{
        alert("Employee Update successfully");
        this.getallemp();
        this.resetForm();
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }
else{
  this.empservice.addemployee(this.employee)
  .subscribe({
next:()=>{
  alert("employee Created successfully");
  this.getallemp();
  this.resetForm();

},
error:(err)=>{
  console.log(err);
}
  });
}
}
editemployee(emp:Employee){
this.employee={...emp};
this.isEdit=true; 
}
deleteemployee(id:number){
  if(confirm('Are you sure to delete')){
    this.empservice.deleteemp(id)
    .subscribe({
      next:()=>{
        alert('Employee deleted successfully');
        this.getallemp();
      },
      error:(err)=>{
        console.log(err);
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
    managerId:0
  };
  this.isEdit=false;
}
}
