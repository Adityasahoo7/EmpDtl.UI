import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee.model';
import { EmployeeService } from '../services/employee.service';
import { windowToggle } from 'rxjs';
import { Router } from '@angular/router';

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
    managerId:0,
    joindate:''
    
  };
selectedResume!: File;
  isEdit = false;
  /**
   *
   */
  constructor(private empservice:EmployeeService , private route:Router) {
    
  }
ngOnInit(): void {
  this.getallemp();
}
getallemp(){
  this.empservice.getallemp().subscribe({
    next:(data)=>{
      this.employees=data
      console.log(data);
    },
    error: (err)=>{
      console.log(err);
    }
         
  });
}

downloderesume(emp: Employee): void {

  this.empservice.getresume(emp.id!).subscribe({
    next: (blob: Blob) => {

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');

      link.href = url;

      link.download =
        `Resume_${emp.name}_${emp.email}.pdf`;

      link.click();

      window.URL.revokeObjectURL(url);
    },
    error: (err) => {
      console.log(err);
    }
  });

}
logout():void{
  localStorage.clear();
  this.route.navigate(['/login']);
}

saveemployee(){
  if(this.isEdit){
    // this.empservice.updateemployee(this.employee.id!,this.employee)
    // .subscribe({
    //   next:()=>{
    //     alert("Employee Update successfully");
    //     this.getallemp();
    //     this.resetForm();
    //   },
    //   error:(err)=>{
    //     console.log(err);
    //   }
    // });
 const formdata =new FormData();
formdata.append('id',this.employee.id!.toString());
formdata.append('Name',this.employee.name);
formdata.append('Email',this.employee.email);
formdata.append('Phone',this.employee.phone);
formdata.append('Department',this.employee.department);
formdata.append('Designation',this.employee.designation);
formdata.append('Salary',(this.employee.salary ?? 0).toString());
formdata.append('joindate',(this.employee.joindate));

if(this.selectedResume){
  formdata.append('Resume',this.selectedResume)
}

this.empservice.updateemployee(this.employee.id!,formdata).subscribe({
next:(res)=>{
  console.log(res);
  alert('Employee Update Successfully');

  this.resetForm();
},
error:(err)=>{
  console.log(err);
}


});


  }
else{
//   this.empservice.addemployee(this.employee)
//   .subscribe({
// next:()=>{
//   alert("employee Created successfully");
//   this.getallemp();
//   this.resetForm();

// },
// error:(err)=>{
//   console.log(err);
// }
//   });

const formdata = new FormData();
formdata.append('Name',this.employee.name);
formdata.append('Email',this.employee.email);
formdata.append('Phone',this.employee.phone);
formdata.append('Department',this.employee.department);
formdata.append('Designation',this.employee.designation);
formdata.append('Salary',(this.employee.salary ?? 0).toString());
formdata.append('ManagerId',this.employee.managerId.toString());
formdata.append('joindate',(this.employee.joindate));
console.log(this.employee.joindate);

if(this.selectedResume){
  formdata.append('Resume',this.selectedResume);
}

this.empservice.addemployeeresume(formdata).subscribe({
  next:(res)=>{
    console.log(res);
    alert('Employee Update Successfully');
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

onResumeSelected(event: any): void {

  if (event.target.files.length > 0) {

    this.selectedResume = event.target.files[0];

  }

}
// updateemployee():void{
//   const formdata =new FormData();
// formdata.append('id',this.employee.id!.toString());
// formdata.append('Name',this.employee.name);
// formdata.append('Email',this.employee.email);
// formdata.append('Phone',this.employee.phone);
// formdata.append('Department',this.employee.department);
// formdata.append('Designation',this.employee.designation);
// formdata.append('Salary',this.employee.salary.toString());

// if(this.selectedResume){
//   formdata.append('Resume',this.selectedResume)
// }

// this.empservice.updateemployee(this.employee.id!,formdata).subscribe({
// next:(res)=>{
//   console.log(res);
// },
// error:(err)=>{
//   console.log(err);
// }


// });


// }



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
    managerId:0,
    joindate:''
  };
  this.isEdit=false;
}
}
