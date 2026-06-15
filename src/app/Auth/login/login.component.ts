import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from 'src/app/services/authservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  /**
   *
   */
  constructor(private authservice:AuthserviceService,private router:Router) {
  }

logindata={
username:'',
password:''
};

login(){
  this.authservice.login(this.logindata).subscribe({

    next:(res:any)=>{

      localStorage.setItem('token',res.token);
      localStorage.setItem('username',res.username);
     // alert('Login Successfully');
      console.log(res)
      this.router.navigate(['/employee'])
    },
    error:(err)=>{
      alert('Please Enter Valid Crediential');
      this.logindata={
      username:'',
      password:''
      };
      console.log(err);
    }
  });
}

}
