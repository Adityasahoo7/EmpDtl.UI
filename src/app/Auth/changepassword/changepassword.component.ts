import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent {
/**
 *
 */
constructor(private service:EmployeeService ,private router:Router) {
}
changedata={
  "username": "",
  "currentpassword": "",
  "newpassword": "",
  "conformpassword": ""
};

changePassword(){
  this.service.changepassword(this.changedata).subscribe({
    next:(res:any)=>{
      console.log(res);
      this.router.navigate(['/login']);
    },
    error:(err)=>{
      alert("Please enter valid crediential");
      this.changedata={
  "username": "",
  "currentpassword": "",
  "newpassword": "",
  "conformpassword": ""
};
      console.log(err);
    }

  });
}

}
