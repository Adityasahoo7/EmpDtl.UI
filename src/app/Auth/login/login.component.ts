import { Component } from '@angular/core';
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
  constructor(private authservice:AuthserviceService) {
  }

logindata={
username:'',
password:''
};

login(){
  this.authservice.login(this.logindata).subscribe({

    next:(res:any)=>{

      localStorage.setItem('token',res.token);
      alert('Login Successfully');
      console.log(res)
    },
    error:(err)=>{
      console.log(err);
    }
  });
}

}
