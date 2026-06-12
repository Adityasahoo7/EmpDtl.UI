import { Component } from '@angular/core';
import { AuthserviceService } from 'src/app/services/authservice.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  user={
    username:'',
    password:'',
    'role':''
  };
  /**
   *
   */
  constructor(private authservice:AuthserviceService) {
  }

register(){
  this.authservice.register(this.user).subscribe({

    next:(res)=>{
      alert('Register Successfully');
      console.log(res);
    },
    error:(err)=>{
      alert('Register Not Successful')
      console.log(err);
    }
  });
}



}
