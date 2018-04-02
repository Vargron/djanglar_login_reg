import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  cur_user;
  
  constructor(private router:Router, private uservice:UserService){

  }
  ngOnInit(){
    this.check_logged_in(   )
    this.uservice.logged_in_user.subscribe(
      (res)=>{
        this.cur_user=res;
      }
    )
    
  }
  route_not_logged(){
    this.uservice.check_logged_in_user_and_update(
      (res)=>{
        if(typeof(res["user"])=="object"){
          this.router.navigate(["/home"])
        }else{
          this.router.navigate(["/"])
        }
      }
    )
    this.router.navigate([""])
  }
  route_login(){
    this.uservice.check_logged_in_user_and_update(
      (res)=>{
        if(typeof(res["user"])=="object"){
          this.router.navigate(["/home"])
        }else{
          this.router.navigate(["/login"])
        }
      }
    )
    
    
  }
  route_logged_home(){
    this.uservice.check_logged_in_user_and_update(
      (res)=>{
        if(typeof(res["user"])=="object"){
          this.router.navigate(["/home"])
        }else{
          this.router.navigate(["/"])
        }
      }
    )
  }
  route_user_manager(){
    // this.router.navigate(["/user/manager"])
    this.uservice.check_logged_in_user_and_update(
      
      (res)=>{
        
        console.log(res, res["user"])
        if(typeof(res["user"])=="object"){
          if(res["user"]["admin"]){
            console.log("hitting navigate")
            this.router.navigate(["/user/manager"])
          }
          else{
            this.uservice.logout_current_user()
            
          }

        }

        else{
          this.uservice.logout_current_user()
          
        }
        

      })
    
  }

  check_logged_in(){
    this.uservice.check_logged_in_user_and_update(
    (res)=>{
      if(res["status"]){
        
      
        this.router.navigate(["/home"])
      }else{
        this.router.navigate(["/"])

    }
    })
  }
  logout_current_user(){
    this.uservice.logout_current_user()
  }
  
}
