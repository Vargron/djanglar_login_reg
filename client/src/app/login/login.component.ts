import { Component, OnInit } from '@angular/core';
import { NgModel} from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  r_user:Object;
  l_user:Object;



  constructor(private uservice:UserService) {
    this.l_user={
      username:"",
      password:"",
    }
    this.r_user={
      username:"bob",
      email:"bob@bob.com",
      password:"password",
      passwordc:"password",

    }
   }

  ngOnInit() {
  }
  login_user(){
    console.log("hitting login user stub")
    this.uservice.login_user(this.l_user, (
      (res)=>{
        if(res["status"]!="error"){
          this.l_user={
            username:"",
            password:"",
      
          }
        }


    }))

  }
  register_user(){
    console.log("hitting register user stub")
    this.uservice.register(this.r_user, (errors)=>{
      console.log(errors)
      if(errors.length==0){
        this.r_user={
          username:"",
          email:"",
          password:"",
          passwordc:"",
    
        }
      }

    })

  }

}
